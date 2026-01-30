import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { createContext, useContext, useState, useCallback } from 'react';
import { clsx } from 'clsx';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'success') => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => removeToast(id), 3000);
    }, []);

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
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
        success: <CheckCircle size={18} className="text-green-500" />,
        error: <AlertCircle size={18} className="text-red-500" />,
        info: <Info size={18} className="text-blue-500" />
    };

    const bgColors = {
        success: 'bg-white border-green-100',
        error: 'bg-white border-red-100',
        info: 'bg-white border-blue-100'
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={clsx(
                "flex items-center gap-3 p-4 rounded-xl shadow-lg border min-w-[300px]",
                bgColors[type]
            )}
        >
            {icons[type]}
            <p className="text-sm font-medium text-gray-800 flex-1">{message}</p>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X size={16} />
            </button>
        </motion.div>
    );
};
