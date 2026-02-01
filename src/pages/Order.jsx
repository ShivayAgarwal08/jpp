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
        <div className="min-h-screen bg-[#FBFBFD] pb-32 font-sans selection:bg-primary/10 selection:text-primary">
            
            {/* Dynamic Step Header */}
            <header className="bg-white/60 backdrop-blur-xl sticky top-0 z-40 px-6 py-4 border-b border-gray-100/50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => step === 1 ? navigate('/home') : setStep(1)} 
                        className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </motion.button>
                    <div>
                        <h1 className="font-black text-xl tracking-tight">{step === 1 ? 'Configure' : 'Review'}</h1>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            {[1, 2].map((s) => (
                                <div 
                                    key={s} 
                                    className={clsx(
                                        "h-1 rounded-full transition-all duration-500",
                                        step >= s ? "bg-black w-6" : "bg-gray-200 w-3"
                                    )} 
                                />
                            ))}
                        </div>
                    </div>
                </div>
                {hasFiles && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-black text-white px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest shadow-lg shadow-black/10"
                    >
                        {currentOrder.files.length} ITEMS
                    </motion.div>
                )}
            </header>

            <div className="max-w-xl mx-auto p-6 pt-10">
                <AnimatePresence mode='wait'>
                    {step === 1 ? (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                            className="space-y-10"
                        >
                            {/* Dynamic Upload Zone */}
                            <div className="relative group overflow-hidden rounded-[2.5rem]">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*,application/pdf"
                                    onChange={(e) => Array.from(e.target.files).forEach(addFile)}
                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                />
                                <div className="border-2 border-dashed border-gray-100 bg-white rounded-[2.5rem] p-16 text-center transition-all duration-500 group-hover:border-primary/30 group-hover:bg-primary/[0.02] relative">
                                    <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-gray-400 group-hover:scale-110 group-hover:text-primary group-hover:bg-primary/10 transition-all duration-500 shadow-sm">
                                        <Upload size={36} />
                                    </div>
                                    <h3 className="font-black text-2xl mb-2 tracking-tight">Drop documents here</h3>
                                    <p className="text-sm text-gray-400 font-medium">PDF or Images • Up to 20MB</p>
                                    
                                    {/* Pulse effect */}
                                    <div className="absolute inset-0 pointer-events-none border-2 border-primary/0 group-hover:border-primary/20 rounded-[2.5rem] transition-all duration-700 animate-pulse-soft" />
                                </div>
                            </div>

                            {/* Staggered File List */}
                            <motion.div 
                                layout
                                className="space-y-4"
                            >
                                <AnimatePresence mode='popLayout'>
                                    {currentOrder.files.map((file, idx) => (
                                        <motion.div 
                                            layout
                                            initial={{ opacity: 0, scale: 0.8, y: 30 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                                            transition={{ delay: idx * 0.05 }}
                                            key={file.id} 
                                            className="bg-white p-4 sm:p-6 rounded-[2rem] shadow-sm border border-gray-100/50 flex items-center gap-3 sm:gap-5 group hover:border-gray-200 transition-all duration-300 hover:shadow-xl hover:shadow-black/[0.02]"
                                        >
                                            <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white transition-all duration-500 shrink-0">
                                                {file.type === 'stationery' ? <PenTool size={28} /> :
                                                    file.type.startsWith('image/') ? <FileImage size={28} /> : <FileText size={28} />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-black truncate text-base tracking-tight">{file.name}</p>
                                                <div className="flex items-center gap-3 mt-1.5">
                                                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                                                        {file.type === 'stationery' ? `₹${file.price}` : `${(file.size / 1024 / 1024).toFixed(2)} MB`}
                                                    </span>
                                                    {file.pageCount > 0 && (
                                                        <span className="bg-primary/5 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                                                            {file.pageCount} Pages
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <motion.button 
                                                whileHover={{ scale: 1.1, rotate: 90 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => removeFile(file.id)} 
                                                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-300 hover:bg-red-50 hover:text-red-500 transition-all"
                                            >
                                                <X size={20} />
                                            </motion.button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>

                            {/* Dynamic Settings Pane */}
                            <AnimatePresence>
                                {hasFiles && !isAllStationery && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-gray-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-black/20"
                                    >
                                        <div className="relative z-10">
                                            <h3 className="text-xl font-black mb-10 flex items-center gap-3">
                                                <Zap size={20} className="text-primary fill-current" /> Preferences
                                            </h3>
                                            <div className="grid grid-cols-2 gap-6">
                                                <SettingToggle 
                                                    label="Color Mode" 
                                                    active={currentOrder.settings.color} 
                                                    onClick={() => updateSettings('color', !currentOrder.settings.color)}
                                                    onLabel="Vibrant"
                                                    offLabel="Classic"
                                                />
                                                <SettingToggle 
                                                    label="Orientation" 
                                                    active={currentOrder.settings.doubleSided} 
                                                    onClick={() => updateSettings('doubleSided', !currentOrder.settings.doubleSided)}
                                                    onLabel="Double"
                                                    offLabel="Single"
                                                />
                                            </div>
                                            <div className="mt-10 pt-10 border-t border-white/5 flex items-center justify-between">
                                                <span className="text-xs font-black text-white/40 uppercase tracking-[0.2em]">Copies per file</span>
                                                <div className="flex items-center gap-8 bg-white/5 p-2 rounded-2xl border border-white/5">
                                                    <button onClick={() => updateSettings('copies', Math.max(1, currentOrder.settings.copies - 1))} className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors font-bold text-lg">-</button>
                                                    <span className="font-black text-2xl w-6 text-center">{currentOrder.settings.copies}</span>
                                                    <button onClick={() => updateSettings('copies', currentOrder.settings.copies + 1)} className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors font-bold text-lg">+</button>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Decorative Background */}
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />
                                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[60px] -ml-16 -mb-16 pointer-events-none" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-10"
                        >
                            {/* Summary Card Dynamic */}
                            <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-black/[0.02] border border-gray-100/50">
                                <h3 className="text-xl font-black mb-8 tracking-tight">Recap</h3>
                                <div className="space-y-6">
                                    <SummaryLine label="Selected Items" value={`${currentOrder.files.length} Files`} />
                                    {!isAllStationery && (
                                        <>
                                            <SummaryLine label="Total Pages" value={currentOrder.files.reduce((acc, f) => acc + (f.pageCount || 1), 0)} />
                                            <SummaryLine label="Color Quality" value={currentOrder.settings.color ? 'Full Vibrant' : 'Standard B&W'} />
                                            <SummaryLine label="Copies" value={`${currentOrder.settings.copies}x Each`} />
                                        </>
                                    )}
                                    <div className="h-px bg-gray-50 my-6" />
                                    <div className="flex justify-between items-center">
                                        <span className="text-2xl font-black tracking-tight">Final Amount</span>
                                        <div className="text-right">
                                            <span className="text-4xl font-black text-primary">₹{total}</span>
                                            <p className="text-[10px] text-gray-400 font-black uppercase mt-1">incl. taxes</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method - Deep Professional */}
                            <motion.div 
                                whileHover={{ scale: 1.01 }}
                                className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-blue-500/20"
                            >
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 text-white/50 text-[10px] font-black uppercase tracking-widest mb-6">
                                        <ShieldCheck size={16} /> Verified Security
                                    </div>
                                    <h3 className="text-2xl font-black mb-3">Campus Credit / UPI</h3>
                                    <p className="text-white/70 text-sm font-medium leading-relaxed max-w-[240px]">Instant verification using student ID or any UPI app.</p>
                                </div>
                                <CreditCard className="absolute bottom-[-30px] right-[-30px] text-white/10 rotate-[15deg]" size={180} />
                            </motion.div>

                            <div className="flex items-start gap-4 p-6 bg-primary/[0.03] rounded-3xl border border-primary/10">
                                <AlertCircle size={20} className="text-primary shrink-0 mt-0.5" />
                                <p className="text-xs text-primary/60 font-bold leading-relaxed uppercase tracking-wide">
                                    Orders sent to vendor cannot be cancelled once printing starts. Please double check settings.
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Premium Dynamic Bottom Bar */}
            <div className="fixed bottom-0 left-0 w-full glass border-t border-gray-100/50 p-6 z-50">
                <div className="max-w-xl mx-auto">
                    {step === 1 ? (
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={handleNext}
                            disabled={!hasFiles}
                            className="w-full bg-black text-white h-20 rounded-[2.25rem] font-black text-xl shadow-2xl shadow-black/20 disabled:opacity-20 disabled:shadow-none flex items-center justify-between px-12 hover:bg-gray-900 active:scale-[0.98] transition-all"
                        >
                            <span>Review</span>
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Proceed</span>
                                <ChevronRight size={24} />
                            </div>
                        </motion.button>
                    ) : (
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={handlePay}
                            disabled={isProcessing}
                            className="w-full bg-primary text-white h-20 rounded-[2.25rem] font-black text-xl shadow-2xl shadow-primary/30 flex items-center justify-between px-12 disabled:opacity-70 active:scale-[0.98] transition-all relative overflow-hidden group"
                        >
                            <div className="relative z-10 flex flex-col items-start leading-none">
                                <span className="text-[10px] opacity-50 font-black tracking-widest uppercase mb-1">Pay Now</span>
                                <span>₹{total}</span>
                            </div>
                            <div className="relative z-10 flex items-center gap-3">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                                    {isProcessing ? 'Verifying...' : 'Complete'}
                                </span>
                                {isProcessing ? <Loader2 className="animate-spin" size={24} /> : <ChevronRight size={24} />}
                            </div>
                            {/* Loading state bar */}
                            {isProcessing && (
                                <motion.div 
                                    className="absolute bottom-0 left-0 h-1 bg-white/30"
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 2 }}
                                />
                            )}
                        </motion.button>
                    )}
                </div>
            </div>
        </div>
    );
}

function SummaryLine({ label, value }) {
    return (
        <div className="flex justify-between items-center">
            <span className="text-gray-400 font-black text-[10px] uppercase tracking-widest">{label}</span>
            <span className="font-black text-gray-900 text-lg tracking-tight">{value}</span>
        </div>
    );
}

function SettingToggle({ label, active, onClick, onLabel, offLabel }) {
    return (
        <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick} 
            className="cursor-pointer bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col gap-4 hover:bg-white/10 transition-all duration-300"
        >
            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">{label}</span>
            <div className="flex items-center justify-between">
                <span className={clsx("font-black text-sm tracking-tight transition-colors", active ? "text-primary shadow-primary/50" : "text-white")}>
                    {active ? onLabel : offLabel}
                </span>
                <div className={clsx("w-10 h-5 rounded-full relative transition-colors duration-500", active ? "bg-primary shadow-lg shadow-primary/40" : "bg-white/10")}>
                    <motion.div 
                        animate={{ x: active ? 20 : 0 }}
                        className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-all shadow-sm"
                    />
                </div>
            </div>
        </motion.div>
    );
}
