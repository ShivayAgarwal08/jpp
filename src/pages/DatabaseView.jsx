import { useState, useEffect } from 'react';
import { Search, RefreshCw, Database, Table, User, FileText, ChevronRight, Activity, ShieldCheck, ArrowLeft, Users, Package } from 'lucide-react';
import { getApiUrl } from '../config';
import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';

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
        <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-amber-100">
            
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white border-b border-neutral-200 py-4 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-neutral-100 transition-colors text-neutral-500">
                        <ArrowLeft size={24} />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-neutral-900 rounded-lg flex items-center justify-center text-white">
                            <Database size={18} />
                        </div>
                        <h1 className="font-bold text-lg tracking-tight">System Database</h1>
                    </div>
                    <button 
                        onClick={fetchData}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-neutral-800 transition-all disabled:opacity-50"
                    >
                        <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                        Sync Data
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-6 lg:p-10 space-y-10">
                
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatBox icon={<Users size={20} />} label="Total Users" value={users.length} color="text-blue-600" bg="bg-blue-50" />
                    <StatBox icon={<Package size={20} />} label="Total Orders" value={orders.length} color="text-amber-600" bg="bg-amber-50" />
                    <StatBox icon={<ShieldCheck size={20} />} label="System Health" value="Healthy" color="text-green-600" bg="bg-green-50" />
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden min-h-[600px]">
                    <div className="px-8 border-b border-neutral-100 flex items-center gap-8">
                        <TabButton 
                            active={activeTab === 'users'} 
                            onClick={() => setActiveTab('users')}
                            label="User Directory"
                        />
                        <TabButton 
                            active={activeTab === 'orders'} 
                            onClick={() => setActiveTab('orders')}
                            label="Order Ledger"
                        />
                    </div>

                    <div className="overflow-x-auto">
                        {error ? (
                            <div className="p-20 text-center">
                                <p className="text-red-500 font-bold text-sm">{error}</p>
                                <button onClick={fetchData} className="mt-4 px-6 py-2 bg-neutral-900 text-white rounded-lg font-bold text-xs">Retry</button>
                            </div>
                        ) : loading && users.length === 0 ? (
                            <div className="p-20 text-center text-neutral-400 font-medium text-sm animate-pulse">Syncing data from server...</div>
                        ) : (
                            <table className="w-full text-left">
                                <thead className="bg-neutral-50/50">
                                    <tr className="border-b border-neutral-100">
                                        {activeTab === 'users' ? (
                                            <>
                                                <th className="px-8 py-5 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">User Name</th>
                                                <th className="px-8 py-5 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Email Address</th>
                                                <th className="px-8 py-5 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Access Role</th>
                                                <th className="px-8 py-5 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Created At</th>
                                            </>
                                        ) : (
                                            <>
                                                <th className="px-8 py-5 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Order ID</th>
                                                <th className="px-8 py-5 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Customer</th>
                                                <th className="px-8 py-5 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Pickup OTP</th>
                                                <th className="px-8 py-5 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Amount</th>
                                                <th className="px-8 py-5 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Current Status</th>
                                            </>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-100">
                                    {activeTab === 'users' ? 
                                        users.map((user) => (
                                            <tr key={user.id} className="hover:bg-neutral-50/50 transition-colors">
                                                <td className="px-8 py-5">
                                                    <div className="font-bold text-sm text-neutral-900">{user.name || 'Anonymous'}</div>
                                                    <div className="text-[10px] text-neutral-400 font-mono mt-0.5">{user.id.slice(0, 8)}...</div>
                                                </td>
                                                <td className="px-8 py-5 text-sm font-medium text-neutral-600 italic">{user.email}</td>
                                                <td className="px-8 py-5">
                                                    <span className={clsx(
                                                        "px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider",
                                                        user.role === 'vendor' ? "bg-amber-50 text-amber-700 border border-amber-100" : "bg-neutral-100 text-neutral-500"
                                                    )}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-5 text-xs text-neutral-400 font-medium">
                                                    {new Date(user.created_at).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        )) :
                                        orders.map((order) => (
                                            <tr key={order.id} className="hover:bg-neutral-50/50 transition-colors">
                                                <td className="px-8 py-5 font-mono text-[10px] text-neutral-400">{order.id.slice(0, 8)}...</td>
                                                <td className="px-8 py-5">
                                                    <div className="font-bold text-sm text-neutral-900">{order.userEmail}</div>
                                                    <div className="text-[10px] text-neutral-400 font-mono mt-0.5">{order.userId.slice(0, 8)}...</div>
                                                </td>
                                                <td className="px-8 py-5 font-bold text-xl text-amber-600 italic tracking-widest">{order.otp}</td>
                                                <td className="px-8 py-5 font-bold text-sm text-neutral-900">₹{order.totalAmount}</td>
                                                <td className="px-8 py-5">
                                                    <span className={clsx(
                                                        "px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider",
                                                        order.status === 'collected' ? "bg-green-50 text-green-600 border border-green-100" : "bg-amber-50 text-amber-600 border border-amber-100"
                                                    )}>
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

function StatBox({ icon, label, value, color, bg }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex items-center gap-5">
            <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center transition-transform hover:scale-110", bg, color)}>
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">{label}</p>
                <p className="text-2xl font-bold text-neutral-900">{value}</p>
            </div>
        </div>
    );
}

function TabButton({ active, onClick, label }) {
    return (
        <button
            onClick={onClick}
            className={clsx(
                "py-6 text-[10px] font-bold uppercase tracking-widest border-b-2 transition-all relative",
                active ? "text-neutral-900 border-amber-600" : "text-neutral-400 border-transparent hover:text-neutral-600"
            )}
        >
            {label}
        </button>
    );
}
