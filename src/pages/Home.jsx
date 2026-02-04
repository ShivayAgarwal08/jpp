import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  User, 
  Zap, 
  FileText, 
  Image as ImageIcon, 
  PenTool, 
  BookOpen, 
  TrendingUp, 
  Sparkles, 
  ArrowRight,
  ShoppingCart,
  LayoutGrid,
  Bell,
  Heart,
  Settings
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useOrder } from '../context/OrderContext';
import FeedbackForm from '../components/FeedbackForm';

export default function Home() {
  const { user } = useAuth();
  const { addStationeryItem, currentOrder } = useOrder();
  const navigate = useNavigate();

  const handleAddToCart = (name, price) => {
    addStationeryItem({ name, price });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const cartCount = currentOrder.files.length;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500 pb-20">
      
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 glass-morphism border-b border-black/5 dark:border-white/5 py-4">
        <div className="container max-w-5xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black dark:bg-white rounded-xl flex items-center justify-center font-black text-white dark:text-black shadow-xl rotate-3">J</div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-lg tracking-tighter leading-none">JPRINT<span className="text-orange-500">.</span></h1>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Sector 128</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <button className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full" />
             </button>
             <Link to={user?.role === 'vendor' ? "/vendor" : (user ? "/profile" : "/login")}>
                <motion.div whileTap={{ scale: 0.9 }} className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all border border-black/5 dark:border-white/5">
                  <div className="w-8 h-8 rounded-lg overflow-hidden bg-gradient-to-tr from-orange-400 to-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-inner">
                    {user?.name?.[0].toUpperCase() || <User size={16} />}
                  </div>
                  <span className="text-xs font-bold tracking-tight hidden sm:block">{user?.name || "Guest Account"}</span>
                </motion.div>
             </Link>
          </div>
        </div>
      </nav>

      <main className="container max-w-5xl mx-auto px-6 pt-24 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        {/* Welcome Section */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-4">
              WHATS ON <br />THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">AGENDA?</span>
            </h2>
            <p className="text-neutral-500 font-medium max-w-md">Your production-grade campus printing service is ready for your next project.</p>
          </div>
          
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search documents..." 
              className="w-full pl-12 pr-4 py-4 bg-neutral-100 dark:bg-neutral-900 border-none rounded-2xl focus:ring-4 focus:ring-orange-500/10 transition-all font-bold text-sm"
            />
          </div>
        </section>

        {/* Action Grid (Bento) */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Link to="/order" className="md:col-span-2 group relative overflow-hidden bg-black rounded-[40px] p-10 flex flex-col justify-between h-[300px] shadow-2xl shadow-black/20">
             <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 blur-[80px] rounded-full -mr-20 -mt-20 group-hover:bg-orange-500/30 transition-all duration-700" />
             <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  <Zap size={24} fill="currentColor" />
                </div>
                <h3 className="text-4xl font-black text-white tracking-tighter leading-none mb-2">FLASH <br />PRINTING.</h3>
                <p className="text-white/40 font-bold text-xs uppercase tracking-widest">Starts at ₹2.00 / page</p>
             </div>
             <div className="relative z-10 flex items-center gap-2 text-white font-bold text-sm">
                Get Started <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
             </div>
          </Link>

          <div className="md:col-span-1 space-y-6">
             <Link to="/order" className="block group stunning-card bg-blue-50 dark:bg-blue-500/5 rounded-[32px] p-8 h-[138px] flex flex-col justify-between border-blue-500/10">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <ImageIcon size={20} />
                  </div>
                  <ArrowRight size={16} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                </div>
                <div className="font-black text-sm tracking-tight">COLOR PRINTS</div>
             </Link>
             <Link to="/profile" className="block group stunning-card bg-purple-50 dark:bg-purple-500/5 rounded-[32px] p-8 h-[138px] flex flex-col justify-between border-purple-500/10">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-xl bg-purple-500 text-white flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <TrendingUp size={20} />
                  </div>
                  <ArrowRight size={16} className="text-purple-500 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                </div>
                <div className="font-black text-sm tracking-tight text-neutral-800 dark:text-neutral-200">ACTIVITY HUB</div>
             </Link>
          </div>

          <Link to="/order" className="md:col-span-1 group relative overflow-hidden bg-neutral-100 dark:bg-neutral-900 rounded-[40px] p-10 flex flex-col justify-between shadow-xl">
             <div className="absolute bottom-0 right-0 w-40 h-40 bg-green-500/10 blur-3xl -mb-10 -mr-10 transition-all duration-700" />
             <div className="relative z-10">
                <div className="text-[10px] font-black uppercase tracking-widest text-green-600 mb-4">Express Feature</div>
                <h3 className="text-2xl font-black tracking-tighter leading-tight mb-4">BATCH <br />UPLOAD.</h3>
             </div>
             <div className="w-12 h-12 rounded-full border border-black/5 dark:border-white/5 flex items-center justify-center group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-all relative z-10">
                <FileText size={20} />
             </div>
          </Link>
        </section>


        {/* Categories Bar */}
        <section className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide py-2 px-1">
          <Link to="/order"><CategoryPill icon={<Zap size={18} />} label="All Services" active /></Link>
          <button onClick={() => scrollToSection('stationery-store')}><CategoryPill icon={<PenTool size={18} />} label="Stationery" /></button>
          <Link to="/order"><CategoryPill icon={<FileText size={18} />} label="Lab Reports" /></Link>
          <Link to="/order"><CategoryPill icon={<ImageIcon size={18} />} label="Posters" /></Link>
          <Link to="/order"><CategoryPill icon={<Settings size={18} />} label="Custom" /></Link>
        </section>

        {/* Stationery Items */}
        <section id="stationery-store" className="py-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-black tracking-tighter flex items-center gap-3">
              <Store className="text-orange-500" /> STATIONERY HUB
            </h3>
            <button className="text-xs font-black uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity">View All</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <ProductCard 
                title="Pentonic Ball Pen"
                desc="Smooth Flow • Blue/Black ink available."
                price="₹10"
                icon={<PenTool size={22} className="text-blue-500" />}
                color="bg-blue-500/10"
                onClick={() => handleAddToCart("Pentonic Ball Pen", 10)}
             />
             <ProductCard 
                title="Saddle Stick File"
                desc="A4 Size • Perfect for Lab Manuals."
                price="₹20"
                icon={<FileText size={22} className="text-green-500" />}
                color="bg-green-500/10"
                onClick={() => handleAddToCart("Saddle Stick File", 20)}
             />
             <ProductCard 
                title="Doms 2B Pencil Set"
                desc="Precision drawing • Extra dark leads."
                price="₹50"
                icon={<PenTool size={22} className="text-amber-500" />}
                color="bg-amber-500/10"
                onClick={() => handleAddToCart("Doms 2B Pencil Set", 50)}
             />
             <ProductCard 
                title="Glazed Sheets (1 pkt)"
                desc="High gloss finish • 50 sheets pack."
                price="₹120"
                icon={<ImageIcon size={22} className="text-pink-500" />}
                color="bg-pink-500/10"
                onClick={() => handleAddToCart("Glazed Sheets Pack", 120)}
             />
          </div>
        </section>

        {/* Social / Support Card */}
        <section className="bg-neutral-950 rounded-[40px] p-12 text-center text-white relative overflow-hidden my-10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/20 blur-[120px] rounded-full -mr-40 -mt-40" />
          <div className="relative z-10">
             <h4 className="text-4xl font-black tracking-tighter mb-4 leading-none">NEED DIRECT HELP?</h4>
             <p className="text-white/40 font-medium mb-10 max-w-sm mx-auto">Connect with the Sector 128 shop owner directly on WhatsApp for custom orders.</p>
             <a href="https://chat.whatsapp.com/KnC17YZEiB15oNV5S3bTO6" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-black text-sm hover:scale-105 transition-all active:scale-95 shadow-2xl shadow-white/10">
               Connect on WhatsApp <ArrowRight size={18} />
             </a>
          </div>
        </section>

        <FeedbackForm />

      </main>

      {/* Floating Cart (Enhanced) */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-6"
          >
            <button onClick={() => navigate('/order')} className="w-full bg-black text-white p-6 rounded-[32px] font-black shadow-3xl shadow-black/40 flex items-center justify-between group overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-10 transition-opacity" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center font-black">
                  {cartCount}
                </div>
                <div className="text-left leading-none uppercase tracking-tighter">
                  <div className="text-xs opacity-50">ITEMS IN CART</div>
                  <div className="text-lg">PROCEED TO ORDER</div>
                </div>
              </div>
              <ArrowRight className="group-hover:translate-x-2 transition-transform relative z-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mini Footer */}
      <footer className="py-12 text-center opacity-40">
        <p className="text-[10px] uppercase font-black tracking-widest mb-1">JPRINT Platform v5.1</p>
        <p className="text-xs font-bold">JIIT SECTOR 128 EXCLUSIVE</p>
      </footer>

    </div>
  );
}

function CategoryPill({ icon, label, active }) {
  return (
    <button className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all ${active ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/20' : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-800'}`}>
      {icon} {label}
    </button>
  )
}

function ProductCard({ title, desc, price, icon, color, onClick }) {
  return (
    <div onClick={onClick} className="group stunning-card bg-neutral-100 dark:bg-neutral-900 p-6 rounded-[32px] flex items-center gap-6 cursor-pointer">
      <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="font-black text-lg tracking-tight leading-none mb-1">{title}</h4>
        <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 line-clamp-1">{desc}</p>
        <div className="mt-2 text-sm font-black text-orange-500">{price}</div>
      </div>
      <button className="w-10 h-10 rounded-full border border-black/5 dark:border-white/5 flex items-center justify-center group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-all">
        <span className="text-xl font-bold">+</span>
      </button>
    </div>
  )
}

function Store({ size, className }) {
   return <LayoutGrid size={size} className={className} />
}

