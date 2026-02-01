import { useAuth } from '../context/AuthContext';
import { useOrder } from '../context/OrderContext';
import { Link, useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, 
    User, 
    Wallet, 
    History, 
    ChevronRight, 
    LogOut, 
    FileText, 
    CheckCircle, 
    Clock, 
    Printer, 
    Shield, 
    CreditCard, 
    Bell,
    Settings,
    HelpCircle,
    ShoppingBag,
    Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

export default function Profile() {
    const { user, logout } = useAuth();
    const { orders } = useOrder();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const myOrders = orders.filter(o => o.userId === user?.id);
    const activeOrders = myOrders.filter(o => o.status !== 'collected');

    return (
        <div className="min-h-screen bg-[#FBFBFD] text-gray-900 font-sans selection:bg-black selection:text-white">
            
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-xl sticky top-0 z-40 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/home')} className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="font-bold text-lg">My Account</h1>
                </div>
                <div className="flex items-center gap-3">
                    <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                        <Bell size={20} />
                    </button>
                </div>
            </header>

            <div className="max-w-4xl mx-auto p-6 md:p-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    
                    {/* Left Column: Profile Card */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 text-center">
                            <div className="relative inline-block mb-6">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-gray-900 to-gray-600 text-white flex items-center justify-center text-4xl font-black shadow-2xl ring-4 ring-white">
                                    {user?.name?.[0].toUpperCase() || 'U'}
                                </div>
                                <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 border-4 border-white rounded-full" />
                            </div>
                            <h2 className="text-2xl font-bold mb-1">{user?.name || 'Student'}</h2>
                            <p className="text-gray-400 text-sm font-medium mb-6">{user?.email}</p>
                            
                            <div className="flex gap-2 justify-center mb-8">
                                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Jaypee 128</span>
                                <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Verified</span>
                            </div>

                            <button 
                                onClick={handleLogout}
                                className="w-full bg-gray-50 text-red-500 py-4 rounded-2xl font-bold text-sm hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                            >
                                <LogOut size={18} /> Sign Out
                            </button>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-6 rounded-3xl border border-gray-100 text-center">
                                <p className="text-2xl font-black">{myOrders.length}</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Total Orders</p>
                            </div>
                            <div className="bg-white p-6 rounded-3xl border border-gray-100 text-center text-primary">
                                <p className="text-2xl font-black">{activeOrders.length}</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Active Prints</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Order History & Settings */}
                    <div className="lg:col-span-2 space-y-10">
                        
                        {/* Section: Active Prints */}
                        {activeOrders.length > 0 && (
                            <section>
                                <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                                    <Zap size={20} className="text-primary fill-current" /> Pickup Queue
                                </h3>
                                <div className="space-y-4">
                                    {activeOrders.map(order => (
                                        <ProfileOrderCard key={order.id} order={order} active />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Section: Recent Orders */}
                        <section>
                            <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                                <Clock size={20} /> Order History
                            </h3>
                            <div className="space-y-4">
                                {myOrders.filter(o => o.status === 'collected').length === 0 && activeOrders.length === 0 ? (
                                    <div className="py-20 bg-white rounded-[2.5rem] border border-dashed border-gray-200 text-center">
                                        <ShoppingBag size={48} className="mx-auto text-gray-200 mb-4" />
                                        <p className="text-gray-400 font-bold">No orders found yet</p>
                                        <Link to="/order" className="text-black font-bold text-sm hover:underline mt-2 inline-block">Start your first print</Link>
                                    </div>
                                ) : (
                                    myOrders.filter(o => o.status === 'collected').slice(0, 5).map(order => (
                                        <ProfileOrderCard key={order.id} order={order} />
                                    ))
                                )}
                            </div>
                        </section>

                        {/* Section: Support & Help */}
                        <section>
                            <h3 className="text-lg font-black mb-4">Account Settings</h3>
                            <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden divide-y divide-gray-50">
                                <ProfileMenuItem icon={<Settings size={20} />} label="Security & Privacy" />
                                <ProfileMenuItem icon={<Wallet size={20} />} label="Payment Methods" />
                                <ProfileMenuItem icon={<HelpCircle size={20} />} label="Contact Support" />
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
}

function ProfileOrderCard({ order, active }) {
    return (
        <div className={clsx(
            "p-6 rounded-3xl border transition-all flex items-center justify-between group",
            active ? "bg-black text-white border-black shadow-xl shadow-black/10" : "bg-white border-gray-100"
        )}>
            <div className="flex items-center gap-6">
                <div className={clsx(
                    "w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-black",
                    active ? "bg-white/10 text-white" : "bg-gray-50 text-gray-400"
                )}>
                    {order.otp}
                </div>
                <div>
                    <h4 className="font-bold text-sm">₹{order.totalAmount} • {order.files?.length} Items</h4>
                    <p className={clsx("text-[10px] font-bold uppercase tracking-widest mt-0.5", active ? "text-white/40" : "text-gray-400")}>
                        {new Date(order.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                 <span className={clsx(
                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                    active ? (order.status === 'printed' ? "bg-orange-500 text-white" : "bg-blue-500 text-white") : "bg-gray-100 text-gray-400"
                )}>
                    {active ? (order.status === 'printed' ? 'READY' : 'PRINTING') : 'COLLECTED'}
                </span>
                <ChevronRight size={16} className={active ? "text-white/20" : "text-gray-200"} />
            </div>
        </div>
    );
}

function ProfileMenuItem({ icon, label }) {
    return (
        <button className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors group">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                    {icon}
                </div>
                <span className="font-bold text-sm group-hover:text-black transition-colors">{label}</span>
            </div>
            <ChevronRight size={18} className="text-gray-300 group-hover:text-black transition-colors" />
        </button>
    );
}
