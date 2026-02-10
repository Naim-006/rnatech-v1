
import React from 'react';
import { ICONS } from '../constants';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 -mt-20">
      {/* Sidebar */}
      <aside className="w-64 h-full glass border-r border-white/5 flex flex-col p-6">
        <div className="flex items-center gap-2 mb-12">
          <ICONS.Logo theme="dark" />
          <span className="font-black text-lg tracking-tighter">RNATECH<span className="text-brand-500">ADMIN</span></span>
        </div>

        <nav className="flex-grow space-y-1">
          <Link to="/admin" className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-brand-600 font-bold text-sm">Dashboard</Link>
          <Link to="/admin/orders" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-white/5 font-medium text-sm text-slate-400 hover:text-white transition-all">Orders</Link>
          <Link to="/admin/products" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-white/5 font-medium text-sm text-slate-400 hover:text-white transition-all">Inventory</Link>
          <Link to="/admin/services" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-white/5 font-medium text-sm text-slate-400 hover:text-white transition-all">Services</Link>
          <Link to="/admin/users" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-white/5 font-medium text-sm text-slate-400 hover:text-white transition-all">Customers</Link>
        </nav>

        <div className="pt-6 border-t border-white/5">
          <Link to="/" className="text-xs text-slate-500 hover:text-white font-bold uppercase tracking-widest">Back to Front</Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto p-12">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold">Analytics Command</h2>
            <p className="text-slate-400">Real-time performance metrics across all segments.</p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/5 text-sm font-bold">Download Report</button>
            <button className="px-6 py-2.5 rounded-xl bg-brand-600 text-sm font-bold">Refresh Data</button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Revenue', value: '$124,592', delta: '+12.5%', color: 'brand' },
            { label: 'Active Orders', value: '42', delta: '+3', color: 'emerald' },
            { label: 'Website Requests', value: '18', delta: '-2', color: 'rose' },
            { label: 'Hardware Sales', value: '89', delta: '+18%', color: 'amber' }
          ].map((stat, i) => (
            <div key={i} className="glass p-6 rounded-2xl border border-white/5">
              <p className="text-xs font-bold text-slate-500 uppercase mb-2">{stat.label}</p>
              <div className="flex items-end justify-between">
                <h4 className="text-2xl font-black">{stat.value}</h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${stat.delta.startsWith('+') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                  {stat.delta}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders Table */}
        <div className="glass rounded-3xl border border-white/5 overflow-hidden">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h3 className="font-bold">Latest Global Transactions</h3>
            <button className="text-sm text-brand-500 font-bold">View Full Registry</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 text-[10px] font-bold text-slate-500 uppercase">
                  <th className="px-6 py-4">Transaction ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Product/Service</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { id: '#NX-9921', user: 'sarah.j@techflow.com', item: 'Enterprise App Suite', status: 'Pending Approval', rev: '$15,000.00' },
                  { id: '#NX-9918', user: 'k.chen@omnisys.io', item: '5x RNATECH Node Pro', status: 'Processing', rev: '$2,995.00' },
                  { id: '#NX-9915', user: 'mark.v@apex.co', item: 'Custom Dashboard Dev', status: 'Live', rev: '$4,200.00' },
                  { id: '#NX-9912', user: 'j.smith@freelance.net', item: 'SensorArray X1', status: 'Delivered', rev: '$249.00' }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-all group">
                    <td className="px-6 py-4 font-mono text-xs">{row.id}</td>
                    <td className="px-6 py-4 text-sm font-medium">{row.user}</td>
                    <td className="px-6 py-4 text-sm text-slate-400">{row.item}</td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-500">{row.status}</span>
                    </td>
                    <td className="px-6 py-4 text-right font-black text-sm">{row.rev}</td>
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
