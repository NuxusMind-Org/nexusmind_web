import { useState } from 'react';

export const SubscriptionCard = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="w-full max-w-[1100px] mt-16 p-8 sm:p-12 backdrop-blur-[18px] bg-ui-glass border border-ui-border rounded-lg shadow-2xl flex flex-col items-center justify-center text-center gap-6 relative overflow-hidden">
      {/* Top Border Gradient Highlight */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#9f5bff] via-pink-400 to-[#00f2ff] opacity-90" />

      {/* Content */}
      <div className="flex flex-col gap-3">
        <h2 className="text-[26px] sm:text-[32px] font-semibold text-white tracking-tight leading-snug">
          Elmi yeniliklərdən xəbərdar olun
        </h2>
        <p className="text-white/80 text-[14px] sm:text-[16px] max-w-[650px] mx-auto font-light leading-relaxed">
          Ən son tədqiqatlaq və mərkəzimizin xəbər bülteni üçün qeydiyyatdan keçin.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-[550px] flex flex-col sm:flex-row gap-3.5 mt-2">
        <input
          type="email"
          required
          placeholder="E-poçt ünvanınız"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 h-12 w-full px-6 bg-[#0b2430]/75 border border-white/10 rounded-full text-[14px] text-white placeholder-white/40 focus:outline-none focus:border-[#00f2ff] focus:ring-1 focus:ring-[#00f2ff] transition-all"
        />
        <button
          type="submit"
          className="h-12 whitespace-nowrap bg-gradient-to-r from-[#9f5bff] to-[#a88bff] text-[#1a2b3c] font-bold text-[14px] sm:text-[15px] rounded-full px-8 hover:opacity-95 transition-all duration-300 shadow-[0_4px_14px_rgba(168,139,255,0.4)] hover:shadow-[0_6px_20px_rgba(168,139,255,0.6)] cursor-pointer"
        >
          {submitted ? 'Qeydiyyatdan keçildi' : 'Göndər'}
        </button>
      </form>
    </div>
  );
};
