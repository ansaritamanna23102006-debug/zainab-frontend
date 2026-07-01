'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Clock, Mail, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import useGsapAnimation from '@/hooks/useGsapAnimation';
import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import Textarea from '@/components/UI/Textarea';

export default function ContactClient() {
  const detailsBoxRef = useGsapAnimation({ animationType: 'fade-up', y: 30 });
  const formBoxRef = useGsapAnimation({ animationType: 'fade-up', y: 30, delay: 0.15 });

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Please enter your name.';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      tempErrors.email = 'Please enter your email.';
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.message.trim()) tempErrors.message = 'Please write a message.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setSuccess(false);
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        setServerError(resData.error || 'Failed to submit form.');
      }
    } catch (err) {
      console.error(err);
      setServerError('Clinic server is unreachable. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light min-h-screen">
      
      {/* Header Banner */}
      <section className="relative py-20 bg-gradient-to-b from-accent-light/30 via-white to-light border-b border-primary/5 text-center overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-accent-light/50 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-4">
          <div className="inline-block bg-accent-light border border-primary-light/10 text-primary text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider font-semibold">
            Contact Channels
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-accent">
            We Are Here To Help
          </h1>
          <p className="text-muted max-w-xl mx-auto text-sm font-sans">
            Reach out to our customer support desk for inquiry questions, slot shifts, or feedback statements.
          </p>
        </div>
      </section>

      {/* Main Grid content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Clinic details */}
          <div
            ref={detailsBoxRef}
            className="lg:col-span-5 bg-white border border-slate-150/80 rounded-3xl p-8 md:p-10 shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-accent font-heading">
                Contact Information
              </h2>
              
              <div className="space-y-6 font-sans">
                {/* Address */}
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-accent-light border border-primary-light/10 shadow-sm text-primary flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-accent text-sm mb-1">Clinic Address</h4>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      Sangam Complex, Opp. Muthoot Finance, <br />
                      Woollen Chawl, Ambernath (W) - 421501
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-accent-light border border-primary-light/10 shadow-sm text-primary flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-accent text-sm mb-1">Direct Call</h4>
                    <p className="text-slate-655 text-xs font-semibold">
                      +91 70210 96008
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-accent-light border border-primary-light/10 shadow-sm text-primary flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-accent text-sm mb-1">Direct Email</h4>
                    <p className="text-slate-600 text-xs">
                      info@zainabclinic.com
                    </p>
                  </div>
                </div>

                {/* Working hours */}
                <div className="flex gap-4 border-t border-slate-200 pt-6">
                  <div className="h-10 w-10 rounded-xl bg-accent-light border border-primary-light/10 shadow-sm text-primary flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-accent text-sm mb-1.5">Consultation Hours</h4>
                    <p className="text-slate-600 text-xs font-medium">
                      Mon - Sat: 9:00 AM - 1:00 PM <br />
                      Evening: 5:00 PM - 9:00 PM
                    </p>
                    <p className="text-red-500 text-xs font-semibold mt-1">
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-light p-5 rounded-2xl border border-slate-150/60 text-center">
              <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">
                WhatsApp Support Channel
              </span>
              <a
                href="https://wa.me/917021096008"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full justify-center bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl text-xs font-bold transition-colors shadow-md shadow-teal-500/10"
              >
                Chat on WhatsApp
              </a>
            </div>

          </div>

          {/* Right Column: Contact form */}
          <div
            ref={formBoxRef}
            className="lg:col-span-7 bg-white border border-slate-150/85 rounded-3xl p-8 md:p-10 shadow-xl shadow-primary/5 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-accent font-heading">
                Send A Message
              </h2>

              {success && (
                <div className="bg-accent-light border border-primary-light/20 text-primary p-4 rounded-xl flex gap-3 text-xs items-center">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary-light" />
                  <span>Your message has been sent successfully! We will get back to you shortly.</span>
                </div>
              )}

              {serverError && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex gap-3 text-xs items-center">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <span>{serverError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    label="Full Name"
                    id="name"
                    placeholder="e.g. Rajesh Patil"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    error={errors.name}
                  />
                  <Input
                    label="Email Address"
                    id="email"
                    type="email"
                    placeholder="e.g. rajesh@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    error={errors.email}
                  />
                </div>

                <Input
                  label="Subject"
                  id="subject"
                  placeholder="e.g. Shift Booking Time, General Inquiry..."
                  value={formData.subject}
                  onChange={handleChange}
                />

                <Textarea
                  label="Your Message"
                  id="message"
                  placeholder="Type your message details here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  error={errors.message}
                />

                <div className="pt-2 flex justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={loading}
                    className="w-full md:w-auto flex items-center justify-center gap-2"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* Full-width Map Section */}
      <section className="h-[400px] border-t border-slate-100">
        <iframe
          title="Zainab Clinic Location Detailed Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.618641916327!2d73.1944843!3d19.2131106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be793f8479b9945%3A0x2b5eaf8656bbbb81!2sZainab%20clinic!5e0!3m2!1sen!2sin!4v1717800000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />
      </section>

    </div>
  );
}
