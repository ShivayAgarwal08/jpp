import { useState, useEffect } from 'react';
import { 
    ArrowLeft, 
    Check, 
    ChevronRight, 
    Loader2, 
    Upload, 
    File, 
    X, 
    FileImage, 
    CreditCard, 
    PenTool,
    Printer,
    FileText,
    Copy,
    Zap,
    ShieldCheck,
    AlertCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useOrder } from '../context/OrderContext';
import clsx from 'clsx';

export default function Order() {
    const { currentOrder, addFile, removeFile, updateSettings, calculateTotal, placeOrder } = useOrder();
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Upload, 2: Checkout, 3: Success
    const [isProcessing, setIsProcessing] = useState(false);
    const [completedOrder, setCompletedOrder] = useState(null);

    const total = calculateTotal();
    const hasFiles = currentOrder.files.length > 0;
    const isAllStationery = hasFiles && currentOrder.files.every(f => f.type === 'stationery');

    const handleNext = () => {
        if (step === 1 && hasFiles) setStep(2);
    };

    const handlePay = async () => {
        setIsProcessing(true);
        try {
            const result = await placeOrder(total);
            if (result && result.success) {
                setCompletedOrder({ otp: result.otp });
                setStep(3);
            }
        } catch (e) {
            console.error(e);
            alert("Order failed. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [step]);

    if (step === 3 && completedOrder) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", damping: 12 }}
                    className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white mb-8 shadow-2xl shadow-green-200"
                >
                    <Check size={48} strokeWidth={4} />
                </motion.div>
                
                <h2 className="text-4xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
                <p className="text-gray-500 font-medium mb-12">Your order is being processed by the vendor.</p>

                <div className="bg-gray-50 rounded-[2.5rem] p-10 border border-gray-100 w-full max-w-sm mb-12 relative overflow-hidden">
                    <div className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Collection OTP</div>
                    <div className="text-6xl font-black text-black tracking-[0.1em] mb-4 font-mono">{completedOrder.otp}</div>
                    <p className="text-[10px] text-orange-600 font-bold uppercase tracking-wider bg-orange-50 inline-block px-3 py-1 rounded-full border border-orange-100">
                        Show this at the counter
                    </p>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16" />
                </div>

                <div className="flex flex-col gap-4 w-full max-w-sm">
                    <button 
                        onClick={() => navigate('/orders')}
                        className="w-full bg-black text-white font-bold py-5 rounded-2xl text-lg hover:bg-gray-800 transition-all shadow-xl shadow-black/10"
                    >
                        Track Order Status
                    </button>
                    <button 
                        onClick={() => navigate('/home')}
                        className="text-gray-400 font-bold hover:text-black transition-colors"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FBFBFD] pb-32">
            
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-xl sticky top-0 z-40 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => step === 1 ? navigate('/home') : setStep(1)} className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="font-bold text-lg">{step === 1 ? 'Configure Print' : 'Confirm & Pay'}</h1>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Step {step} of 2</p>
                    </div>
                </div>
                {hasFiles && (
                    <div className="bg-black text-white px-3 py-1 rounded-full text-[10px] font-bold">
                        {currentOrder.files.length} ITEMS
                    </div>
                )}
            </header>

            <div className="max-w-xl mx-auto p-6">
                <AnimatePresence mode='wait'>
                    {step === 1 ? (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            {/* Upload Zone */}
                            <div className="relative group">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*,application/pdf"
                                    onChange={(e) => Array.from(e.target.files).forEach(addFile)}
                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                />
                                <div className="border-2 border-dashed border-gray-200 bg-white rounded-[2rem] p-12 text-center transition-all group-hover:border-black/20 group-hover:bg-gray-50">
                                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-400 group-hover:scale-110 group-hover:text-black transition-all">
                                        <Printer size={32} />
                                    </div>
                                    <h3 className="font-bold text-xl mb-1">Click or drag files</h3>
                                    <p className="text-sm text-gray-400 font-medium">Support PDFs, Images up to 20MB</p>
                                </div>
                            </div>

                            {/* File List */}
                            <div className="space-y-4">
                                {currentOrder.files.map((file) => (
                                    <motion.div 
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        key={file.id} 
                                        className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 group"
                                    >
                                        <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white transition-colors shrink-0">
                                            {file.type === 'stationery' ? <PenTool size={24} /> :
                                                file.type.startsWith('image/') ? <FileImage size={24} /> : <FileText size={24} />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold truncate text-sm">{file.name}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                                                    {file.type === 'stationery' ? `₹${file.price}` : `${(file.size / 1024 / 1024).toFixed(2)} MB`}
                                                </span>
                                                {file.pageCount > 0 && (
                                                    <span className="bg-gray-100 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                                                        {file.pageCount} Pages
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <button onClick={() => removeFile(file.id)} className="w-8 h-8 rounded-full flex items-center justify-center text-gray-300 hover:bg-red-50 hover:text-red-500 transition-all">
                                            <X size={18} />
                                        </button>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Quick Settings (Mini) */}
                            {hasFiles && !isAllStationery && (
                                <div className="bg-gray-900 rounded-[2rem] p-8 text-white">
                                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                        <Zap size={18} className="text-primary fill-current" /> Print Preferences
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <SettingToggle 
                                            label="Color" 
                                            active={currentOrder.settings.color} 
                                            onClick={() => updateSettings('color', !currentOrder.settings.color)}
                                            onLabel="Vibrant"
                                            offLabel="B&W"
                                        />
                                        <SettingToggle 
                                            label="Sides" 
                                            active={currentOrder.settings.doubleSided} 
                                            onClick={() => updateSettings('doubleSided', !currentOrder.settings.doubleSided)}
                                            onLabel="Double"
                                            offLabel="Single"
                                        />
                                    </div>
                                    <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                                        <span className="text-sm font-bold text-white/60 uppercase racking-widest">Copies</span>
                                        <div className="flex items-center gap-6">
                                            <button onClick={() => updateSettings('copies', Math.max(1, currentOrder.settings.copies - 1))} className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">-</button>
                                            <span className="font-bold text-lg w-4 text-center">{currentOrder.settings.copies}</span>
                                            <button onClick={() => updateSettings('copies', currentOrder.settings.copies + 1)} className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">+</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-8"
                        >
                            {/* Summary Card */}
                            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold mb-6">Order Summary</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400 font-medium">Items</span>
                                        <span className="font-bold">{currentOrder.files.length}</span>
                                    </div>
                                    {!isAllStationery && (
                                        <>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-400 font-medium">Pages</span>
                                                <span className="font-bold">{currentOrder.files.reduce((acc, f) => acc + (f.pageCount || 1), 0)}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-400 font-medium">Print Mode</span>
                                                <span className="font-bold">{currentOrder.settings.color ? 'Full Color' : 'Black & White'}</span>
                                            </div>
                                        </>
                                    )}
                                    <div className="h-px bg-gray-50 my-2" />
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold">Total Amount</span>
                                        <span className="text-2xl font-black">₹{total}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-blue-500 rounded-[2rem] p-8 text-white relative overflow-hidden group">
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 text-white/60 text-[10px] font-bold uppercase tracking-widest mb-4">
                                        <ShieldCheck size={14} /> Encrypted Payment
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Campus Wallet / UPI</h3>
                                    <p className="text-white/70 text-sm font-medium leading-relaxed">Fastest checkout using your students portal credits or any UPI app.</p>
                                </div>
                                <CreditCard className="absolute bottom-[-20px] right-[-20px] text-white/10 rotate-12" size={120} />
                            </div>

                            <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-2xl border border-orange-100">
                                <AlertCircle size={18} className="text-orange-500 shrink-0 mt-0.5" />
                                <p className="text-xs text-orange-700 font-medium leading-relaxed">
                                    By proceeding, you agree to JIIT printing policies. Files once sent cannot be retracted.
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-gray-100 p-6 z-50">
                <div className="max-w-xl mx-auto">
                    {step === 1 ? (
                        <button
                            onClick={handleNext}
                            disabled={!hasFiles}
                            className="w-full bg-black text-white py-5 rounded-[2rem] font-bold text-lg shadow-2xl shadow-black/10 disabled:opacity-30 disabled:shadow-none flex items-center justify-between px-10 hover:scale-[1.01] active:scale-[0.99] transition-all"
                        >
                            <span>Summary</span>
                            <span className="flex items-center gap-2 uppercase text-xs tracking-widest">Proceed <ChevronRight size={18} /></span>
                        </button>
                    ) : (
                        <button
                            onClick={handlePay}
                            disabled={isProcessing}
                            className="w-full bg-green-500 text-white py-5 rounded-[2rem] font-bold text-lg shadow-2xl shadow-green-500/20 flex items-center justify-between px-10 disabled:opacity-70 hover:scale-[1.01] active:scale-[0.99] transition-all"
                        >
                            <div className="flex flex-col items-start leading-none">
                                <span className="text-[10px] opacity-70 font-bold tracking-widest uppercase">Pay Total</span>
                                <span>₹{total}</span>
                            </div>
                            <span className="flex items-center gap-2 uppercase text-xs tracking-widest">
                                {isProcessing ? <Loader2 className="animate-spin" size={20} /> : 'Complete Order'}
                                {!isProcessing && <ChevronRight size={18} />}
                            </span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

function SettingToggle({ label, active, onClick, onLabel, offLabel }) {
    return (
        <div onClick={onClick} className="cursor-pointer bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-2 hover:bg-white/10 transition-colors">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{label}</span>
            <div className="flex items-center justify-between">
                <span className={clsx("font-bold text-sm transition-colors", active ? "text-primary" : "text-white")}>
                    {active ? onLabel : offLabel}
                </span>
                <div className={clsx("w-8 h-4 rounded-full relative transition-colors", active ? "bg-primary" : "bg-white/20")}>
                    <div className={clsx("absolute top-1 w-2 h-2 bg-white rounded-full transition-all", active ? "left-5" : "left-1")} />
                </div>
            </div>
        </div>
    );
}
