
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../App';
import { ICONS } from '../constants';

const DashboardPage = () => {
  const { state, logout } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        <aside className="w-full md:w-64 space-y-2">
          <div className="p-6 bg-slate-900 rounded-2xl border border-white/5 mb-8 text-center">
            <div className="w-16 h-16 bg-brand-600 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-black">
              {state.user?.email.charAt(0).toUpperCase()}
            </div>
            <h3 className="font-bold truncate">{state.user?.email}</h3>
            <p className="text-xs text-brand-500 font-mono mt-1 uppercase tracking-widest">{state.user?.role}</p>
          </div>

          <button className="w-full flex items-center gap-3 px-6 py-3 rounded-xl bg-brand-600 text-sm font-bold">
            Dashboard Overview
          </button>
          <button className="w-full flex items-center gap-3 px-6 py-3 rounded-xl hover:bg-white/5 text-sm font-bold transition-all">
            Order History
          </button>
          <button className="w-full flex items-center gap-3 px-6 py-3 rounded-xl hover:bg-white/5 text-sm font-bold transition-all">
            My Tickets
          </button>
          <button onClick={logout} className="w-full flex items-center gap-3 px-6 py-3 rounded-xl hover:bg-red-500/10 text-red-500 text-sm font-bold transition-all">
            Sign Out
          </button>
        </aside>

        <div className="flex-grow space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="glass p-6 rounded-2xl border border-white/5">
              <p className="text-xs font-bold text-slate-500 uppercase mb-1">Active Projects</p>
              <h4 className="text-2xl font-bold">2</h4>
            </div>
            <div className="glass p-6 rounded-2xl border border-white/5">
              <p className="text-xs font-bold text-slate-500 uppercase mb-1">Hardware Orders</p>
              <h4 className="text-2xl font-bold">1</h4>
            </div>
            <div className="glass p-6 rounded-2xl border border-white/5">
              <p className="text-xs font-bold text-slate-500 uppercase mb-1">Support Credits</p>
              <h4 className="text-2xl font-bold">250</h4>
            </div>
          </div>

          <div className="glass rounded-3xl border border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h3 className="font-bold">Recent Activities</h3>
              {/* Fix: Added missing Link import to resolve 'Cannot find name Link' error */}
              <Link to="/help" className="text-xs text-brand-500 font-bold hover:underline">Support Hub</Link>
            </div>
            <div className="divide-y divide-white/5">
              {[
                { title: 'Project Update', desc: 'RNATECH Node Pro Gateway v2 development started', date: '2 hours ago', status: 'In Progress' },
                { title: 'Order #TX-9281', desc: 'Hardware shipment dispatched from Singapore', date: 'Yesterday', status: 'Shipped' },
                { title: 'Payment Confirmed', desc: 'Invoice #INV-4421 has been settled', date: '3 days ago', status: 'Success' }
              ].map((act, i) => (
                <div key={i} className="p-6 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm">{act.title}</h4>
                    <p className="text-xs text-slate-400">{act.desc}</p>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] font-bold text-slate-500 uppercase">{act.date}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${act.status === 'Success' ? 'bg-green-500/10 text-green-500' : 'bg-brand-500/10 text-brand-500'}`}>{act.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
