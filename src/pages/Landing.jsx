import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, School, Store, User } from 'lucide-react';

export default function Landing() {
    const navigate = useNavigate();
    const [show128Options, setShow128Options] = useState(false);
    const [show62Popup, setShow62Popup] = useState(false);

    const handle128Click = () => {
        setShow128Options(true);
    };

    const handle62Click = () => {
        setShow62Popup(true);
        setTimeout(() => setShow62Popup(false), 3000);
    };

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans text-gray-900 selection:bg-black selection:text-white">
            
            {/* Background Ambience */}
            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-orange-400/20 rounded-full blur-[100px] pointer-events-none" />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-sm z-10 text-center"
            >
                {/* Logo / Brand */}
                <div className="mb-12">
                    <div className="w-20 h-20 bg-black text-white rounded-3xl flex items-center justify-center font-bold text-4xl tracking-tighter shadow-2xl shadow-black/20 mx-auto mb-6 rotate-3">
                        J.
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight mb-2">JPRINT<span className="text-orange-500">.</span></h1>
                    <p className="text-gray-500 font-medium">Select your campus to continue.</p>
                </div>

                {/* Main Selection Grid */}
                <div className="grid gap-4">
                    {!show128Options ? (
                        <>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handle128Click}
                                className="group relative w-full bg-white p-6 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 flex items-center justify-between overflow-hidden"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors duration-300">
                                        <School size={24} />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-bold text-lg">Sector 128</h3>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Jaypee Wish Town</p>
                                    </div>
                                </div>
                                <ArrowRight className="text-gray-300 group-hover:text-black transition-colors" />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handle62Click}
                                className="group relative w-full bg-white p-6 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 flex items-center justify-between overflow-hidden opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-500">
                                        <Lock size={24} />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-bold text-lg text-gray-500 group-hover:text-gray-900 transition-colors">Sector 62</h3>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Noida</p>
                                    </div>
                                </div>
                            </motion.button>
                        </>
                    ) : (
                        <div className="space-y-4">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-left mb-2 px-2"
                            >
                                <button onClick={() => setShow128Options(false)} className="text-xs font-bold text-gray-400 hover:text-black transition-colors mb-2">← Back to Selection</button>
                                <h3 className="font-bold text-xl">Sector 128 Portal</h3>
                            </motion.div>

                            <motion.button
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/login')}
                                className="w-full bg-black text-white p-6 rounded-3xl shadow-xl shadow-black/20 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                        <User size={20} />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-bold text-lg">Student / Faculty</h3>
                                        <p className="text-xs text-white/60 font-medium">Order Prints & Docs</p>
                                    </div>
                                </div>
                                <ArrowRight className="text-white/60" />
                            </motion.button>

                            <motion.button
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/vendor-login')}
                                className="w-full bg-white text-gray-900 p-6 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
                                        <Store size={20} />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-bold text-lg">Vendor</h3>
                                        <p className="text-xs text-gray-400 font-medium">Manage Orders</p>
                                    </div>
                                </div>
                                <ArrowRight className="text-gray-300" />
                            </motion.button>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-12">
                    <p className="text-xs text-gray-400 font-medium">JPRINT v3.0 • Premium Printing Service</p>
                </div>

            </motion.div>

            {/* Popup Notification */}
            <AnimatePresence>
                {show62Popup && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: 20, x: "-50%" }}
                        className="fixed bottom-10 left-1/2 bg-black text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 whitespace-nowrap z-50"
                    >
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                        <span className="font-bold text-sm">Coming Soon to Sector 62</span>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
