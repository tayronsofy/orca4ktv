'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react';

const COUNTRIES = [
  'Afghanistan','Albania','Algeria','Andorra','Angola','Argentina','Armenia','Australia',
  'Austria','Azerbaijan','Bahrain','Bangladesh','Belarus','Belgium','Bolivia','Bosnia and Herzegovina',
  'Brazil','Bulgaria','Cambodia','Cameroon','Canada','Chile','China','Colombia','Costa Rica',
  'Croatia','Cuba','Cyprus','Czech Republic','Denmark','Dominican Republic','Ecuador','Egypt',
  'El Salvador','Estonia','Ethiopia','Finland','France','Georgia','Germany','Ghana','Greece',
  'Guatemala','Honduras','Hong Kong','Hungary','India','Indonesia','Iran','Iraq','Ireland',
  'Israel','Italy','Ivory Coast','Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kuwait',
  'Latvia','Lebanon','Libya','Lithuania','Luxembourg','Malaysia','Malta','Mexico','Moldova',
  'Morocco','Mozambique','Myanmar','Nepal','Netherlands','New Zealand','Nigeria','North Macedonia',
  'Norway','Oman','Pakistan','Palestine','Panama','Paraguay','Peru','Philippines','Poland',
  'Portugal','Qatar','Romania','Russia','Saudi Arabia','Senegal','Serbia','Singapore',
  'Slovakia','Slovenia','Somalia','South Africa','South Korea','Spain','Sri Lanka','Sudan',
  'Sweden','Switzerland','Syria','Taiwan','Tanzania','Thailand','Tunisia','Turkey','Uganda',
  'Ukraine','United Arab Emirates','United Kingdom','United States','Uruguay','Uzbekistan',
  'Venezuela','Vietnam','Yemen','Zimbabwe','Other',
];

interface FreeTrialFormProps {
  onBackToHome?: () => void;
}

const FreeTrialForm: React.FC<FreeTrialFormProps> = ({ onBackToHome }) => {
  const router = useRouter()
  const handleBack = onBackToHome || (() => router.push('/'))

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setAlreadySubmitted(false);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/trial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          device: formData.get('device'),
          country: formData.get('country'),
          message: formData.get('message'),
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        form.reset();
      } else {
        const data = await response.json();
        if (data.error === 'already_submitted') {
          setAlreadySubmitted(true);
        } else {
          setError("Something went wrong. Please try again or contact us at contact@smart4k.io.");
        }
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 bg-gradient-to-br from-[#020204] via-[#1a1d20] to-[#020204] px-4">
      <div className="relative z-10 w-full max-w-2xl bg-[#1f2326] border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_0_80px_rgba(168,85,247,0.15)] animate-fade-in">

        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 text-center tracking-tight">
          Start Your <span className="text-[#a855f7]">Free Trial</span>
        </h2>

        {submitted ? (
          <div className="text-center p-8 bg-green-600/20 border border-green-500/50 rounded-xl animate-fade-in">
            <i className="fas fa-check-circle text-green-400 text-6xl mb-4"></i>
            <h3 className="text-2xl font-bold text-white mb-3">Request Sent!</h3>
            <p className="text-green-200 mb-6">
              Check your email soon for your login details.
            </p>
            <button onClick={handleBack} className="bg-white text-black px-8 py-3 rounded-full font-bold uppercase hover:bg-gray-200 transition-colors">
              Back to Home
            </button>
          </div>
        ) : alreadySubmitted ? (
          <div className="text-center p-8 bg-yellow-600/20 border border-yellow-500/50 rounded-xl animate-fade-in">
            <i className="fas fa-clock text-yellow-400 text-6xl mb-4"></i>
            <h3 className="text-2xl font-bold text-white mb-3">Already Submitted</h3>
            <p className="text-yellow-200 mb-6">
              We already have a trial request from this email. Please allow 7 days between requests, or contact us directly.
            </p>
            <a href="mailto:contact@smart4k.io" className="bg-white text-black px-8 py-3 rounded-full font-bold uppercase hover:bg-gray-200 transition-colors inline-block">
              Contact Us
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* NAME */}
            <div>
              <label htmlFor="name" className="block text-gray-300 text-sm font-semibold mb-2">Name</label>
              <input
                id="name"
                required
                type="text"
                name="name"
                minLength={2}
                maxLength={50}
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-[#a855f7]"
                placeholder="Your Name"
                aria-label="Your Name"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label htmlFor="email" className="block text-gray-300 text-sm font-semibold mb-2">Email Address</label>
              <input
                id="email"
                required
                type="email"
                name="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                maxLength={254}
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-[#a855f7]"
                placeholder="you@example.com"
                aria-label="Your Email Address"
              />
            </div>

            {/* DEVICE */}
            <div>
              <label htmlFor="device" className="block text-gray-300 text-sm font-semibold mb-2">Device</label>
              <select
                id="device"
                required
                name="device"
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white bg-[#1f2326] appearance-none bg-no-repeat bg-right-8 bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23cccccc%22%20d%3D%22M7.41%2C8.59L12%2C13.17L16.59%2C8.59L18%2C10L12%2C16L6%2C10L7.41%2C8.59Z%22%2F%3E%3C%2Fsvg%3E')]"
                aria-label="Select Device"
              >
                <option value="">Select Device</option>
                <option value="Samsung/LG Smart TV">Samsung/LG Smart TV</option>
                <option value="Firestick / Android Box">Firestick / Android Box</option>
                <option value="Roku">Roku</option>
                <option value="Apple Device">Apple Device</option>
                <option value="PC / Laptop">PC / Laptop</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* COUNTRY */}
            <div>
              <label htmlFor="country" className="block text-gray-300 text-sm font-semibold mb-2">Country</label>
              <select
                id="country"
                required
                name="country"
                defaultValue=""
                className="w-full p-4 rounded-xl bg-[#1f2326] border border-white/10 text-white focus:ring-2 focus:ring-[#a855f7] appearance-none cursor-pointer"
                aria-label="Select your country"
              >
                <option value="" disabled>Select your country</option>
                {COUNTRIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* COMMENTS */}
            <div>
              <label htmlFor="message" className="block text-gray-300 text-sm font-semibold mb-2">Comments or Questions (Optional)</label>
              <textarea
                id="message"
                name="message"
                rows={3}
                maxLength={500}
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white"
                aria-label="Optional Comments or Questions"
              ></textarea>
            </div>

            {error && <p className="text-red-400 text-center">{error}</p>}

            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-[#6d28d9] to-[#a855f7] text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl disabled:opacity-50">
              {loading ? 'Sending...' : 'Get Free Trial'}
            </button>

            <div className="text-center mt-4">
              <button type="button" onClick={handleBack} className="text-gray-500 hover:text-white text-sm">Back</button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default FreeTrialForm;
