import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ShieldCheck, Lock, Mail, ArrowRight, ArrowLeft, Zap } from 'lucide-react';
import clsx from 'clsx';

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
            setError(err || 'Auth Breach Detected: Invalid Credentials');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-white relative overflow-hidden font-sans selection:bg-blue-600 selection:text-white">

            {/* Background Effects - More Subtle & Premium */}
            <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none animate-float" />
            <div className="absolute bottom-[-20%] right-[-20%] w-[500px] h-[500px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none animate-pulse-soft" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-sm relative z-10"
            >
                <div className="text-center mb-12">
                    <img src="/assets/logo.png" className="w-24 h-24 rounded-[2.5rem] shadow-2xl shadow-blue-600/20 mx-auto mb-10 rotate-3 object-cover border-2 border-blue-600/20" alt="Logo" />
                    <h1 className="text-5xl font-black tracking-tighter mb-4 italic">Station V.</h1>
                    <p className="text-white/40 font-bold text-sm tracking-widest uppercase italic">Secure Operational Access</p>
                </div>

                <div className="bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/5 shadow-2xl relative">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-1">Terminal ID</label>
                                <div className="relative group">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-blue-500 transition-colors">
                                        <Mail size={20} />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@jprint.io"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white placeholder:text-gray-700 focus:outline-none focus:border-blue-600/50 focus:bg-white/10 transition-all font-black"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-1">Universal Key</label>
                                <div className="relative group">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-blue-500 transition-colors">
                                        <Lock size={20} />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white placeholder:text-gray-700 focus:outline-none focus:border-blue-600/50 focus:bg-white/10 transition-all font-black"
                                    />
                                </div>
                            </div>
                        </div>

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-red-500 text-[10px] font-black text-center uppercase tracking-widest bg-red-500/10 py-4 rounded-xl border border-red-500/20 italic"
                                >
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-white text-black font-black py-6 rounded-2xl text-lg hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 shadow-2xl uppercase tracking-widest"
                        >
                            {isLoading ? <Loader2 className="animate-spin" size={24} /> : (
                                <>Verify Auth <ArrowRight size={22} /></>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="w-full text-white/20 text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-all pt-4 italic flex items-center justify-center gap-2 group"
                        >
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Abort Mission
                        </button>
                    </form>
                    
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
                </div>

                <div className="mt-12 flex items-center justify-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all">
                    <div className="flex items-center gap-2">
                        <Zap size={14} />
                        <span className="text-[9px] font-black uppercase tracking-widest leading-none mt-0.5">Fleet Protocol</span>
                    </div>
                    <div className="w-1 h-1 bg-white/20 rounded-full" />
                    <div className="flex items-center gap-2">
                        <Lock size={14} />
                        <span className="text-[9px] font-black uppercase tracking-widest leading-none mt-0.5">RSA Encrypted</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
