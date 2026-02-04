import { useState, useEffect } from 'react';
import { Search, RefreshCw, Database, Table, User, FileText, ChevronRight, Activity, ShieldCheck, ArrowLeft } from 'lucide-react';
import { getApiUrl } from '../config';
import { useNavigate } from 'react-router-dom';

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
        <div className="min-h-screen bg-white text-black font-sans transition-colors duration-500 overflow-x-hidden">
            
            {/* Nav Header */}
            <div className="sticky top-0 z-50 glass-morphism border-b border-black/5 py-4">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <button onClick={() => navigate(-1)} className="p-3 rounded-2xl hover:bg-neutral-50 transition-all text-neutral-400 hover:text-black border border-transparent hover:border-black/5">
                        <ArrowLeft size={24} />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white shadow-xl rotate-3">
                            <Database size={20} />
                        </div>
                        <h1 className="font-black text-lg tracking-tighter uppercase">CORE SYSTEM DB<span className="text-orange-500">.</span></h1>
                    </div>
                    <button 
                        onClick={fetchData}
                        className="flex items-center gap-3 px-6 py-3 bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg"
                    >
                        <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                        SYNC
                    </button>
                </div>
            </div>

            <main className="max-w-7xl mx-auto p-6 md:p-12 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-8 rounded-[40px] border border-black/5 shadow-premium flex items-center justify-between group">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 bg-blue-500/5 text-blue-500 rounded-[22px] flex items-center justify-center border border-blue-500/10">
                                <User size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest leading-none mb-2">AUTH USERS</p>
                                <p className="text-3xl font-black tracking-tighter uppercase text-black">{users.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-[40px] border border-black/5 shadow-premium flex items-center justify-between group">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 bg-orange-500/5 text-orange-500 rounded-[22px] flex items-center justify-center border border-orange-500/10">
                                <Activity size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest leading-none mb-2">LIVE ORDERS</p>
                                <p className="text-3xl font-black tracking-tighter uppercase text-black">{orders.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-[40px] border border-black/5 shadow-premium flex items-center justify-between group">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 bg-green-500/5 text-green-500 rounded-[22px] flex items-center justify-center border border-green-500/10">
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest leading-none mb-2">SYSTEM STATUS</p>
                                <p className="text-3xl font-black tracking-tighter uppercase text-green-500">OPTIMAL</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Table Interface */}
                <div className="bg-white rounded-[56px] border border-black/5 shadow-premium overflow-hidden">
                    <div className="px-10 py-8 border-b border-black/5 flex items-center gap-10">
                        <button
                            onClick={() => setActiveTab('users')}
                            className={`pb-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative border-b-2 ${activeTab === 'users' ? 'text-black border-orange-500 font-black' : 'text-neutral-300 border-transparent hover:text-black'}`}
                        >
                            USER CLUSTER
                        </button>
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`pb-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative border-b-2 ${activeTab === 'orders' ? 'text-black border-orange-500 font-black' : 'text-neutral-300 border-transparent hover:text-black'}`}
                        >
                            TRANSACTION ARCHIVE
                        </button>
                    </div>

                    <div className="p-4 overflow-x-auto">
                        {error ? (
                            <div className="p-20 text-center">
                                <p className="text-red-500 font-black text-xs uppercase tracking-widest">{error}</p>
                                <button onClick={fetchData} className="mt-8 px-10 py-5 bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-widest">Retry Connection</button>
                            </div>
                        ) : loading && users.length === 0 ? (
                            <div className="p-20 text-center text-neutral-300 font-black text-[10px] uppercase tracking-[0.4em] animate-pulse">Syncing local nodes...</div>
                        ) : (
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-black/5">
                                        {activeTab === 'users' ? (
                                            <>
                                                <th className="px-8 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Identity Node</th>
                                                <th className="px-8 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Protocol Email</th>
                                                <th className="px-8 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Authority Role</th>
                                                <th className="px-8 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Created Time</th>
                                            </>
                                        ) : (
                                            <>
                                                <th className="px-8 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Batch Hash</th>
                                                <th className="px-8 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Subject Account</th>
                                                <th className="px-8 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Access OTP</th>
                                                <th className="px-8 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Asset Value</th>
                                                <th className="px-8 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Status Code</th>
                                            </>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-black/5">
                                    {activeTab === 'users' ? 
                                        users.map((user) => (
                                            <tr key={user.id} className="hover:bg-neutral-50/50 transition-all font-sans">
                                                <td className="px-8 py-6">
                                                    <div className="font-black text-sm text-black uppercase tracking-tight">{user.name || 'GUEST'}</div>
                                                    <div className="text-[9px] font-mono text-neutral-300 mt-1 uppercase">{user.id.slice(0, 16)}...</div>
                                                </td>
                                                <td className="px-8 py-6 font-black text-[11px] text-neutral-500 uppercase tracking-tight">{user.email}</td>
                                                <td className="px-8 py-6">
                                                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${user.role === 'vendor' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-neutral-50 text-neutral-400 border-black/5'}`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-tight">{new Date(user.created_at).toLocaleString()}</td>
                                            </tr>
                                        )) :
                                        orders.map((order) => (
                                            <tr key={order.id} className="hover:bg-neutral-50/50 transition-all font-sans">
                                                <td className="px-8 py-6 font-mono text-[10px] text-neutral-300 uppercase">{order.id.slice(0, 8)}...</td>
                                                <td className="px-8 py-6">
                                                    <div className="font-black text-[11px] text-black uppercase tracking-tight">{order.userEmail}</div>
                                                    <div className="text-[9px] font-mono text-neutral-300 mt-1 uppercase">{order.userId.slice(0, 8)}...</div>
                                                </td>
                                                <td className="px-8 py-6 font-black text-xl text-orange-500 tracking-[0.2em]">{order.otp}</td>
                                                <td className="px-8 py-6 font-black text-sm text-black uppercase tracking-tight">₹{order.totalAmount}</td>
                                                <td className="px-8 py-6">
                                                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${order.status === 'collected' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-orange-50 text-orange-600 border-orange-100'}`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
