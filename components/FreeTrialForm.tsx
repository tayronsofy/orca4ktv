'use client'

import { useRouter } from 'next/navigation'



import React, { useState } from 'react';

interface FreeTrialFormProps {
  onBackToHome?: () => void;
}

const FreeTrialForm: React.FC<FreeTrialFormProps> = ({ onBackToHome }) => {
  const router = useRouter()
  const handleBack = onBackToHome || (() => router.push('/'))
  // FormSubmit.co Endpoint
  const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "https://formsubmit.co/tayron.sof@gmail.com";

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitted(true);
        form.reset();
      } else {
        const data = await response.json();
        if (Object.prototype.hasOwnProperty.call(data, 'errors')) {
          setError(data.errors.map((err: any) => err.message).join(", "));
        } else {
          setError("Oops! There was a problem submitting your form");
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
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* FormSubmit.co Configuration */}
            <input type="hidden" name="_subject" value="New SMART 4K Free Trial Request" />
            <input type="hidden" name="_template" value="table" />
            {/* Disable Captcha for smoother experience (optional) */}
            <input type="hidden" name="_captcha" value="false" />
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

            {/* EMAIL (Formspree uses this to Reply-To automatically) */}
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

            {/* COUNTRY - Now a text input */}
            <div>
              <label htmlFor="country" className="block text-gray-300 text-sm font-semibold mb-2">Country</label>
              <input
                id="country"
                required
                type="text"
                name="country"
                minLength={2}
                maxLength={50}
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-[#a855f7]"
                placeholder="e.g., United States"
                aria-label="Your Country"
              />
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

            {/* reCAPTCHA Enterprise Widget */}
            <div className="flex justify-center mb-4">
              <div className="g-recaptcha" data-sitekey="6LeBJWIsAAAAAO8tw3miVMCZUbNv3P16DVw9ZMlK" data-action="FREE_TRIAL"></div>
            </div>

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