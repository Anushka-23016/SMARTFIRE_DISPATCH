import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Lock, User, Building2, LogIn } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate(); // Add this

 // Inside Login.jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch('http://localhost:5000/api/login', { // Match your backend port
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: formData.badgeId, // Backend expects 'username'
        password: formData.password
      }),
    });

    const data = await response.json();

    if (data.success) {
      // If login works, go to dashboard
      navigate('/dashboard');
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Login Error:", error);
    // For Hackathon speed: if backend isn't running yet, just bypass:
    // navigate('/dashboard'); 
  }
};
  

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      {/* Background Decorative Glow */}
      <div className="absolute w-96 h-96 bg-red-600/10 rounded-full blur-[120px] -top-10 -left-10"></div>
      <div className="absolute w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -bottom-10 -right-10"></div>

      <div className="relative w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl overflow-hidden">
        {/* Top Accent Bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-600 to-orange-500"></div>

        {/* Header */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-600/10 border border-red-500/20 rounded-2xl mb-4 text-red-500 shadow-inner">
            <ShieldAlert size={40} />
          </div>
          <h1 className="text-3xl font-black tracking-tighter text-white uppercase">
            Smart<span className="text-red-500">Fire</span> Dispatch
          </h1>
          <p className="text-slate-400 text-sm mt-2 font-medium uppercase tracking-widest">
            Secure Terminal Access
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Badge ID */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Badge ID</label>
            <div className="relative group">
              <User className="absolute left-3 top-3.5 text-slate-500 group-focus-within:text-red-500 transition-colors" size={18} />
              <input 
                type="text" 
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all"
                placeholder="DF-XXXX"
                onChange={(e) => setFormData({...formData, badgeId: e.target.value})}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Security Key</label>
            <div className="relative group">
              <Lock className="absolute left-3 top-3.5 text-slate-500 group-focus-within:text-red-500 transition-colors" size={18} />
              <input 
                type="password" 
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all"
                placeholder="••••••••"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          {/* Station Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Duty Station</label>
            <div className="relative group">
              <Building2 className="absolute left-3 top-3.5 text-slate-500 group-focus-within:text-red-500 transition-colors" size={18} />
              <select 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-slate-300 focus:outline-none focus:border-red-500/50 transition-all appearance-none"
                onChange={(e) => setFormData({...formData, station: e.target.value})}
              >
                <option>Station 01 - Downtown Central</option>
                <option>Station 02 - North Industrial</option>
                <option>Station 03 - Residential East</option>
              </select>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-900/20 transform transition active:scale-[0.98] flex items-center justify-center gap-3 mt-8 uppercase tracking-widest"
          >
            <LogIn size={20} />
            Initialize Duty
          </button>
        </form>

        <div className="mt-8 text-center">
          <span className="text-[10px] text-slate-600 font-mono tracking-tighter uppercase">
            System Integrity Verified • Encrypted Connection
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;