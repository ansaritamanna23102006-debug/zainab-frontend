'use client';

import React, { useState } from 'react';
import { Calendar, Clock, UserCheck, MessageSquare, AlertCircle, Sparkles } from 'lucide-react';
import useGsapAnimation from '@/hooks/useGsapAnimation';
import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import Select from '@/components/UI/Select';
import Textarea from '@/components/UI/Textarea';

const GENDER_OPTIONS = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
];

const TIME_SLOTS = [
  // Morning slots
  { value: '09:00 AM', label: '09:00 AM (Morning)' },
  { value: '10:00 AM', label: '10:00 AM (Morning)' },
  { value: '11:00 AM', label: '11:00 AM (Morning)' },
  { value: '12:00 PM', label: '12:00 PM (Morning)' },
  // Evening slots
  { value: '05:00 PM', label: '05:00 PM (Evening)' },
  { value: '06:00 PM', label: '06:00 PM (Evening)' },
  { value: '07:00 PM', label: '07:00 PM (Evening)' },
  { value: '08:00 PM', label: '08:00 PM (Evening)' },
];

export default function AppointmentPage() {
  const formBoxRef = useGsapAnimation({ animationType: 'scale', scale: 0.97, start: 'top 85%' });

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    gender: '',
    date: '',
    time: '',
    symptoms: '',
  });

  // UI States
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successData, setSuccessData] = useState(null);
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name, val) => {
    setFormData((prev) => ({ ...prev, [name]: val }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Patient name is required.';
    
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required.';
    } else if (cleanPhone.length < 10) {
      tempErrors.phone = 'Enter a valid 10-digit mobile number.';
    }

    if (!formData.age.trim() || isNaN(formData.age) || parseInt(formData.age) <= 0) {
      tempErrors.age = 'Enter a valid age.';
    }

    if (!formData.gender) tempErrors.gender = 'Please select a gender.';
    if (!formData.date) tempErrors.date = 'Appointment date is required.';
    if (!formData.time) tempErrors.time = 'Preferred time slot is required.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setSuccessData(resData.booking);
        // Clear Form
        setFormData({
          name: '',
          phone: '',
          age: '',
          gender: '',
          date: '',
          time: '',
          symptoms: '',
        });
      } else {
        setServerError(resData.error || 'Something went wrong. Please check inputs.');
      }
    } catch (err) {
      console.error(err);
      setServerError('Unable to connect to the clinic server. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-[90vh] py-16 flex items-center justify-center relative overflow-hidden">
      
      {/* Decorative blobs */}
      <div className="absolute top-10 right-10 h-72 w-72 rounded-full bg-accent-light/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-slate-200/50 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 w-full relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-block bg-accent-light border border-primary/10 text-primary text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider font-semibold">
            Slot Booking
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-accent">
            Book Your Consultation Slot
          </h1>
          <p className="text-slate-600 text-sm max-w-md mx-auto font-sans">
            Fill out the details below to request a prioritized appointment slot with Dr. Mohammad Shoeb Shaikh.
          </p>
        </div>

        {/* Form Container */}
        <div
          ref={formBoxRef}
          className="bg-white border border-slate-100 rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-100/50"
        >
          {successData ? (
            /* Success screen state */
            <div className="text-center py-8 space-y-6 animate-fade-in">
              <div className="h-16 w-16 bg-accent-light text-primary rounded-full flex items-center justify-center mx-auto shadow-md border border-primary/10">
                <Sparkles className="h-8 w-8 animate-pulse" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-extrabold text-accent">
                  Appointment Booked!
                </h2>
                <p className="text-slate-600 text-sm max-w-sm mx-auto font-sans">
                  Hello <strong className="text-accent">{successData.name}</strong>, your request has been confirmed. Please save your booking details.
                </p>
              </div>

              {/* Summary card */}
              <div className="max-w-md mx-auto bg-slate-50 border border-slate-150 p-6 rounded-2xl text-left text-xs space-y-3 font-sans">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="font-semibold text-slate-500 uppercase tracking-wider">Booking Reference</span>
                  <span className="font-bold text-primary font-heading text-sm">{successData.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Patient Details</span>
                  <span className="font-semibold text-accent">{successData.name} ({successData.gender}, Age {successData.age})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date Requested</span>
                  <span className="font-semibold text-accent">{successData.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Selected Time</span>
                  <span className="font-semibold text-accent">{successData.time}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="primary" onClick={() => setSuccessData(null)}>
                  Book Another Slot
                </Button>
                <a
                  href={`https://wa.me/917021096008?text=Hello%20Zainab%20Clinic%2C%20I%20have%20booked%20an%20appointment%20with%20ID%20${successData.id}%20for%20${successData.name}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center font-heading font-medium rounded-full transition-all duration-300 px-6 py-2.5 text-sm bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm"
                >
                  Share on WhatsApp
                </a>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {serverError && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex gap-3 text-xs items-center">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <span>{serverError}</span>
                </div>
              )}

              {/* Patient Meta Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input
                  label="Patient Name"
                  id="name"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  error={errors.name}
                />
                <Input
                  label="Mobile Number"
                  id="phone"
                  placeholder="e.g. 7021096008"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  error={errors.phone}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Age"
                    id="age"
                    placeholder="e.g. 30"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    error={errors.age}
                  />
                  <Select
                    label="Gender"
                    id="gender"
                    placeholder="Select"
                    options={GENDER_OPTIONS}
                    value={formData.gender}
                    onChange={(e) => handleSelectChange('gender', e.target.value)}
                    required
                    error={errors.gender}
                  />
                </div>
              </div>

              {/* Schedule Parameters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Appointment Date"
                  id="date"
                  type="date"
                  min={new Date().toISOString().split('T')[0]} // Block previous dates
                  value={formData.date}
                  onChange={handleChange}
                  required
                  error={errors.date}
                />
                <Select
                  label="Preferred Time Slot"
                  id="time"
                  placeholder="Choose Timing Slot"
                  options={TIME_SLOTS}
                  value={formData.time}
                  onChange={(e) => handleSelectChange('time', e.target.value)}
                  required
                  error={errors.time}
                />
              </div>

              {/* Symptoms */}
              <Textarea
                label="Describe Symptoms / Reason for Visit"
                id="symptoms"
                placeholder="Briefly mention details like fever duration, chest congestion, BP check request etc. (Optional)"
                value={formData.symptoms}
                onChange={handleChange}
                rows={4}
              />

              {/* Submission Button */}
              <div className="pt-4 flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={loading}
                  className="w-full md:w-auto"
                >
                  {loading ? 'Processing Booking...' : 'Submit Appointment Request'}
                </Button>
              </div>

            </form>
          )}
        </div>

        {/* Timings advice */}
        <p className="text-center text-[10px] text-slate-400 mt-6 font-sans">
          Note: Walk-in patients are also welcome during official consultation hours (Mon - Sat: 9:00 AM - 1:00 PM, 5:00 PM - 9:00 PM).
        </p>

      </div>
    </div>
  );
}
