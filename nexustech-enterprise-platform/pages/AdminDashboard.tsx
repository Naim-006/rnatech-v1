
import * as React from 'react';
import { ICONS } from '../constants';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen lg:overflow-hidden bg-slate-950 -mt-20">
      {/* Sidebar - Hidden on mobile for now or simplified */}
      <aside className="w-full lg:w-64 h-auto lg:h-full glass lg:border-r border-b lg:border-b-0 border-white/5 flex flex-row lg:flex-col items-center lg:items-start p-4 md:p-6 overflow-x-auto lg:overflow-x-visible">
        <div className="flex items-center gap-2 mb-0 lg:mb-12 mr-8 lg:mr-0 shrink-0">
          <ICONS.Logo theme="dark" />
          <span className="font-black text-lg tracking-tighter">NEXUS<span className="text-brand-500">ADMIN</span></span>
        </div>

        <nav className="flex lg:flex-grow flex-row lg:flex-col space-x-2 lg:space-x-0 lg:space-y-1">
          <Link to="/admin" className="whitespace-nowrap flex items-center gap-3 px-4 py-2.5 rounded-lg bg-brand-600 font-bold text-xs md:text-sm">Dashboard</Link>
          <Link to="/admin/orders" className="whitespace-nowrap flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-white/5 font-medium text-xs md:text-sm text-slate-400 hover:text-white transition-all">Orders</Link>
          <Link to="/admin/products" className="whitespace-nowrap flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-white/5 font-medium text-xs md:text-sm text-slate-400 hover:text-white transition-all">Inventory</Link>
          <Link to="/admin/services" className="whitespace-nowrap flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-white/5 font-medium text-xs md:text-sm text-slate-400 hover:text-white transition-all">Services</Link>
          <Link to="/admin/users" className="whitespace-nowrap flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-white/5 font-medium text-xs md:text-sm text-slate-400 hover:text-white transition-all">Customers</Link>
        </nav>

        <div className="hidden lg:block pt-6 border-t border-white/5">
          <Link to="/" className="text-[10px] text-slate-500 hover:text-white font-bold uppercase tracking-widest">Back to Front</Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto p-6 md:p-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Analytics Command</h2>
            <p className="text-slate-400 text-sm">Real-time performance metrics across all segments.</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-white/5 border border-white/5 text-xs font-bold whitespace-nowrap">Download Report</button>
            <button className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-brand-600 text-xs font-bold whitespace-nowrap">Refresh Data</button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {[
            { label: 'Total Revenue', value: '৳১২৪,৫৯২', delta: '+12.5%', color: 'brand' },
            { label: 'Active Orders', value: '৪২', delta: '+3', color: 'emerald' },
            { label: 'Website Requests', value: '১৮', delta: '-2', color: 'rose' },
            { label: 'Hardware Sales', value: '৮৯', delta: '+18%', color: 'amber' }
          ].map((stat, i) => (
            <div key={i} className="glass p-4 md:p-6 rounded-2xl border border-white/5">
              <p className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase mb-2 tracking-wider">{stat.label}</p>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-1">
                <h4 className="text-xl md:text-2xl font-black tracking-tight">{stat.value}</h4>
                <span className={`w-fit text-[9px] font-black px-2 py-0.5 rounded-full ${stat.delta.startsWith('+') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                  {stat.delta}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders Table */}
        <div className="glass rounded-[2rem] border border-white/5 overflow-hidden">
          <div className="p-6 md:p-8 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="font-bold tracking-tight italic uppercase">Latest Global Transactions</h3>
            <button className="text-[10px] text-brand-500 font-bold uppercase tracking-widest hover:underline">View Full Registry</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  <th className="px-6 py-4 whitespace-nowrap">Transaction ID</th>
                  <th className="px-6 py-4 whitespace-nowrap">Customer</th>
                  <th className="px-6 py-4 whitespace-nowrap">Product/Service</th>
                  <th className="px-6 py-4 whitespace-nowrap">Status</th>
                  <th className="px-6 py-4 text-right whitespace-nowrap">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { id: '#NX-9921', user: 'sarah.j@techflow.com', item: 'Enterprise App Suite', status: 'Pending Approval', rev: '৳১৫,০০০.০০' },
                  { id: '#NX-9918', user: 'k.chen@omnisys.io', item: '5x Nexus Node Pro', status: 'Processing', rev: '৳২,৯৯৫.০০' },
                  { id: '#NX-9915', user: 'mark.v@apex.co', item: 'Custom Dashboard Dev', status: 'Live', rev: '৳৪,২০০.০০' },
                  { id: '#NX-9912', user: 'j.smith@freelance.net', item: 'SensorArray X1', status: 'Delivered', rev: '৳২৪৯.০০' }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-all group">
                    <td className="px-6 py-5 font-mono text-[10px] md:text-xs text-slate-500">{row.id}</td>
                    <td className="px-6 py-5 text-xs md:text-sm font-bold text-slate-300">{row.user}</td>
                    <td className="px-6 py-5 text-xs md:text-sm text-slate-400">{row.item}</td>
                    <td className="px-6 py-5">
                      <span className="text-[9px] md:text-[10px] font-black px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-500 uppercase tracking-widest">{row.status}</span>
                    </td>
                    <td className="px-6 py-5 text-right font-black text-xs md:text-sm tracking-tight">{row.rev}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
