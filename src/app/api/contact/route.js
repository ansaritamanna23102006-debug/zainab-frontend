import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Aseptic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Simple email regex audit
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Fetch backend API URL from env, fallback to localhost:5000
    const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:5000';

    // Format message to include subject if present
    const formattedMessage = subject ? `Subject: ${subject}\n\n${message}` : message;

    // Submit to real backend
    const backendResponse = await fetch(`${backendUrl}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        message: formattedMessage,
      }),
    });

    const resData = await backendResponse.json();

    if (backendResponse.ok && (resData.status === 'success' || resData.success)) {
      return NextResponse.json(
        {
          success: true,
          message: 'Your message has been received! We will respond within 24 hours.',
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: resData.message || 'Failed to submit contact request.' },
        { status: backendResponse.status || 400 }
      );
    }
  } catch (error) {
    console.error('API Error in Contact endpoint:', error);
    return NextResponse.json(
      { success: false, error: 'Unable to connect to the clinic server. Please try again later.' },
      { status: 500 }
    );
  }
}

