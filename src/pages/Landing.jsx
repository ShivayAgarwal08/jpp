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
  CheckCircle2
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
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

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
        icon: <Zap className="text-yellow-500" />,
        title: "Instant Prints",
        desc: "Upload and print in seconds. No more long queues."
      },
      {
        icon: <Shield className="text-blue-500" />,
        title: "Secure Verification",
        desc: "Secure 4-digit OTP system for safe handovers."
      },
      {
        icon: <Store className="text-green-500" />,
        title: "Campus Hubs",
        desc: "Integrated with your favorite campus stationery shops."
      }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500 selection:bg-orange-500/30">
            
            {/* Navigation */}
            <nav className="fixed top-0 left-0 w-full z-50 glass-morphism border-b border-black/5 dark:border-white/5 py-4">
              <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center font-black text-white dark:text-black shadow-lg">J</div>
                  <span className="font-bold text-xl tracking-tighter">JPRINT<span className="text-orange-500">.</span></span>
                </div>
                <div className="hidden md:flex items-center gap-8 text-sm font-semibold opacity-70">
                  <a href="#features" className="hover:opacity-100 transition-opacity">Features</a>
                  <a href="#about" className="hover:opacity-100 transition-opacity">About</a>
                  <button onClick={() => navigate('/vendor-login')} className="hover:opacity-100 transition-opacity flex items-center gap-1">
                    <Lock size={14} /> Vendor Access
                  </button>
                </div>
                <button 
                  onClick={() => {
                    const el = document.getElementById('selection');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full text-xs font-bold hover:scale-105 transition-all active:scale-95 shadow-xl shadow-black/10"
                >
                  Get Started
                </button>
              </div>
            </nav>

            {/* Hero Section */}
            <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden flex flex-col items-center">
              {/* Background Glows */}
              <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
              <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="container mx-auto px-6 text-center relative z-10"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[10px] font-black tracking-widest uppercase mb-8 border border-orange-500/20">
                  <Sparkles size={14} /> JPRINT V3.0 • EXCLUSIVE TO JIIT
                </div>
                
                <h1 className="text-6xl md:text-8xl font-black mb-6 leading-[0.9] tracking-tighter">
                  PRINTING AT THE <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">SPEED OF THOUGHT.</span>
                </h1>
                
                <p className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-500 dark:text-neutral-400 font-medium mb-10 leading-relaxed">
                  Skip the line. Upload your documents, pay securely, and collect from your campus stationery shop with a single OTP.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        const el = document.getElementById('selection');
                        el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn-primary"
                  >
                    Start Printing Now <ArrowRight size={20} />
                  </motion.button>
                  <button className="px-8 py-4 rounded-full font-bold flex items-center gap-2 border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-all">
                    How it works <ChevronDown size={18} />
                  </button>
                </div>
              </motion.div>

              {/* Floating Elements (Demo Cards) */}
              <div className="relative w-full max-w-5xl mx-auto mt-20 h-[300px] hidden md:block">
                <motion.div 
                  initial={{ rotate: -15, y: 50, opacity: 0 }}
                  animate={{ rotate: -15, y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="absolute left-[10%] top-0 w-64 p-5 stunning-card rounded-2xl animate-float"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center">
                      <FileText size={20} />
                    </div>
                    <div className="text-left font-bold text-xs">lecture_notes.pdf</div>
                  </div>
                  <div className="h-1 bg-neutral-200 dark:bg-neutral-800 rounded-full mb-2" />
                  <div className="h-1 w-2/3 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
                </motion.div>

                <motion.div 
                  initial={{ rotate: 10, y: 70, opacity: 0 }}
                  animate={{ rotate: 10, y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 1 }}
                  className="absolute right-[15%] top-10 w-64 p-5 stunning-card rounded-2xl shadow-2xl z-20"
                  style={{ animation: 'float 6s ease-in-out infinite reverse' }}
                >
                  <div className="text-xs font-black uppercase text-orange-500 mb-2 tracking-widest">Order Verified</div>
                  <div className="text-3xl font-black mb-1">8 4 9 2</div>
                  <div className="text-[10px] text-neutral-400 font-bold">READY TO COLLECT</div>
                </motion.div>
                
                <motion.div 
                   style={{ y: y1 }}
                   className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[500px] h-[400px] bg-gradient-to-t from-orange-500/20 to-transparent blur-[80px] -z-10"
                />
              </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-32 bg-neutral-50 dark:bg-neutral-950">
              <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                  <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">ENGINEERED FOR JIITIANS.</h2>
                  <p className="text-neutral-500 dark:text-neutral-400 font-medium">Everything you need for a stress-free printing experience.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {features.map((f, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="p-8 stunning-card rounded-3xl"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center mb-6">
                        {f.icon}
                      </div>
                      <h3 className="text-2xl font-bold mb-3 tracking-tight">{f.title}</h3>
                      <p className="text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">{f.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Selection Section (The Core Logic) */}
            <section id="selection" className="py-40 relative">
              <div className="container mx-auto px-6 flex flex-col items-center">
                <div className="max-w-xl w-full text-center">
                   <h2 className="text-5xl font-black tracking-tighter mb-8 leading-tight">SELECT YOUR CAMPUS.</h2>
                   
                   <div className="grid gap-4">
                        {!show128Options ? (
                            <>
                                <motion.button
                                    whileHover={{ scale: 1.02, x: 5 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handle128Click}
                                    className="group relative w-full bg-white dark:bg-neutral-900 p-8 rounded-[32px] shadow-2xl border border-black/5 dark:border-white/5 flex items-center justify-between transition-all"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 bg-black text-white dark:bg-white dark:text-black rounded-3xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                                            <School size={32} />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-black text-2xl">Sector 128</h3>
                                            <p className="text-xs text-neutral-400 font-black uppercase tracking-widest">Jaypee Wish Town</p>
                                        </div>
                                    </div>
                                    <div className="w-12 h-12 rounded-full border border-black/5 dark:border-white/5 flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
                                      <ArrowRight />
                                    </div>
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    onClick={handle62Click}
                                    className="group relative w-full bg-neutral-100 dark:bg-neutral-950 p-8 rounded-[32px] border border-dashed border-neutral-300 dark:border-neutral-800 flex items-center justify-between opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-not-allowed overflow-hidden"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 bg-neutral-200 dark:bg-neutral-900 rounded-3xl flex items-center justify-center text-neutral-400">
                                            <Lock size={32} />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-black text-2xl text-neutral-400">Sector 62</h3>
                                            <p className="text-xs text-neutral-400 font-black uppercase tracking-widest">Noida Campus</p>
                                        </div>
                                    </div>
                                    <div className="text-[10px] font-black uppercase tracking-widest bg-neutral-200 dark:bg-neutral-800 px-3 py-1 rounded-full text-neutral-500">Locked</div>
                                </motion.button>
                            </>
                        ) : (
                            <motion.div 
                              layoutId="selection-portal"
                              className="bg-black dark:bg-white text-white dark:text-black p-10 rounded-[40px] shadow-3xl text-left"
                            >
                                <button onClick={() => setShow128Options(false)} className="text-[10px] font-black uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity mb-4 block">← Change Campus</button>
                                <h3 className="text-4xl font-black tracking-tighter mb-8 leading-none">SECTOR 128<br />PORTAL.</h3>

                                <div className="space-y-4">
                                  <motion.button
                                      whileHover={{ scale: 1.02 }}
                                      onClick={() => navigate('/login')}
                                      className="w-full bg-white/10 dark:bg-black/10 hover:bg-white/20 dark:hover:bg-black/20 p-6 rounded-3xl flex items-center justify-between backdrop-blur-md border border-white/10 dark:border-black/10 transition-all font-bold group"
                                  >
                                      <div className="flex items-center gap-4">
                                          <div className="w-12 h-12 bg-white text-black dark:bg-black dark:text-white rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <User size={24} />
                                          </div>
                                          <div className="text-left font-black">LOGIN AS STUDENT</div>
                                      </div>
                                      <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </motion.button>

                                  <motion.button
                                      whileHover={{ scale: 1.02 }}
                                      onClick={() => navigate('/register')}
                                      className="w-full bg-orange-500 p-6 rounded-3xl flex items-center justify-between text-white transition-all font-bold group shadow-xl shadow-orange-500/20"
                                  >
                                      <div className="flex items-center gap-4">
                                          <div className="w-12 h-12 bg-white text-orange-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Sparkles size={24} />
                                          </div>
                                          <div className="text-left font-black tracking-tight underline underline-offset-4 decoration-2">NEW? REGISTER HERE</div>
                                      </div>
                                      <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </motion.button>
                                </div>
                            </motion.div>
                        )}
                   </div>
                </div>
              </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 relative overflow-hidden bg-black text-white text-center">
              <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-500 rounded-full blur-[180px]" />
                <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-orange-500 rounded-full blur-[180px]" />
              </div>

              <div className="container mx-auto px-6 relative z-10">
                 <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 max-w-4xl mx-auto leading-none">JOIN 500+ STUDENTS ALREADY PRINTING SMARTER.</h2>
                 <p className="text-neutral-400 font-medium mb-12 text-xl">Better for you. Better for the environment. Faster for everyone.</p>
                 <button 
                  onClick={() => {
                    const el = document.getElementById('selection');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-12 py-6 bg-white text-black text-xl font-bold rounded-full hover:scale-110 active:scale-95 transition-all shadow-2xl shadow-blue-500/20 active:shadow-none"
                 >
                   Let's Go!
                 </button>
              </div>
            </section>

            {/* Footer */}
            <footer className="py-20 bg-neutral-950 text-neutral-600">
               <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-neutral-800 rounded-lg flex items-center justify-center font-black text-white">J</div>
                    <span className="font-bold text-white tracking-tighter">JPRINT.</span>
                  </div>
                  <div className="flex gap-8 text-xs font-bold uppercase tracking-widest">
                    <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms</a>
                    <a href="#" className="hover:text-white transition-colors">Support</a>
                    <a href="#" className="hover:text-white transition-colors text-orange-500">v3.0 Major Update</a>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest">© 2026 SHIVAY AGARWAL • JIIT EXCLUSIVE.</p>
               </div>
            </footer>

            {/* Popup Notification */}
            <AnimatePresence>
                {show62Popup && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: 20, x: "-50%" }}
                        className="fixed bottom-10 left-1/2 glass-morphism dark:bg-white dark:text-black bg-black text-white px-8 py-5 rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] flex items-center gap-4 whitespace-nowrap z-50 border border-black/10 dark:border-white/10"
                    >
                        <div className="relative">
                          <CheckCircle2 size={24} className="text-orange-500 animate-pulse" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-black text-sm tracking-tight uppercase">Coming Soon to Sector 62</span>
                          <span className="text-[10px] font-bold opacity-60">WE ARE EXPANDING OUR SERVICE TO NOIDA 62 SOON!</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}

// Sub-component for icons to fix the undefined error
function FileText({ size }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  );
}

