import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Lock, User, Building2, LogIn, AlertCircle } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  
  // 1. Initialize State at the very top
  const [formData, setFormData] = useState({
    badgeId: '',
    password: '',
    station: 'Station 01 - Downtown Central'
  });
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Safety check: ensure formData exists before accessing badgeId
    if (!formData || !formData.badgeId) {
      setErrorMessage("Please enter your Badge ID");
      return;
    }

    setLoading(true);
    setErrorMessage('');
    
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.badgeId, // Mapping badgeId to 'username' for backend
          password: formData.password
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('dispatch_user', JSON.stringify(data.user));
        navigate('/dashboard');
      } else {
        setErrorMessage(data.message || "Unauthorized Access");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMessage("Terminal Connection Offline");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-600 to-orange-500"></div>

        <div className="text-center mb-10 mt-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-600/10 border border-red-500/20 rounded-2xl mb-4 text-red-500">
            <ShieldAlert size={40} />
          </div>
          <h1 className="text-3xl font-black tracking-tighter text-white uppercase">
            Smart<span className="text-red-500">Fire</span> Dispatch
          </h1>
        </div>

        {errorMessage && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 text-sm">
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Badge ID</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 text-slate-500" size={18} />
              <input 
                type="text" 
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white focus:border-red-500/50 outline-none"
                placeholder="DF-XXXX"
                value={formData.badgeId}
                onChange={(e) => setFormData(prev => ({...prev, badgeId: e.target.value}))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Security Key</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-slate-500" size={18} />
              <input 
                type="password" 
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white focus:border-red-500/50 outline-none"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 uppercase tracking-widest disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Initialize Duty"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;