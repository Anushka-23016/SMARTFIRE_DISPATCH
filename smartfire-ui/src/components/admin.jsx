import React, { useState } from 'react';
import { Database, Search, Edit2, Trash2, Save, X, Filter } from 'lucide-react';

const AdminPanel = () => {
  // Mock Data - In a real app, this comes from your backend
  const [incidents, setIncidents] = useState([
    { id: 'INC-901', time: '10:15 AM', location: 'Warehouse 5', type: 'Structural', severity: 'Critical', status: 'Active' },
    { id: 'INC-902', time: '11:30 AM', location: 'Baker St.', type: 'Gas Leak', severity: 'Medium', status: 'Resolved' },
  ]);

  const [editingId, setEditingId] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Database className="text-blue-500" /> System Records
          </h1>
          <p className="text-slate-400 mt-1 text-sm">Review, Edit, and Manage AI-Generated Logs</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-slate-500" size={18} />
            <input 
              className="bg-slate-900 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500 w-full"
              placeholder="Search Incident ID..."
            />
          </div>
          <button className="bg-slate-800 p-2.5 rounded-lg border border-slate-700 hover:bg-slate-700">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Main Database Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/50 border-b border-slate-800">
              <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-400">Incident ID</th>
              <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-400">Timestamp</th>
              <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-400">Location</th>
              <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-400">Type</th>
              <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-400">Severity</th>
              <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {incidents.map((incident) => (
              <tr key={incident.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="p-4 font-mono text-blue-400">{incident.id}</td>
                <td className="p-4 text-slate-300">{incident.time}</td>
                <td className="p-4 font-semibold">
                  {editingId === incident.id ? (
                    <input className="bg-slate-950 border border-blue-500 rounded px-2 py-1 w-full" defaultValue={incident.location} />
                  ) : incident.location}
                </td>
                <td className="p-4">
                  <span className="px-3 py-1 bg-slate-800 rounded-full text-xs">{incident.type}</span>
                </td>
                <td className="p-4">
                  <span className={`font-bold ${incident.severity === 'Critical' ? 'text-red-500' : 'text-orange-500'}`}>
                    {incident.severity}
                  </span>
                </td>
                <td className="p-4 text-right">
                  {editingId === incident.id ? (
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setEditingId(null)} className="p-2 text-green-500 hover:bg-green-500/10 rounded-lg"><Save size={18} /></button>
                      <button onClick={() => setEditingId(null)} className="p-2 text-slate-500 hover:bg-slate-500/10 rounded-lg"><X size={18} /></button>
                    </div>
                  ) : (
                    <div className="flex justify-end gap-2 text-slate-500">
                      <button onClick={() => setEditingId(incident.id)} className="p-2 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg"><Edit2 size={18} /></button>
                      <button className="p-2 hover:text-red-500 hover:bg-red-500/10 rounded-lg"><Trash2 size={18} /></button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;