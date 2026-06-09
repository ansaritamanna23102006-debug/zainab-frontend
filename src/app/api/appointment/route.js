import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, age, gender, date, time, symptoms } = body;

    // Simple Server-side validation
    if (!name || !phone || !age || !gender || !date || !time) {
      return NextResponse.json(
        { success: false, error: 'All fields except symptoms are required.' },
        { status: 400 }
      );
    }

    // Phone format verification
    let cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.startsWith('91') && cleanPhone.length > 10) {
      cleanPhone = cleanPhone.slice(-10);
    }
    if (cleanPhone.length !== 10 || !/^[6-9]/.test(cleanPhone)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid 10-digit Indian mobile number starting with 6-9.' },
        { status: 400 }
      );
    }

    // Fetch backend API URL from env, fallback to localhost:5000
    const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:5000';

    // Submit to real backend
    const backendResponse = await fetch(`${backendUrl}/api/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        patientName: name,
        phone: cleanPhone,
        age: Number(age),
        gender: gender.toLowerCase(),
        appointmentDate: date,
        appointmentTime: time,
        symptoms: symptoms || 'General Checkup',
      }),
    });

    const resData = await backendResponse.json();

    if (backendResponse.ok && (resData.status === 'success' || resData.success)) {
      const appointment = resData.data.appointment;
      return NextResponse.json(
        {
          success: true,
          message: 'Appointment request registered successfully!',
          booking: {
            id: appointment._id,
            name: appointment.patientName,
            phone: appointment.phone,
            age: appointment.age,
            gender: appointment.gender,
            date: new Date(appointment.appointmentDate).toISOString().split('T')[0],
            time: appointment.appointmentTime,
            symptoms: appointment.symptoms,
            created: appointment.createdAt,
          },
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: resData.message || 'Failed to book appointment on medical server.' },
        { status: backendResponse.status || 400 }
      );
    }
  } catch (error) {
    console.error('API Error in Appointment booking:', error);
    return NextResponse.json(
      { success: false, error: 'Unable to connect to the clinic server. Please try again later.' },
      { status: 500 }
    );
  }
}

