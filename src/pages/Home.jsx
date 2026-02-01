import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
    Search, 
    User, 
    Zap, 
    FileText, 
    Image as ImageIcon, 
    PenTool, 
    Sparkles, 
    ArrowRight, 
    Home as HomeIcon, 
    Clock, 
    LayoutDashboard,
    Bell,
    Settings,
    LogOut,
    CheckCircle2,
    Loader2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useOrder } from '../context/OrderContext';
import { motion, AnimatePresence } from 'framer-motion';
import FeedbackForm from '../components/FeedbackForm';

export default function Home() {
    const { user, logout } = useAuth();
    const { orders, currentOrder, addStationeryItem } = useOrder();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const activeOrders = orders.filter(o => o.status !== 'collected');
    const cartCount = currentOrder.files.length;

    const handleAddToCart = (name, price) => {
        addStationeryItem({ name, price });
    };

    return (
        <div className="min-h-screen bg-[#FBFBFD] text-gray-900 font-sans selection:bg-black selection:text-white">
            
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col w-64 fixed inset-y-0 bg-white border-r border-gray-100 z-50">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center font-bold text-2xl">J.</div>
                        <span className="font-bold text-xl tracking-tight">JPRINT</span>
                    </div>
                    
                    <nav className="space-y-1">
                        <NavItem icon={<HomeIcon size={20} />} label="Home" active />
                        <NavItem icon={<Clock size={20} />} label="Orders" onClick={() => navigate('/orders')} />
                        <NavItem icon={<User size={20} />} label="Profile" onClick={() => navigate('/profile')} />
                        {user?.role === 'vendor' && (
                            <NavItem icon={<LayoutDashboard size={20} />} label="Vendor Panel" onClick={() => navigate('/vendor')} />
                        )}
                    </nav>
                </div>
                
                <div className="mt-auto p-6 space-y-4">
                    <div className="bg-gray-50 rounded-2xl p-4">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Need Help?</p>
                        <a href="https://chat.whatsapp.com/KnC17YZEiB15oNV5S3bTO6" target="_blank" className="text-sm font-bold text-black flex items-center gap-2 hover:underline">
                            Contact Support <ArrowRight size={14} />
                        </a>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="lg:pl-64 min-h-screen">
                
                {/* Top Navbar */}
                <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100/50">
                    <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-bold tracking-tight lg:hidden flex items-center gap-2">
                                <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center font-bold text-lg">J.</div>
                                JPRINT
                            </h1>
                            <div className="hidden lg:block">
                                <h1 className="text-xl font-bold">Good Day, {user?.name?.split(' ')[0] || 'Student'}</h1>
                                <p className="text-xs text-gray-400 font-medium tracking-wide font-display">QUICK ACCESS • JIIT SECTOR 128</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-black transition-colors relative">
                                <Bell size={20} />
                                {activeOrders.length > 0 && <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>}
                            </button>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-100 to-gray-200 border border-gray-100 flex items-center justify-center font-bold text-sm cursor-pointer hover:shadow-md transition-shadow overflow-hidden" onClick={() => navigate('/profile')}>
                                {user?.name ? user.name[0].toUpperCase() : <User size={20} />}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="max-w-5xl mx-auto px-6 py-8 pb-32">
                    
                    {/* Active Orders Banner */}
                    <AnimatePresence>
                        {activeOrders.length > 0 && (
                            <motion.div 
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-8"
                            >
                                <div className="bg-black rounded-3xl p-6 text-white relative overflow-hidden group">
                                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div>
                                            <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-1">
                                                <Zap size={14} className="fill-current" /> Live Order status
                                            </div>
                                            <h2 className="text-2xl font-bold mb-1">You have {activeOrders.length} active order{activeOrders.length > 1 ? 's' : ''}</h2>
                                            <p className="text-white/60 text-sm font-medium">Collect from your campus shop once ready.</p>
                                        </div>
                                        <button 
                                            onClick={() => navigate('/orders')}
                                            className="bg-white text-black px-6 py-3 rounded-2xl font-bold text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                                        >
                                            View Progress <ArrowRight size={16} />
                                        </button>
                                    </div>
                                    <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Quick Access Grid */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <QuickCard 
                            to="/order"
                            title="Print Docs"
                            desc="PDFs, Notes, Assignments"
                            icon={<FileText size={24} />}
                            color="bg-blue-500"
                            className="md:col-span-2"
                        />
                        <QuickCard 
                            to="/order"
                            title="Posters"
                            desc="High quality color"
                            icon={<ImageIcon size={24} />}
                            color="bg-purple-500"
                        />
                         <QuickCard 
                            to="/order"
                            title="Stationery"
                            desc="Pens, Scales, Files"
                            icon={<PenTool size={24} />}
                            color="bg-orange-500"
                        />
                         <QuickCard 
                            to="/orders"
                            title="Order History"
                            desc="View previous prints"
                            icon={<Clock size={24} />}
                            color="bg-gray-800"
                            className="md:col-span-2"
                        />
                    </div>

                    {/* Stationery Store Section */}
                    <section className="mb-12">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <PenTool size={20} className="text-orange-500" /> Essential Stationery
                            </h3>
                            <button className="text-sm font-bold text-gray-400 hover:text-black transition-colors">View All</button>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <StationeryItem 
                                name="Pentonic Ball Pen" 
                                price={10} 
                                desc="Smooth Flow • Blue/Black"
                                onAdd={() => handleAddToCart("Pentonic Ball Pen", 10)}
                            />
                            <StationeryItem 
                                name="Saddle Stick File" 
                                price={20} 
                                desc="A4 Size • Transparent"
                                onAdd={() => handleAddToCart("Saddle Stick File", 20)}
                            />
                            <StationeryItem 
                                name="Apsara Platinum" 
                                price={5} 
                                desc="Extra Dark Pencil"
                                onAdd={() => handleAddToCart("Apsara Platinum", 5)}
                            />
                        </div>
                    </section>

                    <FeedbackForm />
                </div>
            </main>

            {/* Mobile Bottom Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-gray-100 px-6 py-4 flex justify-between items-center z-[60]">
                <MobileNavItem icon={<HomeIcon size={24} />} label="Home" active />
                <MobileNavItem icon={<Clock size={24} />} label="Orders" onClick={() => navigate('/orders')} />
                <div className="relative -top-8">
                    <button 
                        onClick={() => navigate('/order')}
                        className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center shadow-2xl shadow-black/40 active:scale-90 transition-transform"
                    >
                        <Zap size={28} className="fill-current" />
                    </button>
                </div>
                <MobileNavItem icon={<LayoutDashboard size={24} />} label="Stats" onClick={() => navigate('/database')} />
                <MobileNavItem icon={<User size={24} />} label="Me" onClick={() => navigate('/profile')} />
            </div>

            {/* Floating Cart (Mobile only overlay) */}
            <AnimatePresence>
                {cartCount > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-28 left-6 right-6 lg:left-auto lg:right-12 lg:bottom-12 z-[70]"
                    >
                        <button 
                            onClick={() => navigate('/order')}
                            className="w-full lg:w-auto bg-primary text-white px-8 py-5 rounded-[2rem] font-bold shadow-2xl shadow-primary/20 flex items-center justify-between lg:gap-8 group hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center text-sm">{cartCount}</div>
                                <span>Items in Cart</span>
                            </div>
                            <span className="flex items-center gap-2">View Cart <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function NavItem({ icon, label, active, onClick }) {
    return (
        <button 
            onClick={onClick}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${active ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-50 hover:text-black'}`}
        >
            {icon}
            {label}
        </button>
    );
}

function MobileNavItem({ icon, label, active, onClick }) {
    return (
        <button onClick={onClick} className={`flex flex-col items-center gap-1 ${active ? 'text-black' : 'text-gray-300'}`}>
            {icon}
            <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
        </button>
    );
}

function QuickCard({ title, desc, icon, color, to, className = "" }) {
    const navigate = useNavigate();
    return (
        <div 
            onClick={() => navigate(to)}
            className={`cursor-pointer rounded-[2.5rem] p-8 relative overflow-hidden group border border-gray-100 bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ${className}`}
        >
            <div className={`w-14 h-14 ${color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-current/20 group-hover:scale-110 transition-transform duration-500`}>
                {icon}
            </div>
            <h3 className="text-2xl font-bold mb-2 tracking-tight">{title}</h3>
            <p className="text-gray-400 text-sm font-medium leading-relaxed">{desc}</p>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
        </div>
    );
}

function StationeryItem({ name, price, desc, onAdd }) {
    return (
        <div className="bg-white border border-gray-100 rounded-3xl p-6 flex items-center justify-between group hover:border-black/10 hover:shadow-xl transition-all">
            <div>
                <h4 className="font-bold text-gray-900 mb-0.5">{name}</h4>
                <p className="text-xs text-gray-400 font-medium">{desc}</p>
                <p className="text-sm font-black mt-2">₹{price}</p>
            </div>
            <button 
                onClick={onAdd}
                className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 hover:bg-black hover:text-white hover:shadow-lg transition-all active:scale-90"
            >
                <span className="text-2xl leading-none mb-1">+</span>
            </button>
        </div>
    );
}
