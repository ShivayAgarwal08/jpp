import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Loader2, ShieldCheck, Lock, Mail } from 'lucide-react';
import { clsx } from 'clsx';

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
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-white relative overflow-hidden">

            {/* Background Effects */}
            <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] bg-purple-900/40 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-20%] w-[500px] h-[500px] bg-blue-900/30 blur-[120px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-sm relative z-10"
            >
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                        <ShieldCheck size={32} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2 tracking-tight">Vendor Access</h1>
                    <p className="text-gray-400 text-sm">Restricted to JIIT 128 Admins only.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-4">
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors">
                                <Mail size={18} />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Admin Email"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all font-medium"
                            />
                        </div>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors">
                                <Lock size={18} />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Access Key / Password"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all font-medium"
                            />
                        </div>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="text-red-400 text-xs text-center font-bold bg-red-500/10 py-3 rounded-xl border border-red-500/20"
                        >
                            {error}
                        </motion.div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-white text-black font-bold py-4 rounded-2xl text-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
                    >
                        {isLoading ? <Loader2 className="animate-spin" /> : 'Enter Dashboard'}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="w-full text-gray-500 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors pt-4"
                    >
                        Cancel & Return Home
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
