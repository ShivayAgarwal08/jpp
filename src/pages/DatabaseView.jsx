import { useState, useEffect } from 'react';
import { Search, RefreshCw, Database, Table, ArrowLeft, Shield, Zap, Lock } from 'lucide-react';
import { getApiUrl } from '../config';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

export default function DatabaseView() {
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('users');
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        try {
            const [usersRes, ordersRes] = await Promise.all([
                fetch(getApiUrl('api/users')),
                fetch(getApiUrl('api/orders'))
            ]);

            if (usersRes.ok) setUsers(await usersRes.json());
            if (ordersRes.ok) setOrders(await ordersRes.json());
            setError(null);
        } catch (error) {
            console.error("Failed to fetch data:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-600 selection:text-white">
            <div className="max-w-7xl mx-auto p-6 md:p-12">
                
                {/* Master Header */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                    <div className="flex items-center gap-6">
                        <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => navigate('/vendor')}
                            className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all shadow-xl"
                        >
                            <ArrowLeft size={28} />
                        </motion.button>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h1 className="text-4xl font-black tracking-tighter italic uppercase">Master Terminal.</h1>
                                <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full animate-pulse shadow-[0_0_15px_rgba(37,99,235,0.5)]">LIVE DATA REDUNDANCY</span>
                            </div>
                            <p className="text-white/30 text-xs font-black uppercase tracking-[0.4em]">SQLite Engine V3.2 • Secure Read-Only Access</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-[1.5rem] flex items-center gap-8">
                            <div className="text-center">
                                <p className="text-[9px] text-white/30 font-black uppercase tracking-widest mb-1">Users</p>
                                <p className="text-xl font-black italic">{users.length}</p>
                            </div>
                            <div className="w-px h-8 bg-white/10" />
                            <div className="text-center">
                                <p className="text-[9px] text-white/30 font-black uppercase tracking-widest mb-1">Logs</p>
                                <p className="text-xl font-black italic">{orders.length}</p>
                            </div>
                        </div>
                        <button
                            onClick={fetchData}
                            className="bg-white text-black p-5 rounded-2xl font-black hover:scale-110 active:scale-95 transition-all shadow-2xl shadow-white/10 flex items-center justify-center group"
                        >
                            <RefreshCw size={24} className={clsx(loading && "animate-spin")} />
                        </button>
                    </div>
                </header>

                {error ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-red-600/10 text-red-500 p-12 rounded-[3.5rem] text-center border-2 border-red-600/20 shadow-2xl"
                    >
                        <Shield className="mx-auto mb-6 opacity-40" size={64} />
                        <h3 className="font-black text-3xl mb-4 italic tracking-tighter">Terminal Link Severed.</h3>
                        <p className="font-mono text-sm mb-10 opacity-60 max-w-md mx-auto leading-relaxed">{error}</p>
                        <button onClick={fetchData} className="px-10 py-5 bg-red-600 text-white rounded-2xl font-black hover:bg-red-500 transition-all uppercase tracking-widest shadow-xl">
                            Re-establish Uplink
                        </button>
                    </motion.div>
                ) : (
                    <div className="space-y-12">
                        {/* Selector Tabs */}
                        <div className="flex gap-10 border-b border-white/5">
                            <DbTab 
                                label="USER MANIFEST" 
                                active={activeTab === 'users'} 
                                onClick={() => setActiveTab('users')} 
                                icon={<Lock size={16} />}
                            />
                            <DbTab 
                                label="ORDER LEDGER" 
                                active={activeTab === 'orders'} 
                                onClick={() => setActiveTab('orders')} 
                                icon={<Zap size={16} />}
                            />
                        </div>

                        {/* Data Grid */}
                        <motion.div 
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#0A0A0A] rounded-[3.5rem] shadow-2xl border border-white/5 overflow-hidden relative"
                        >
                            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

                            <div className="overflow-x-auto relative z-10">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-white/[0.02] text-[10px] uppercase font-black text-white/30 border-b border-white/5">
                                        <tr>
                                            {activeTab === 'users' ? (
                                                <>
                                                    <th className="px-8 py-6 tracking-widest">Auth ID</th>
                                                    <th className="px-8 py-6 tracking-widest">Personnel</th>
                                                    <th className="px-8 py-6 tracking-widest">Network Email</th>
                                                    <th className="px-8 py-6 tracking-widest">Clearance</th>
                                                    <th className="px-8 py-6 tracking-widest">Enrollment Time</th>
                                                </>
                                            ) : (
                                                <>
                                                    <th className="px-8 py-6 tracking-widest">Order Hash</th>
                                                    <th className="px-8 py-6 tracking-widest">Origin Personnel</th>
                                                    <th className="px-8 py-6 tracking-widest">Auth PIN</th>
                                                    <th className="px-8 py-6 tracking-widest">Ledger Val</th>
                                                    <th className="px-8 py-6 tracking-widest">Operation Status</th>
                                                    <th className="px-8 py-6 tracking-widest">Timestamp</th>
                                                </>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {activeTab === 'users' ? 
                                            users.map((user) => (
                                                <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                                                    <td className="px-8 py-6 font-mono text-[10px] text-white/20 group-hover:text-white/40">{user.id}</td>
                                                    <td className="px-8 py-6 font-black italic text-lg">{user.name || '-'}</td>
                                                    <td className="px-8 py-6 text-blue-500 font-bold">{user.email}</td>
                                                    <td className="px-8 py-6">
                                                        <span className={clsx(
                                                            "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                                                            user.role === 'vendor' ? "bg-orange-500/10 border-orange-500/30 text-orange-500" : "bg-white/5 border-white/10 text-white/40"
                                                        )}>
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-6 text-[10px] font-black text-white/20 uppercase tracking-widest">{new Date(user.created_at).toLocaleString()}</td>
                                                </tr>
                                            )) : 
                                            orders.map((order) => (
                                                <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                                                    <td className="px-8 py-6 font-mono text-[10px] text-white/20 group-hover:text-white/40">{order.id}</td>
                                                    <td className="px-8 py-6">
                                                        <div className="font-black italic text-lg">{order.userEmail?.split('@')[0]}</div>
                                                        <div className="text-[9px] text-white/20 font-black tracking-widest mt-1">SRC: {order.userEmail}</div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <span className="bg-white/5 px-4 py-2 rounded-xl font-mono text-2xl font-black text-blue-600 italic tracking-[0.2em]">{order.otp}</span>
                                                    </td>
                                                    <td className="px-8 py-6 font-black text-green-500 italic text-xl">₹{order.totalAmount}</td>
                                                    <td className="px-8 py-6">
                                                        <span className={clsx(
                                                            "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                                                            order.status === 'paid' ? "bg-blue-600/10 border-blue-600/30 text-blue-500" :
                                                            order.status === 'collected' ? "bg-green-600/10 border-green-600/30 text-green-500" :
                                                            "bg-gray-500/10 border-gray-500/30 text-gray-400"
                                                        )}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-6 text-[10px] font-black text-white/20 uppercase tracking-widest italic">{new Date(order.created_at).toLocaleString()}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
}

function DbTab({ label, active, onClick, icon }) {
    return (
        <button
            onClick={onClick}
            className={clsx(
                "pb-6 px-4 font-black text-[11px] uppercase tracking-[0.3em] flex items-center gap-3 transition-all relative",
                active ? "text-white" : "text-white/20 hover:text-white/40"
            )}
        >
            {icon}
            {label}
            {active && (
                <motion.div 
                    layoutId="dbactive"
                    className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,1)]"
                />
            )}
        </button>
    );
}
