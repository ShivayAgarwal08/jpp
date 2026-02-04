import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Lock, 
  School, 
  Store, 
  User, 
  Printer, 
  Zap, 
  Shield, 
  Download, 
  Clock, 
  ChevronDown,
  Sparkles,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Landing() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [show128Options, setShow128Options] = useState(false);
    const [show62Popup, setShow62Popup] = useState(false);
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll();
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);

    useEffect(() => {
        if (user) {
            navigate('/home');
        }
    }, [user, navigate]);

    const handle128Click = () => {
        setShow128Options(true);
    };

    const handle62Click = () => {
        setShow62Popup(true);
        setTimeout(() => setShow62Popup(false), 3000);
    };

    const features = [
      {
        icon: <Zap className="text-orange-500" />,
        title: "Instant Digital Lab",
        desc: "Upload and process in milliseconds. Direct-to-vendor production pipeline."
      },
      {
        icon: <Shield className="text-orange-500" />,
        title: "Secure Protocols",
        desc: "Encrypted transmission with 4-digit OTP batch verification system."
      },
      {
        icon: <Store className="text-orange-500" />,
        title: "Stationery Clusters",
        desc: "Unified network of verified campus hubs for seamless asset collection."
      }
    ];

    return (
        <div className="min-h-screen bg-white text-black transition-colors duration-500 selection:bg-orange-500/30 font-sans">
            
            {/* Navigation Unit */}
            <nav className="fixed top-0 left-0 w-full z-50 glass-morphism border-b border-black/5 py-5">
              <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center font-black text-white shadow-xl rotate-3">J</div>
                  <span className="font-black text-2xl tracking-tighter uppercase">JPRINT<span className="text-orange-500">.</span></span>
                </div>
                <div className="hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">
                  <a href="#features" className="hover:text-black transition-colors">Features</a>
                  <a href="#about" className="hover:text-black transition-colors">Lab Core</a>
                  <button onClick={() => navigate('/vendor-login')} className="hover:text-orange-500 transition-colors flex items-center gap-2">
                    <Lock size={14} /> Terminal Access
                  </button>
                </div>
                <button 
                  onClick={() => {
                    const el = document.getElementById('selection');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-3 bg-black text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 transition-all active:scale-95 shadow-2xl"
                >
                  INITIALIZE
                </button>
              </div>
            </nav>

            {/* Hero Environment */}
            <section ref={heroRef} className="relative pt-44 pb-32 overflow-hidden flex flex-col items-center">
              {/* Background Fluidics */}
              <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-[150px] pointer-events-none animate-pulse" />
              <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-neutral-100 rounded-full blur-[150px] pointer-events-none" />

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="container mx-auto px-6 text-center relative z-10"
              >
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-black/5 shadow-premium text-black text-[10px] font-black tracking-[0.3em] uppercase mb-10">
                  <Sparkles size={16} className="text-orange-500" /> JPRINT GEN-3 • FOR JIIT NOIDA
                </div>
                
                <h1 className="text-7xl md:text-[10rem] font-black mb-8 leading-[0.85] tracking-tighter text-black uppercase">
                  PRODUCTION AT THE <br />
                  <span className="text-orange-500">SPEED OF LIGHT.</span>
                </h1>
                
                <p className="max-w-3xl mx-auto text-xl md:text-2xl text-neutral-400 font-black uppercase tracking-tight mb-14 leading-tight">
                  High-fidelity academic printing. Upload, authorize, and collect assets with absolute precision logic.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        const el = document.getElementById('selection');
                        el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-12 py-6 bg-black text-white rounded-[24px] font-black uppercase tracking-[0.3em] text-xs shadow-ultra hover:bg-orange-500 transition-all flex items-center gap-4"
                  >
                    START PRODUCTION <ArrowRight size={20} />
                  </motion.button>
                  <button className="px-12 py-6 rounded-[24px] font-black uppercase tracking-[0.3em] text-[10px] border border-black/5 hover:bg-neutral-50 transition-all text-neutral-400 flex items-center gap-3">
                    SYSTEM PROTOCOL <ChevronDown size={18} />
                  </button>
                </div>
              </motion.div>

              {/* Parallax Assets */}
              <div className="relative w-full max-w-6xl mx-auto mt-28 h-[400px] hidden md:block">
                <motion.div 
                  initial={{ rotate: -10, x: -100, opacity: 0 }}
                  animate={{ rotate: -10, x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1.2 }}
                  className="absolute left-[5%] top-10 w-80 p-8 bg-white rounded-[32px] shadow-premium border border-black/5 animate-float"
                >
                  <div className="flex items-center gap-5 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-orange-500/5 text-orange-500 flex items-center justify-center border border-orange-500/10">
                      <FileText size={28} />
                    </div>
                    <div className="text-left font-black text-sm uppercase tracking-tight text-neutral-800">thesis_v3_final.pdf</div>
                  </div>
                  <div className="h-2 bg-neutral-50 rounded-full mb-3" />
                  <div className="h-2 w-2/3 bg-neutral-50 rounded-full" />
                </motion.div>

                <motion.div 
                  initial={{ rotate: 8, x: 100, opacity: 0 }}
                  animate={{ rotate: 8, x: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1.2 }}
                  className="absolute right-[8%] top-20 w-80 p-10 bg-black rounded-[40px] shadow-ultra z-20 border border-white/10"
                  style={{ animation: 'float 8s ease-in-out infinite reverse' }}
                >
                  <div className="text-[10px] font-black uppercase text-orange-500 mb-4 tracking-[0.4em]">AUTHORIZED BATCH</div>
                  <div className="text-5xl font-black mb-3 tracking-[0.2em] text-white uppercase italic">9402</div>
                  <div className="text-[10px] text-neutral-500 font-black uppercase tracking-[0.3em]">SEC-128 PORTAL READY</div>
                </motion.div>
                
                <motion.div 
                   style={{ y: y1 }}
                   className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[800px] h-[500px] bg-gradient-to-t from-orange-500/10 to-transparent blur-[120px] -z-10"
                />
              </div>
            </section>

            {/* Architecture Section */}
            <section id="features" className="py-44 bg-neutral-50/50">
              <div className="container mx-auto px-6 md:px-12">
                <div className="text-center mb-28">
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-black uppercase">PRESTIGE ARCHITECTURE.</h2>
                  <p className="text-neutral-400 font-black uppercase text-[10px] tracking-[0.5em]">Engineered for high-performing environments</p>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                  {features.map((f, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}
                      className="p-12 bg-white rounded-[56px] border border-black/5 shadow-premium hover:shadow-ultra transition-all group"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center mb-10 group-hover:rotate-12 transition-transform shadow-xl">
                        {f.icon}
                      </div>
                      <h3 className="text-3xl font-black mb-6 tracking-tighter text-black uppercase">{f.title}</h3>
                      <p className="text-neutral-400 font-black uppercase text-[10px] tracking-widest leading-loose">{f.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Access Portal */}
            <section id="selection" className="py-56 relative bg-white overflow-hidden">
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
              
               <div className="container mx-auto px-6 flex flex-col items-center text-center relative z-10">
                <div className="max-w-xl w-full">
                   <h2 className="text-6xl font-black tracking-tight mb-6 leading-none text-black uppercase">SELECT CAMPUS<span className="text-orange-500">.</span></h2>
                   <p className="text-neutral-300 mb-16 font-black uppercase text-[10px] tracking-[0.5em]">Node authentication required</p>
                   
                   <div className="grid gap-6">
                        {!show128Options ? (
                            <>
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -4 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handle128Click}
                                    className="group relative w-full bg-white p-10 rounded-[48px] shadow-premium border border-black/5 flex items-center justify-between transition-all"
                                >
                                    <div className="flex items-center gap-8">
                                        <div className="w-20 h-20 bg-black text-white rounded-[28px] flex items-center justify-center group-hover:rotate-3 transition-transform shadow-2xl">
                                            <School size={36} />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-black text-3xl text-black uppercase tracking-tighter">Sector 128</h3>
                                            <p className="text-[10px] text-neutral-400 font-black uppercase tracking-[0.3em] mt-1">JIIT Wish Town Core</p>
                                        </div>
                                    </div>
                                    <div className="w-14 h-14 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                                      <ArrowRight size={24} />
                                    </div>
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    onClick={handle62Click}
                                    className="group relative w-full bg-neutral-50 p-10 rounded-[48px] border border-dashed border-neutral-200 flex items-center justify-between opacity-50 grayscale transition-all cursor-not-allowed overflow-hidden"
                                >
                                    <div className="flex items-center gap-8">
                                        <div className="w-20 h-20 bg-neutral-100 rounded-[28px] flex items-center justify-center text-neutral-300">
                                            <Lock size={36} />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-black text-3xl text-neutral-300 uppercase tracking-tighter">Sector 62</h3>
                                            <p className="text-[10px] text-neutral-300 font-black uppercase tracking-[0.3em] mt-1">Noida Main Campus</p>
                                        </div>
                                    </div>
                                    <div className="text-[9px] font-black uppercase tracking-[0.4em] bg-neutral-100 px-5 py-2 rounded-full text-neutral-400">Offline</div>
                                </motion.button>
                            </>
                        ) : (
                            <motion.div 
                                layoutId="selection-portal"
                                className="bg-black text-white p-14 rounded-[64px] shadow-ultra text-left relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-44 h-44 bg-orange-500/20 blur-[80px] pointer-events-none" />
                                <button onClick={() => setShow128Options(false)} className="text-[9px] font-black uppercase tracking-[0.4em] opacity-40 hover:opacity-100 transition-opacity mb-8 block">← Back to Clusters</button>
                                <h3 className="text-6xl font-black tracking-tighter mb-14 leading-[0.9] uppercase italic">Sector 128<br />Selection.</h3>

                                <div className="space-y-5 relative z-10">
                                  <motion.button
                                      whileHover={{ scale: 1.02, x: 10 }}
                                      onClick={() => navigate('/login')}
                                      className="w-full bg-white text-black p-8 rounded-[32px] flex items-center justify-between transition-all font-black group shadow-2xl"
                                  >
                                      <div className="flex items-center gap-6">
                                          <div className="w-14 h-14 bg-neutral-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <User size={28} />
                                          </div>
                                          <div className="text-left font-black uppercase text-xs tracking-[0.2em]">Authorized Login</div>
                                      </div>
                                      <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                                  </motion.button>

                                  <motion.button
                                      whileHover={{ scale: 1.02, x: 10 }}
                                      onClick={() => navigate('/register')}
                                      className="w-full bg-orange-500 p-8 rounded-[32px] flex items-center justify-between text-white transition-all font-black group shadow-2xl shadow-orange-500/20"
                                  >
                                      <div className="flex items-center gap-6">
                                          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Sparkles size={28} />
                                          </div>
                                          <div className="text-left font-black uppercase text-xs tracking-[0.2em]">Platform Enrollment</div>
                                      </div>
                                      <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                                  </motion.button>
                                </div>
                            </motion.div>
                        )}
                   </div>
                </div>
              </div>
            </section>

            {/* Final Call */}
            <section className="py-56 relative overflow-hidden bg-black text-white text-center">
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-orange-500 rounded-full blur-[200px]" />
              </div>

              <div className="container mx-auto px-6 relative z-10">
                 <h2 className="text-7xl md:text-[12rem] font-black tracking-tighter mb-12 max-w-7xl mx-auto leading-[0.8] uppercase">JOIN THE <br />PRODUCTION.</h2>
                 <p className="text-neutral-500 font-black mb-20 text-xs tracking-[0.8em] uppercase">SYSTEM V3.0 • EXCLUSIVE ACCESS</p>
                 <button 
                  onClick={() => {
                    const el = document.getElementById('selection');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-24 py-10 bg-white text-black text-xl font-black rounded-full hover:scale-110 active:scale-95 transition-all shadow-ultra uppercase tracking-[0.4em]"
                 >
                   INITIALIZE
                 </button>
              </div>
            </section>

            {/* Footer Units */}
            <footer className="py-24 bg-white text-neutral-400 border-t border-black/5">
               <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-16">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center font-black text-white rotate-3">J</div>
                    <span className="font-black text-black tracking-tighter text-2xl uppercase">JPRINT<span className="text-orange-500">.</span></span>
                  </div>
                  <div className="flex gap-14 text-[10px] font-black uppercase tracking-[0.4em]">
                    <a href="#" className="hover:text-black transition-colors">Privacy</a>
                    <a href="#" className="hover:text-black transition-colors">Protocols</a>
                    <a href="#" className="hover:text-black transition-colors">Core Support</a>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-300">© 2026 SHIVAY AGARWAL • JIIT OPERATIVE.</p>
               </div>
            </footer>

            {/* Global Notifications */}
            <AnimatePresence>
                {show62Popup && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: 30, x: "-50%" }}
                        className="fixed bottom-12 left-1/2 bg-black text-white px-10 py-6 rounded-[32px] shadow-ultra flex items-center gap-5 whitespace-nowrap z-50 border border-white/10"
                    >
                        <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white animate-pulse">
                          <CheckCircle2 size={24} />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-black text-xs tracking-[0.2em] uppercase">Sector 62 Pipeline Pending</span>
                          <span className="text-[9px] font-black text-neutral-500 tracking-[0.3em] uppercase">SYNCING NEW NODES FOR NEXT DEPLOYMENT</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
