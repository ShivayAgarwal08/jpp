import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ShieldCheck, Lock, Mail, ChevronRight, AlertCircle, ArrowLeft } from 'lucide-react';

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
            setError(err || 'Authentication failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center p-6 font-sans selection:bg-amber-100">

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-sm"
            >
                {/* Brand */}
                <div className="text-center mb-10">
                    <Link to="/" className="inline-flex items-center gap-2 mb-8 group">
                         <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center font-bold text-white">J</div>
                         <span className="font-bold text-xl tracking-tight text-white italic">JPRINT<span className="text-amber-600">.</span></span>
                    </Link>
                    <h1 className="text-2xl font-bold text-white mb-2">Vendor Dashboard</h1>
                    <p className="text-sm text-neutral-400 font-medium tracking-tight">Authorized access for station operators only.</p>
                </div>

                {/* Card */}
                <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[32px] border border-white/10 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-400 ml-1">Vendor Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-amber-500 transition-colors" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="operator@jprint.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-600/30 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-400 ml-1">Access Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-amber-500 transition-colors" size={18} />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-600/30 transition-all"
                                />
                            </div>
                        </div>

                        <AnimatePresence>
                          {error && (
                              <motion.div
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="bg-red-500/10 text-red-400 text-[11px] font-bold p-4 rounded-xl border border-red-500/20 flex items-center gap-3"
                              >
                                  <AlertCircle size={14} />
                                  <span>{error}</span>
                              </motion.div>
                          )}
                        </AnimatePresence>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-amber-600 text-white py-4 rounded-xl font-bold text-sm shadow-xl hover:bg-amber-700 transition-all active:scale-95 flex items-center justify-center gap-2 group disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
                              <>
                                <span>Authenticate</span>
                                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                              </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="text-center mt-8">
                    <button
                        onClick={() => navigate('/')}
                        className="text-xs font-bold text-neutral-500 hover:text-white transition-colors flex items-center gap-2 mx-auto"
                    >
                        <ArrowLeft size={14} /> Back to User Portal
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
