import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
    ArrowRight, 
    Lock, 
    School, 
    ShieldCheck, 
    Clock,
    FileText,
    Zap,
    ChevronDown,
    Layers,
    Smartphone,
    CreditCard
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Landing() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [showSelection, setShowSelection] = useState(false);
    const [show62Popup, setShow62Popup] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        if (user) navigate('/home');
        return () => window.removeEventListener('scroll', handleScroll);
    }, [user, navigate]);

    const handle128Click = () => navigate('/login');
    const handle62Click = () => {
        setShow62Popup(true);
        setTimeout(() => setShow62Popup(false), 3000);
    };

    return (
        <div className="min-h-screen bg-[#FDFDFF] text-gray-950 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
            
            {/* Ambient Background Blobs */}
            <div className="fixed top-[-10%] left-[-5%] w-[60vw] h-[60vw] rounded-full bg-blue-400/10 blur-[130px] -z-10 animate-pulse-soft" />
            <div className="fixed bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-purple-400/10 blur-[130px] -z-10 animate-float" />
            <div className="fixed top-[20%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-orange-400/5 blur-[100px] -z-10" />

            {/* Premium Header */}
            <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className={`glass rounded-[2rem] px-8 h-16 flex items-center justify-between transition-all duration-500 ${scrolled ? 'shadow-2xl shadow-black/5 bg-white/70' : 'bg-white/40 border-transparent shadow-none'}`}>
                        <div className="flex items-center gap-3">
                            <img src="/assets/hero-logo.jpg" className="w-10 h-10 rounded-2xl shadow-xl shadow-black/20 hover:rotate-6 transition-transform cursor-pointer object-cover" alt="Logo" />
                            <span className="font-extrabold text-2xl tracking-tighter hidden sm:block">JPRINT<span className="text-blue-600">.</span></span>
                        </div>
                        
                        <div className="hidden lg:flex items-center gap-10 text-[13px] font-bold text-gray-500 uppercase tracking-widest">
                            <a href="#features" className="hover:text-black transition-colors">Experience</a>
                            <a href="#workflow" className="hover:text-black transition-colors">Workflow</a>
                            <a href="#campuses" className="hover:text-black transition-colors">Availability</a>
                        </div>

                        <div className="flex items-center gap-4">
                            <button onClick={() => navigate('/login')} className="text-sm font-bold text-gray-500 hover:text-black transition-colors px-4 py-2">Sign In</button>
                            <button 
                                onClick={() => setShowSelection(true)}
                                className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-bold hover:shadow-2xl hover:shadow-black/20 hover:scale-105 active:scale-95 transition-all"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Immersive Hero Section */}
            <section className="relative pt-48 pb-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-4xl mx-auto mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-600 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8 border border-blue-600/20">
                                <Zap size={14} className="fill-current" />
                                <span>Future of Campus Logistics</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-gray-950">
                                Print like it's <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500">instant magic.</span>
                            </h1>
                            <p className="text-xl text-gray-500 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
                                Experience the seamless intersection of technology and utility. JPRINT brings effortless document logistics to your fingertips.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-5 justify-center">
                                <button 
                                    onClick={() => setShowSelection(true)}
                                    className="h-16 px-10 bg-black text-white rounded-[1.25rem] font-black text-lg flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-black/30 hover:scale-[1.03] active:scale-95 transition-all group"
                                >
                                    Start Printing <ArrowRight size={22} className="group-hover:translate-x-1.5 transition-transform" />
                                </button>
                                <button 
                                    onClick={() => navigate('/vendor-login')}
                                    className="h-16 px-10 bg-white text-black border-2 border-gray-100 rounded-[1.25rem] font-black text-lg hover:border-black/10 hover:bg-gray-50 transition-all flex items-center justify-center"
                                >
                                    Vendor Access
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Interactive UI Mockup Overlay */}
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.4 }}
                        className="relative max-w-5xl mx-auto"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 h-full w-full" />
                        <div className="rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-8 border-white bg-gray-100/50 backdrop-blur-3xl relative">
                            {/* Visual Placeholder for high-end graphic */}
                            <div className="aspect-[16/9] w-full bg-gradient-to-br from-gray-900 to-black overflow-hidden">
                                <img src="/hero.png" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-1000" alt="JPrint Workspace" />
                            </div>
                        </div>

                        {/* Floating Micro-Cards */}
                        <motion.div 
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-10 -left-10 bg-white/90 backdrop-blur-xl p-6 rounded-[2rem] shadow-2xl border border-white flex items-center gap-4 z-20 group hover:scale-105 transition-transform"
                        >
                            <div className="w-12 h-12 bg-green-500/10 text-green-600 rounded-2xl flex items-center justify-center">
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest mb-0.5">Payment</p>
                                <p className="font-black text-sm">Verified Secure</p>
                            </div>
                        </motion.div>

                        <motion.div 
                            animate={{ y: [0, 15, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute top-1/2 -right-12 bg-black p-6 rounded-[2rem] shadow-2xl flex items-center gap-4 z-20 group hover:scale-105 transition-transform"
                        >
                            <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white">
                                <Clock size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] text-white/40 font-extrabold uppercase tracking-widest mb-0.5">Average wait</p>
                                <p className="font-black text-sm text-white">0 Seconds</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
                
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20 hidden lg:block">
                    <ChevronDown size={32} />
                </div>
            </section>

            {/* Features: The Aesthetic Shift */}
            <section id="features" className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl font-black tracking-tight mb-4">Engineered for Students.</h2>
                        <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-xs">A premium tool for serious productivity</p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard 
                            icon={<Smartphone />}
                            title="Mobile First"
                            desc="Order while walking to class. Your phone is your printing command center."
                            color="bg-blue-600"
                        />
                        <FeatureCard 
                            icon={<CreditCard />}
                            title="Seamless Checkout"
                            desc="One-tap payments. Zero friction between your doc and the printer."
                            color="bg-purple-600"
                        />
                        <FeatureCard 
                            icon={<Lock />}
                            title="Handshake Security"
                            desc="Your documents only print when you arrive. Secure OTP verification."
                            color="bg-orange-500"
                        />
                    </div>
                </div>
            </section>

            {/* Workflow Section */}
            <section id="workflow" className="py-32 bg-black text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] -z-0" />
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="max-w-4xl">
                        <h2 className="text-5xl md:text-7xl font-black mb-20 leading-tight">Fast enough to <br /><span className="text-gray-400">beat the bell.</span></h2>
                        
                        <div className="grid gap-16">
                            <WorkflowStep num="01" title="Upload & Tune" desc="Select your files. Fine-tune pages, color, and copies with precision." />
                            <WorkflowStep num="02" title="Lightning Payment" desc="Securely settle with any modern payment provider instantly." />
                            <WorkflowStep num="03" title="Flash & Collect" desc="Walk up to the vendor, show your OTP, and grab your fresh prints." />
                        </div>
                    </div>
                </div>
            </section>

            {/* Availability / Campuses */}
            <section id="campuses" className="py-32 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-5xl font-black tracking-tighter mb-16">Deploying at your campus.</h2>
                    
                    <div className="flex flex-wrap justify-center gap-8">
                        <CampusCard 
                            active 
                            name="Sector 128" 
                            full="JIIT Wish Town"
                            onClick={() => setShowSelection(true)}
                        />
                        <CampusCard 
                            name="Sector 62" 
                            full="JIIT Noida"
                            onClick={handle62Click}
                            locked
                        />
                    </div>
                </div>
            </section>

            {/* Minimal Footer */}
            <footer className="py-20 px-6 border-t border-gray-100">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
                    <div>
                        <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
                            <img src="/assets/hero-logo.jpg" className="w-10 h-10 rounded-2xl shadow-xl shadow-black/20 object-cover" alt="Logo" />
                            <span className="font-black text-2xl tracking-tighter">JPRINT.</span>
                        </div>
                        <p className="text-gray-400 font-bold text-sm max-w-xs uppercase tracking-widest">Premium Campus Logistics for Jaypee Institutes.</p>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-center gap-10 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                        <span className="text-gray-200 hidden md:block">|</span>
                        <a href="https://chat.whatsapp.com/KnC17YZEiB15oNV5S3bTO6" target="_blank" className="hover:text-black transition-colors">WhatsApp Support</a>
                        <span className="text-gray-200 hidden md:block">|</span>
                        <p>© 2026 JPRINT V3.0 • Premium Edition</p>
                    </div>
                </div>
            </footer>

            {/* Refined Selection Overaly */}
            <AnimatePresence>
                {showSelection && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-6"
                    >
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowSelection(false)} />
                        
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 30 }}
                            className="bg-white w-full max-w-md rounded-[3rem] overflow-hidden relative z-10 p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
                        >
                            <div className="text-center mb-10">
                                <img src="/assets/hero-logo.jpg" className="w-20 h-20 rounded-[2rem] shadow-2xl shadow-black/20 mx-auto mb-6 rotate-6 object-cover" alt="Logo" />
                                <h1 className="text-3xl font-black tracking-tight">Access Portal</h1>
                                <p className="text-gray-500 font-bold text-sm uppercase tracking-widest mt-2 px-6 opacity-60">Verified Campus Entry Only</p>
                            </div>

                            <div className="grid gap-5">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handle128Click}
                                    className="group w-full bg-gray-50 p-6 rounded-[2rem] flex items-center justify-between border-2 border-transparent hover:border-blue-600/20 hover:bg-white hover:shadow-2xl transition-all duration-300"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                                            <School size={28} />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-black text-xl">Sector 128</h3>
                                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest group-hover:text-blue-600">Wish Town Campus</p>
                                        </div>
                                    </div>
                                    <ArrowRight size={24} className="text-gray-300 group-hover:text-blue-600 transition-colors" />
                                </motion.button>

                                <button
                                    onClick={handle62Click}
                                    className="group w-full bg-white border-2 border-gray-100 p-6 rounded-[2rem] flex items-center justify-between opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
                                            <Lock size={28} />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-extrabold text-xl text-gray-400 group-hover:text-black">Sector 62</h3>
                                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Main Campus</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-black bg-orange-100 text-orange-600 px-3 py-1.5 rounded-full uppercase tracking-widest">Soon</span>
                                </button>
                            </div>

                            <button 
                                onClick={() => setShowSelection(false)}
                                className="w-full mt-10 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] hover:text-black transition-colors"
                            >
                                Dismiss Portal
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Popup Notification */}
            <AnimatePresence>
                {show62Popup && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: 20, x: "-50%" }}
                        className="fixed bottom-10 left-1/2 bg-black text-white px-8 py-5 rounded-[2rem] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] flex items-center gap-4 whitespace-nowrap z-[300] border border-white/10"
                    >
                        <div className="w-3 h-3 bg-orange-500 rounded-full animate-ping" />
                        <span className="font-black text-xs uppercase tracking-widest">Intelligence: Sector 62 is deploying soon.</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function FeatureCard({ icon, title, desc, color }) {
    return (
        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 group">
            <div className={`w-16 h-16 ${color} text-white rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-current/20 group-hover:scale-110 transition-transform duration-500`}>
                {icon}
            </div>
            <h3 className="text-2xl font-black mb-4 tracking-tight">{title}</h3>
            <p className="text-gray-400 font-bold text-sm leading-relaxed">{desc}</p>
        </div>
    );
}

function WorkflowStep({ num, title, desc }) {
    return (
        <div className="flex gap-10 group">
            <span className="text-6xl md:text-8xl font-black text-white/5 group-hover:text-blue-600/20 transition-colors tracking-tighter select-none">{num}</span>
            <div className="pt-2">
                <h3 className="text-3xl font-black mb-4 tracking-tight">{title}</h3>
                <p className="text-gray-500 font-bold text-lg md:text-xl max-w-sm leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}

function CampusCard({ name, full, onClick, locked, active }) {
    return (
        <div 
            onClick={onClick}
            className={`w-full max-w-sm p-10 rounded-[3rem] text-left cursor-pointer transition-all duration-500 relative overflow-hidden flex flex-col justify-between aspect-square group ${active ? 'bg-black text-white shadow-3xl shadow-black/20 scale-105' : 'bg-white border-2 border-gray-100 grayscale hover:grayscale-0'}`}
        >
            <div>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-10 ${active ? 'bg-white text-black' : 'bg-gray-100 text-gray-400'}`}>
                    {locked ? <Lock size={24} /> : <School size={24} />}
                </div>
                <h3 className="text-4xl font-black tracking-tighter mb-2">{name}</h3>
                <p className={`font-bold uppercase tracking-widest text-[10px] ${active ? 'text-white/40' : 'text-gray-400'}`}>{full}</p>
            </div>
            
            <div className="flex items-center justify-between">
                <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full ${active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                    {locked ? 'Queue Full' : 'Portal Open'}
                </span>
                <ArrowRight size={24} className={`transition-transform group-hover:translate-x-1 ${active ? 'text-white' : 'text-gray-300'}`} />
            </div>

            {active && <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl -mr-16 -mt-16" />}
        </div>
    );
}
