import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ShieldCheck, Lock, Mail, ArrowRight, ShieldAlert } from 'lucide-react';

export default function VendorLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await login(email, password, 'vendor');
            navigate('/vendor');
        } catch (err) {
            setError(err || 'Failed to login');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-white relative overflow-hidden font-sans">

            {/* Matrix/Secure Background Grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #333 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            
            <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-red-900/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-20%] w-[600px] h-[600px] bg-neutral-900/30 blur-[150px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-sm relative z-10"
            >
                <div className="text-center mb-10">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="w-20 h-20 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-3xl group cursor-pointer"
                    >
                        <ShieldCheck size={40} className="text-white group-hover:text-red-500 transition-colors" />
                    </motion.div>
                    <h1 className="text-4xl font-black mb-2 tracking-tighter uppercase italic">SECURE GATEWAY</h1>
                    <p className="text-neutral-500 text-[10px] font-black tracking-[0.3em] uppercase opacity-60">Admin Level Access Only</p>
                </div>

                <div className="glass-morphism p-10 rounded-[48px] border border-white/10 shadow-3xl bg-white/[0.02]">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-neutral-500 ml-1 uppercase tracking-[0.2em]">Credential ID</label>
                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-red-500 transition-colors" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@jprint.sec"
                                    className="w-full bg-white/5 border border-white/5 rounded-[24px] pl-14 pr-6 py-5 text-sm font-black focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500/30 transition-all placeholder:text-neutral-700"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-neutral-500 ml-1 uppercase tracking-[0.2em]">Authorization Key</label>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-red-500 transition-colors" size={18} />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/5 rounded-[24px] pl-14 pr-6 py-5 text-sm font-black focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500/30 transition-all placeholder:text-neutral-700"
                                />
                            </div>
                        </div>

                        <AnimatePresence>
                          {error && (
                              <motion.div
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  className="bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-widest p-4 rounded-2xl border border-red-500/20 flex items-center gap-3"
                              >
                                  <ShieldAlert size={14} />
                                  <span>{error}</span>
                              </motion.div>
                          )}
                        </AnimatePresence>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-white text-black py-5 rounded-[24px] font-black text-sm shadow-xl hover:bg-neutral-200 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3 group"
                        >
                            {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
                              <>
                                <span>INITIALIZE DASHBOARD</span>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                              </>
                            )}
                        </button>
                    </form>
                </div>

                <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="w-full text-neutral-600 text-[10px] font-black uppercase tracking-[0.4em] hover:text-white transition-colors mt-12 text-center"
                >
                    ABORT & RETURN
                </button>
            </motion.div>
        </div>
    );
}

