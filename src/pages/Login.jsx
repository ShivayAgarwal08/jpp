import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Loader2, Sparkles, Shield, User, Lock, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Login() {
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
            await login(email, password, 'user');
            navigate('/home');
        } catch (err) {
            console.error(err);
            setError(typeof err === 'string' ? err : 'Invalid credentials');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-6 relative overflow-hidden transition-colors duration-500 selection:bg-orange-500/20">
            
            {/* Background Aesthetics */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
              <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px]" />
              <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", damping: 20 }}
                className="w-full max-w-sm relative z-10"
            >
                {/* Brand Identity */}
                <div className="text-center mb-12">
                    <motion.div 
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-20 h-20 bg-black rounded-[24px] flex items-center justify-center font-black text-4xl text-white shadow-2xl mx-auto mb-8 cursor-pointer"
                    >
                        J
                    </motion.div>
                    <h1 className="text-4xl font-black tracking-tighter mb-2 uppercase text-black">WELCOME BACK.</h1>
                    <p className="text-neutral-400 font-bold text-[10px] tracking-[0.3em] uppercase opacity-60">Access your production suite</p>
                </div>

                {/* Login Interface */}
                <div className="glass-morphism p-10 rounded-[48px] border border-black/5 shadow-premium">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-neutral-400 ml-1 uppercase tracking-[0.2em]">Institutional Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter identifier..."
                                    className="w-full bg-black/5 border border-transparent rounded-[24px] pl-14 pr-6 py-5 text-sm font-black focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/30 transition-all placeholder:text-neutral-300"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-neutral-400 ml-1 uppercase tracking-[0.2em]">Security Key</label>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-black/5 border border-transparent rounded-[24px] pl-14 pr-6 py-5 text-sm font-black focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/30 transition-all placeholder:text-neutral-300"
                                />
                            </div>
                        </div>

                        <AnimatePresence>
                          {error && (
                              <motion.div
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  className="bg-red-500/5 text-red-500 text-[10px] font-black uppercase tracking-widest p-4 rounded-2xl border border-red-500/10 flex items-center gap-3"
                              >
                                  <Shield size={14} />
                                  <span>{error}</span>
                              </motion.div>
                          )}
                        </AnimatePresence>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-black text-white py-6 rounded-[24px] font-black text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3 group relative overflow-hidden"
                        >
                            {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
                              <div className="flex items-center gap-3 relative z-10">
                                <span className="uppercase tracking-widest">Verify & Enter</span>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                              </div>
                            )}
                        </button>
                    </form>
                </div>

                <div className="text-center mt-12 space-y-6">
                    <p className="text-neutral-400 text-[10px] font-black uppercase tracking-widest">
                        New entity?{' '}
                        <Link to="/register" className="text-orange-500 font-black hover:underline underline-offset-4 decoration-2">
                            CREATE PROFILE
                        </Link>
                    </p>
                    <div className="h-px bg-neutral-100 w-12 mx-auto" />
                    <Link to="/vendor-login" className="inline-block text-[10px] text-neutral-300 font-black uppercase tracking-[0.3em] hover:text-black transition-colors">
                        VENDOR GATEWAY
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}

