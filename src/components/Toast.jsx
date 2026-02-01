import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, Zap } from 'lucide-react';
import { createContext, useContext, useState, useCallback } from 'react';
import clsx from 'clsx';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'success') => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => removeToast(id), 4000);
    }, []);

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4 pointer-events-none">
                <AnimatePresence mode='popLayout'>
                    {toasts.map((toast) => (
                        <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

const Toast = ({ message, type, onClose }) => {
    const icons = {
        success: <CheckCircle size={22} className="text-emerald-500" />,
        error: <AlertCircle size={22} className="text-red-500" />,
        info: <Zap size={22} className="text-blue-500 fill-current" />
    };

    const themes = {
        success: 'border-emerald-500/10',
        error: 'border-red-500/10',
        info: 'border-blue-500/10'
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: 40, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: 20, scale: 0.9, transition: { duration: 0.2 } }}
            className={clsx(
                "flex items-center gap-5 p-6 rounded-[2rem] bg-white/80 backdrop-blur-3xl shadow-[0_30px_60px_-12px_rgba(0,0,0,0.12)] border min-w-[340px] pointer-events-auto group relative overflow-hidden",
                themes[type]
            )}
        >
            <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-2xl bg-gray-50 group-hover:bg-white transition-colors shadow-inner">
                {icons[type]}
            </div>
            
            <div className="relative z-10 flex-1 py-1">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{type === 'success' ? 'Terminal Success' : type === 'error' ? 'Critical Alert' : 'System Info'}</p>
                <p className="text-base font-black text-gray-950 tracking-tight leading-none italic">{message}</p>
            </div>

            <button 
                onClick={onClose} 
                className="relative z-10 w-8 h-8 rounded-lg flex items-center justify-center text-gray-300 hover:text-black hover:bg-gray-100 transition-all"
            >
                <X size={18} />
            </button>

            {/* Subtle glow based on type */}
            <div className={clsx(
                "absolute -bottom-10 -right-10 w-32 h-32 blur-3xl opacity-10 rounded-full pointer-events-none",
                type === 'success' ? 'bg-emerald-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'
            )} />
        </motion.div>
    );
};
