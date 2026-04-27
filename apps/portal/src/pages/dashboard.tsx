import React from 'react';

// Devopstrio AWS MGN Automation
// Executive Migration Factory Command Center & Wave Operations Dashboard

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-indigo-500/30">
            {/* Global Migration Header */}
            <header className="border-b border-white/5 bg-black/40 backdrop-blur-3xl sticky top-0 z-50">
                <div className="max-w-screen-2xl mx-auto px-10 h-24 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-600 to-amber-600 flex items-center justify-center font-black text-white shadow-[0_0_25px_rgba(249,115,22,0.4)] border border-white/10 relative overflow-hidden">
                            MA
                            <div className="absolute top-0 right-0 w-2 h-2 bg-orange-400 rounded-full m-1 border border-black shadow-[0_0_50px_10px_rgba(251,146,60,0.5)]"></div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-white tracking-widest leading-none">MGN AUTOMATION</h1>
                            <p className="text-[10px] font-bold text-orange-400 uppercase tracking-[0.3em] mt-2 italic">Factory-Scale Migration Orchestrator</p>
                        </div>
                    </div>
                    <nav className="flex gap-12 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                        <a href="#" className="text-orange-400 border-b-2 border-orange-500 pb-10 pt-10">Program Ops</a>
                        <a href="#" className="hover:text-white transition-all pt-10 pb-10">Wave Planning</a>
                        <a href="#" className="hover:text-white transition-all pt-10 pb-10">Server Inventory</a>
                        <a href="#" className="hover:text-white transition-all pt-10 pb-10">Cutover Center</a>
                        <a href="#" className="hover:text-white transition-all pt-10 pb-10">Dependency Map</a>
                    </nav>
                </div>
            </header>

            <main className="max-w-screen-2xl mx-auto px-10 py-12">

                {/* Global Migration program KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
                    {[
                        { label: 'Total Servers In-Scope', value: '1,240', status: '82% Discovery', color: 'indigo' },
                        { label: 'Replication Healthy', value: '842', status: 'Syncing', color: 'emerald' },
                        { label: 'Migration Velocity', value: '42/wk', status: '+12% Trend', color: 'orange' },
                        { label: 'Cutover Success Rate', value: '100%', status: 'Zero Failures', color: 'emerald' }
                    ].map((kpi, idx) => (
                        <div key={idx} className="bg-slate-900/40 p-10 rounded-[2.5rem] border border-white/5 hover:border-orange-500/40 transition-all shadow-2xl relative group overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-orange-500/10 transition-all"></div>
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4">{kpi.label}</span>
                            <div className="text-4xl font-black text-white tracking-tighter mb-4 font-mono">{kpi.value}</div>
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full bg-${kpi.color}-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]`}></div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{kpi.status}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Automation Intelligence & Wave Stack */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">

                    {/* Live Server Replication & Factory Feed */}
                    <div className="xl:col-span-2 bg-slate-900 p-12 rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-12">
                            <div>
                                <h2 className="text-3xl font-black text-white tracking-tight">Migration Throughput & Health</h2>
                                <p className="text-slate-400 text-sm mt-2 max-w-lg">Monitoring global AWS MGN agent status, data transfer latency, and cutover readiness across all active waves.</p>
                            </div>
                            <div className="flex gap-4">
                                <button className="bg-black hover:bg-slate-800 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border border-white/10">
                                    Export Migration Audit
                                </button>
                                <button className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-orange-900/40">
                                    Initiate Wave Cutover
                                </button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {[
                                { host: 'fin-app-prod-01', wave: 'Wave 1 - Finance', progress: 100, state: 'Ready for Cutover', icon: 'server' },
                                { host: 'fin-db-prod-08', wave: 'Wave 1 - Finance', progress: 100, state: 'Ready for Cutover', icon: 'database' },
                                { host: 'web-front-882', wave: 'Wave 2 - Public Web', progress: 68, state: 'Replicating', icon: 'globe' },
                                { host: 'legacy-sap-er-01', wave: 'Wave 3 - ERP', progress: 12, state: 'Initial Sync', icon: 'cpu' }
                            ].map((row, idx) => (
                                <div key={idx} className="p-8 bg-black/40 rounded-[2rem] border border-white/5 group hover:border-orange-500/20 transition-all flex justify-between items-center">
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 bg-orange-600/10 rounded-xl flex items-center justify-center border border-orange-500/20">
                                            <span className="text-orange-400 text-xs font-black italic">{row.icon[0].toUpperCase()}</span>
                                        </div>
                                        <div>
                                            <div className="text-sm font-black text-white">{row.host}</div>
                                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{row.wave}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-12">
                                        <div className="w-48">
                                            <div className="flex justify-between items-center mb-2">
                                                <div className="text-[9px] font-black text-slate-500 uppercase">Replication Progress</div>
                                                <div className="text-[9px] font-black text-white font-mono">{row.progress}%</div>
                                            </div>
                                            <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                                                <div className="h-full bg-orange-500 transition-all duration-1000" style={{ width: `${row.progress}%` }}></div>
                                            </div>
                                        </div>
                                        <div className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest ${row.state === 'Ready for Cutover' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-orange-500/10 text-orange-400'}`}>
                                            {row.state}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Active Wave & Governance Stack */}
                    <div className="flex flex-col gap-10">
                        <div className="bg-slate-900 p-10 rounded-[3rem] border border-white/5 shadow-2xl flex-1 flex flex-col">
                            <h3 className="text-xl font-black text-white uppercase tracking-wider mb-8 border-b border-orange-500/20 pb-6">Wave Pipeline State</h3>
                            <div className="space-y-8 flex-1">
                                {[
                                    { wave: 'Wave 1 - Finance', servers: 45, state: 'Readiness-Verify', color: 'emerald' },
                                    { wave: 'Wave 2 - Public Web', servers: 120, state: 'Replication-Active', color: 'orange' },
                                    { wave: 'Wave 3 - ERP Factory', servers: 82, state: 'Initial-Sync', color: 'indigo' },
                                    { wave: 'Wave 4 - Regional HR', servers: 14, state: 'Scoping-Audit', color: 'slate' }
                                ].map((w, i) => (
                                    <div key={i} className="group cursor-pointer">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-xs font-bold text-slate-300 group-hover:text-white">{w.wave}</span>
                                            <span className="text-[10px] font-black text-slate-500 font-mono">{w.servers} Servers</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full bg-${w.color}-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]`}></div>
                                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{w.state}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-10 bg-black hover:bg-slate-800 text-white text-[11px] font-black py-4 rounded-2xl border border-white/10 uppercase tracking-widest transition-all">
                                Manage Waves
                            </button>
                        </div>

                        <div className="bg-orange-600 p-10 rounded-[3rem] shadow-[0_0_50px_rgba(249,115,22,0.3)] relative overflow-hidden group border border-white/10">
                            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-all"></div>
                            <h4 className="text-[10px] font-black text-orange-200 uppercase tracking-widest mb-4 leading-none">Factory Insight</h4>
                            <div className="text-2xl font-black text-white tracking-tight mb-4">Post-Cutover Hypercare</div>
                            <p className="text-xs text-white/90 font-black px-6 py-4 rounded-2xl bg-black/20 shadow-xl leading-relaxed">
                                Wave 1 validation passed. DNS switchover confirmed for 42 production endpoints.
                            </p>
                        </div>
                    </div>

                </div>

                {/* Resilience & Program Risk Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                    <div className="bg-slate-900 p-10 rounded-[3.5rem] border border-white/5 shadow-xl">
                        <div className="flex justify-between items-center mb-10">
                            <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Replication Bandwidth (24h)</h5>
                            <div className="text-orange-400 text-[10px] font-black uppercase tracking-widest">AVG 420 MB/S</div>
                        </div>
                        <div className="flex items-end gap-1.5 h-32 px-2">
                            {[12, 14, 28, 42, 38, 14, 12, 10, 8, 12, 14, 42, 64, 28, 14, 12, 10, 18, 38, 42, 54, 32].map((v, i) => (
                                <div key={i} className="flex-1 bg-orange-500/20 rounded-t-lg hover:bg-orange-500 transition-all relative group cursor-pointer" style={{ height: `${v}%` }}>
                                    <div className="absolute -top-10 left-1/2 -ms-4 opacity-0 group-hover:opacity-100 bg-white text-black text-[10px] font-black px-2 py-1 rounded shadow-xl pointer-events-none transition-all">
                                        {v} servers
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-900 p-10 rounded-[3.5rem] border border-white/5 shadow-xl flex flex-col justify-between">
                        <div>
                            <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 border-b border-orange-500/20 pb-4">Migration Risk Register</h5>
                            <div className="space-y-4">
                                {[
                                    { risk: 'Storage Lag on SAP Wave', level: 'High', color: 'rose' },
                                    { risk: 'Missing OS Licenses on Legacy RHEL', level: 'Medium', color: 'orange' },
                                    { risk: 'VPC Limit Saturation - us-east-1', level: 'Medium', color: 'orange' }
                                ].map((r, i) => (
                                    <div key={i} className="flex justify-between items-center bg-black/40 p-4 rounded-2xl border border-white/5 group hover:border-orange-500/20 transition-all">
                                        <div className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">{r.risk}</div>
                                        <div className={`text-[8px] font-black px-3 py-1 rounded-full uppercase bg-${r.color}-500/10 text-${r.color}-400`}>{r.level}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button className="mt-8 bg-white hover:bg-slate-200 text-black text-[11px] font-black py-4 rounded-2xl uppercase tracking-widest transition-all">
                            View Crisis Runbook
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
