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
    <div className="min-h-screen bg-white text-black transition-colors duration-500 pb-20 font-sans">
      
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 glass-morphism border-b border-black/5 py-4">
        <div className="container max-w-5xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center font-black text-white shadow-xl rotate-3">J</div>
            <div className="hidden sm:block text-black">
              <h1 className="font-black text-lg tracking-tighter leading-none uppercase">JPRINT<span className="text-orange-500">.</span></h1>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Sector 128 Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <button className="p-2 rounded-xl hover:bg-black/5 transition-colors relative text-neutral-600">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full" />
             </button>
             <Link to={user?.role === 'vendor' ? "/vendor" : (user ? "/profile" : "/login")}>
                <motion.div whileTap={{ scale: 0.9 }} className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl bg-black/5 hover:bg-black/10 transition-all border border-black/5">
                  <div className="w-8 h-8 rounded-lg overflow-hidden bg-gradient-to-tr from-orange-400 to-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-inner">
                    {user?.name?.[0].toUpperCase() || <User size={16} />}
                  </div>
                  <span className="text-[10px] font-black tracking-[0.1em] hidden sm:block uppercase text-black">{user?.name || "Guest User"}</span>
                </motion.div>
             </Link>
          </div>
        </div>
      </nav>

      <main className="container max-w-5xl mx-auto px-6 pt-32 space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        {/* Welcome Section */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-4 uppercase text-black">
              WHATS ON <br />THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600">AGENDA?</span>
            </h2>
            <p className="text-neutral-500 font-bold max-w-md text-sm uppercase tracking-tight opacity-70">Your production suite is localized for Sector 128 campus.</p>
          </div>
          
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-black transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="GLOBAL SEARCH..." 
              className="w-full pl-12 pr-4 py-5 bg-neutral-100 border-none rounded-3xl focus:ring-4 focus:ring-orange-500/10 transition-all font-black text-[10px] tracking-[0.2em] uppercase"
            />
          </div>
        </section>

        {/* Action Grid (Bento) */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Link to="/order" className="md:col-span-2 group relative overflow-hidden bg-black rounded-[48px] p-12 flex flex-col justify-between h-[320px] shadow-2xl">
             <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full -mr-20 -mt-20 group-hover:bg-orange-500/20 transition-all duration-700" />
             <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform">
                  <Zap size={28} fill="currentColor" />
                </div>
                <h3 className="text-5xl font-black text-white tracking-tighter leading-none mb-4 uppercase">FLASH <br />PRINTING.</h3>
                <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 bg-orange-500/10 px-4 py-1.5 rounded-full">
                  Instant Verification
                </div>
             </div>
             <div className="relative z-10 flex items-center gap-3 text-white font-black text-xs uppercase tracking-widest group-hover:gap-5 transition-all">
                Access System <ArrowRight size={18} />
             </div>
          </Link>

          <div className="md:col-span-1 space-y-6">
             <Link to="/order" className="block group stunning-card bg-white rounded-[32px] p-8 h-[148px] flex flex-col justify-between hover:border-orange-500/30">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-100 text-black flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all shadow-xl shadow-black/5 group-hover:shadow-orange-500/20">
                    <ImageIcon size={24} />
                  </div>
                  <ArrowRight size={16} className="text-orange-500 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                </div>
                <div className="font-black text-[10px] tracking-[0.2em] uppercase text-black">COLOR PRINTS</div>
             </Link>
             <Link to="/profile" className="block group stunning-card bg-white rounded-[32px] p-8 h-[148px] flex flex-col justify-between hover:border-black/20">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-100 text-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all shadow-xl shadow-black/5">
                    <TrendingUp size={24} />
                  </div>
                  <ArrowRight size={16} className="text-black opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                </div>
                <div className="font-black text-[10px] tracking-[0.2em] uppercase text-black">ACTIVITY HUB</div>
             </Link>
          </div>

          <Link to="/order" className="md:col-span-1 group relative overflow-hidden bg-white rounded-[48px] p-10 flex flex-col justify-between shadow-premium border border-black/5">
             <div className="absolute bottom-0 right-0 w-40 h-40 bg-orange-500/5 blur-3xl -mb-10 -mr-10" />
             <div className="relative z-10">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 mb-6 bg-orange-500/5 inline-block px-3 py-1 rounded-full">New Batch</div>
                <h3 className="text-3xl font-black tracking-tighter leading-[0.9] mb-4 text-black uppercase">BATCH <br />QUEUE.</h3>
             </div>
             <div className="w-14 h-14 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all relative z-10 shadow-lg shadow-black/5">
                <FileText size={24} />
             </div>
          </Link>
        </section>


        {/* Categories Bar */}
        <section className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide py-2 px-1 mask-edge">
          <Link to="/order"><CategoryPill icon={<Zap size={18} />} label="All Modules" active /></Link>
          <button onClick={() => scrollToSection('stationery-store')}><CategoryPill icon={<PenTool size={18} />} label="Materials" /></button>
          <Link to="/order"><CategoryPill icon={<FileText size={18} />} label="Lab Manuals" /></Link>
          <Link to="/order"><CategoryPill icon={<ImageIcon size={18} />} label="Hardcovers" /></Link>
          <Link to="/order"><CategoryPill icon={<Settings size={18} />} label="Custom Spec" /></Link>
        </section>

        {/* Stationery Items */}
        <section id="stationery-store" className="py-8 bg-neutral-50/50 rounded-[64px] p-12 -mx-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h3 className="text-5xl font-black tracking-tighter flex items-center gap-4 text-black uppercase">
                STATIONERY <span className="text-orange-500">LAB.</span>
              </h3>
              <p className="text-neutral-400 font-bold text-[10px] uppercase tracking-[0.2em] mt-2">Inventory Sync: SECTOR 128 MAIN SHOP</p>
            </div>
            <button className="text-[10px] font-black uppercase tracking-widest text-neutral-400 border border-neutral-200 px-6 py-3 rounded-full hover:bg-black hover:text-white transition-all">Export Inventory List</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <ProductCard 
                title="Pentonic High-Performance Pen"
                desc="Precision engineered for long writing sessions."
                price="₹10"
                icon={<PenTool size={22} className="text-black" />}
                color="bg-neutral-100"
                onClick={() => handleAddToCart("Pentonic Ball Pen", 10)}
             />
             <ProductCard 
                title="Saddle Manual File (Official)"
                desc="Official specification for all JIIT lab manual submissions."
                price="₹25"
                icon={<FileText size={22} className="text-black" />}
                color="bg-neutral-100"
                onClick={() => handleAddToCart("Saddle Stick File", 25)}
             />
             <ProductCard 
                title="Doms Professional Pencil Set"
                desc="Professional grade graphite for engineering drawing."
                price="₹60"
                icon={<PenTool size={22} className="text-black" />}
                color="bg-neutral-100"
                onClick={() => handleAddToCart("Doms 2B Pencil Set", 60)}
             />
             <ProductCard 
                title="A4 High-Gloss Sheets (Bulk)"
                desc="Premium gloss finish for presentations and projects."
                price="₹130"
                icon={<ImageIcon size={22} className="text-black" />}
                color="bg-neutral-100"
                onClick={() => handleAddToCart("Glazed Sheets Pack", 130)}
             />
          </div>
        </section>

        {/* Support Card */}
        <section className="bg-black rounded-[48px] p-16 text-center text-white relative overflow-hidden my-20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full -mr-40 -mt-40" />
          <div className="relative z-10 max-w-2xl mx-auto">
             <h4 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-none uppercase">DIRECT <br />OPERATOR ACCESS.</h4>
             <p className="text-white/40 font-bold mb-12 text-sm uppercase tracking-tight max-w-sm mx-auto">Connect directly with the Sector 128 shop operator for priority custom orders.</p>
             <a href="https://chat.whatsapp.com/KnC17YZEiB15oNV5S3bTO6" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-12 py-6 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest hover:scale-110 hover:rotate-2 transition-all shadow-3xl">
               Connect Securely <ArrowRight size={20} />
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
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-6"
          >
            <button onClick={() => navigate('/order')} className="w-full bg-black text-white p-6 py-8 rounded-[40px] font-black shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] flex items-center justify-between group overflow-hidden relative border border-white/5">
              <div className="flex items-center gap-6 relative z-10">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center font-black text-2xl shadow-inner">
                  {cartCount}
                </div>
                <div className="text-left leading-none uppercase tracking-tighter">
                  <div className="text-[10px] opacity-40 font-black tracking-[0.2em] mb-2">Inventory Blocked</div>
                  <div className="text-2xl font-black">FINALIZE ORDER</div>
                </div>
              </div>
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center group-hover:gap-2 transition-all text-white">
                <ArrowRight size={28} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mini Footer */}
      <footer className="py-24 text-center opacity-30 border-t border-black/5 mt-20">
        <p className="text-[10px] uppercase font-black tracking-[0.4em] mb-2 text-black">JPRINT PRODUCTION HUB v5.1</p>
        <p className="text-[10px] font-black uppercase text-orange-600 tracking-widest">JIIT NOIDA • EXCLUSIVE ACCESS ONLY</p>
      </footer>

    </div>
  );
}

function CategoryPill({ icon, label, active }) {
  return (
    <button className={`flex items-center gap-3 px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all ${active ? 'bg-orange-500 text-white shadow-2xl shadow-orange-500/20' : 'bg-neutral-100 text-neutral-400 hover:bg-neutral-200 hover:text-black'}`}>
      {icon} {label}
    </button>
  )
}

function ProductCard({ title, desc, price, icon, color, onClick }) {
  return (
    <div onClick={onClick} className="group stunning-card bg-white p-8 rounded-[40px] flex items-center gap-8 cursor-pointer border border-black/5 hover:border-black/10 transition-all">
      <div className={`w-20 h-20 rounded-3xl ${color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="font-black text-xl tracking-tighter leading-none mb-2 text-black">{title}</h4>
        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-tight line-clamp-1">{desc}</p>
        <div className="mt-3 text-sm font-black text-orange-600 bg-orange-500/5 inline-block px-3 py-1 rounded-full">{price}</div>
      </div>
      <button className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white group-hover:border-black transition-all">
        <span className="text-2xl font-bold">+</span>
      </button>
    </div>
  )
}

function Store({ size, className }) {
   return <LayoutGrid size={size} className={className} />
}

