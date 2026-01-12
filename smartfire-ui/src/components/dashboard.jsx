import React, { useState } from 'react';
import { Activity, MapPin, ShieldAlert, PhoneIncoming, Truck, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const [isListening, setIsListening] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="flex justify-between items-center mb-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="bg-red-600 p-2 rounded-lg"><ShieldAlert size={24} /></div>
          <h1 className="text-xl font-bold tracking-widest">SMARTFIRE <span className="text-red-500 text-sm font-normal">v1.0</span></h1>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/50 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-500 font-mono font-bold">DISPATCHER ACTIVE</span>
          </div>
          <button className="bg-slate-800 px-4 py-2 rounded-lg text-sm hover:bg-slate-700 transition">Logout</button>
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-12 gap-4 h-[calc(100vh-120px)]">
        
        {/* LEFT COLUMN: LIVE CALL TRANSCRIPTION */}
        <div className="col-span-3 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Live Audio Feed</h2>
            <PhoneIncoming size={18} className="text-blue-400" />
          </div>
          <div className="flex-1 p-4 overflow-y-auto font-mono text-sm space-y-4">
            <div className="text-slate-500 italic">[09:41:02] Connection established...</div>
            <div className="text-blue-400 font-bold">CALLER: "Help! There's heavy smoke coming from the basement of the warehouse on 5th and Main!"</div>
            <div className="text-slate-300">DISPATCH: "Copy that, stay on the line. Is anyone inside?"</div>
          </div>
          <div className="p-4 bg-slate-950 border-t border-slate-800">
            <button 
              onClick={() => setIsListening(!isListening)}
              className={`w-full py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 ${isListening ? 'bg-red-600 animate-pulse' : 'bg-blue-600'}`}>
              <Activity size={20} />
              {isListening ? 'STOP LISTENING' : 'START CALL CAPTURE'}
            </button>
          </div>
        </div>

        {/* MIDDLE COLUMN: AI ANALYSIS RESULTS */}
        <div className="col-span-6 space-y-4 flex flex-col">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-500 uppercase font-bold">Detected Incident</span>
              <div className="text-xl font-bold text-red-500 mt-1">Structural Fire</div>
            </div>
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-500 uppercase font-bold">Severity Score</span>
              <div className="text-xl font-bold text-orange-500 mt-1">Critical (8.9/10)</div>
            </div>
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-500 uppercase font-bold">Confidence</span>
              <div className="text-xl font-bold text-green-500 mt-1">94%</div>
            </div>
          </div>

          <div className="flex-1 bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="text-red-500" /> 1242 Industrial Way, Sector 4
              </h2>
              <p className="text-slate-400 leading-relaxed">
                AI has identified a high-risk chemical storage area adjacent to the fire source. 
                Immediate evacuation of 500m radius recommended.
              </p>
            </div>
            <button className="w-full py-6 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-2xl font-black tracking-tighter shadow-2xl shadow-red-900/20 transform transition active:scale-[0.98]">
              CONFIRM & DISPATCH ALL UNITS
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: RESOURCE MANAGEMENT */}
        <div className="col-span-3 space-y-4">
          <div className="bg-slate-900 h-1/2 rounded-2xl border border-slate-800 overflow-hidden relative">
             {/* Placeholder for Map */}
             <div className="absolute inset-0 bg-slate-800 flex items-center justify-center italic text-slate-500 text-sm">
                Interactive Map Component Loading...
             </div>
          </div>
          <div className="bg-slate-900 h-[calc(50%-1rem)] rounded-2xl border border-slate-800 p-4 overflow-y-auto">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Nearby Resources</h3>
            <div className="space-y-3">
              {[101, 104, 202].map(id => (
                <div key={id} className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-3">
                    <Truck size={18} className="text-slate-400" />
                    <span className="font-bold text-sm">Engine #{id}</span>
                  </div>
                  <CheckCircle size={16} className="text-green-500" />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;