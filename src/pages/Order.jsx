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
    Zap,
    ShieldCheck,
    AlertCircle,
    Copy,
    Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
            alert("Error: Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [step]);

    if (step === 3 && completedOrder) {
        return (
            <div className="min-h-screen bg-[#FDFDFF] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden selection:bg-blue-600/10">
                {/* Ambient Background */}
                <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />

                <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 15, stiffness: 200 }}
                    className="w-32 h-32 bg-blue-600 rounded-[2.5rem] flex items-center justify-center text-white mb-10 shadow-[0_30px_60px_-15px_rgba(37,99,235,0.4)]"
                >
                    <Check size={56} strokeWidth={4} />
                </motion.div>

                <h2 className="text-5xl font-black text-gray-950 mb-3 tracking-tighter">Order Success.</h2>
                <p className="text-gray-500 font-bold text-lg mb-16 max-w-sm mx-auto leading-relaxed">Your documents are being sent to the printer.</p>

                <div className="bg-white rounded-[3.5rem] p-12 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)] border border-gray-100 w-full max-w-md mb-16 relative overflow-hidden group">
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6">OTP Code</div>
                    <div className="text-7xl font-black text-gray-950 tracking-[0.1em] mb-6 font-mono rotate-2 group-hover:rotate-0 transition-transform duration-500">{completedOrder.otp}</div>
                    <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-600 px-5 py-2 rounded-full border border-blue-600/20 text-xs font-black uppercase tracking-widest">
                        <Sparkles size={14} /> Show at Shop
                    </div>
                </div>

                <div className="flex flex-col gap-5 w-full max-w-md relative z-10">
                    <button
                        onClick={() => navigate('/orders')}
                        className="w-full bg-black text-white font-black py-6 rounded-3xl text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-black/10 flex items-center justify-center gap-3"
                    >
                        Track Order <ArrowRight size={22} />
                    </button>
                    <button
                        onClick={() => navigate('/home')}
                        className="text-gray-400 font-black text-xs uppercase tracking-widest hover:text-black transition-colors"
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFDFF] pb-40 font-sans selection:bg-blue-600/10 transition-all duration-500 overflow-x-hidden">

            {/* Ambient Background Blobs */}
            <div className="fixed top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-blue-600/5 blur-[120px] -z-0 pointer-events-none" />
            <div className="fixed bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] rounded-full bg-purple-600/5 blur-[120px] -z-0 pointer-events-none" />

            {/* Premium Step Header */}
            <header className="bg-white/40 backdrop-blur-3xl sticky top-0 z-40 px-6 h-24 border-b border-gray-100/50 flex items-center justify-between">
                <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => step === 1 ? navigate('/home') : setStep(1)}
                            className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-500 hover:text-black transition-all shadow-sm"
                        >
                            <ArrowLeft size={24} />
                        </motion.button>
                        <div>
                            <h1 className="font-black text-2xl tracking-tighter">{step === 1 ? 'Configure' : 'Finalize'}</h1>
                            <div className="flex items-center gap-2 mt-1.5">
                                {[1, 2].map((s) => (
                                    <div
                                        key={s}
                                        className={clsx(
                                            "h-1.5 rounded-full transition-all duration-700",
                                            step >= s ? "bg-blue-600 w-10 shadow-[0_0_10px_rgba(37,99,235,0.4)]" : "bg-gray-200 w-4"
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
                            className="bg-black text-white px-5 py-2 rounded-2xl text-xs font-black tracking-widest shadow-2xl shadow-black/10 flex items-center gap-2"
                        >
                            <Sparkles size={14} /> {currentOrder.files.length} FILES
                        </motion.div>
                    )}
                </div>
            </header>

            <div className="max-w-2xl mx-auto p-6 pt-12 relative z-10">
                <AnimatePresence mode='wait'>
                    {step === 1 ? (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
                            className="space-y-12"
                        >
                            {/* Pro Upload Zone */}
                            <div className="relative group overflow-hidden rounded-[3rem]">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*,application/pdf"
                                    onChange={(e) => Array.from(e.target.files).forEach(addFile)}
                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                />
                                <div className="border-2 border-dashed border-gray-200 bg-white/50 backdrop-blur-xl rounded-[3rem] p-20 text-center transition-all duration-700 group-hover:border-blue-600/30 group-hover:bg-blue-600/[0.03] group-hover:scale-[1.01] relative">
                                    <div className="w-24 h-24 bg-gray-50 rounded-[2.25rem] flex items-center justify-center mx-auto mb-8 text-gray-400 group-hover:scale-110 group-hover:text-blue-600 group-hover:bg-blue-600/10 group-hover:rotate-6 transition-all duration-700 shadow-xl shadow-black/[0.02]">
                                        <Upload size={40} />
                                    </div>
                                    <h3 className="font-black text-3xl mb-3 tracking-tighter">Upload Files.</h3>
                                    <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">PDF or Images</p>

                                    <div className="absolute inset-0 pointer-events-none border-2 border-blue-600/0 group-hover:border-blue-600/20 rounded-[3rem] transition-all duration-700 animate-pulse-soft" />
                                </div>
                            </div>

                            {/* Elevated Asset List */}
                            <motion.div layout className="space-y-5">
                                <AnimatePresence mode='popLayout'>
                                    {currentOrder.files.map((file, idx) => (
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                            transition={{ delay: idx * 0.05 }}
                                            key={file.id}
                                            className="bg-white p-6 sm:p-8 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.03)] border border-gray-100 flex items-center gap-5 sm:gap-8 group hover:border-blue-600/10 transition-all duration-500"
                                        >
                                            <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white transition-all duration-700 shrink-0 shadow-inner group-hover:rotate-6">
                                                {file.type === 'stationery' ? <PenTool size={32} /> :
                                                    file.type.startsWith('image/') ? <FileImage size={32} /> : <FileText size={32} />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-black truncate text-lg tracking-tight text-gray-950">{file.name}</p>
                                                <div className="flex items-center gap-4 mt-2">
                                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                                                        {file.type === 'stationery' ? `₹${file.price}` : `${(file.size / 1024 / 1024).toFixed(2)} MB`}
                                                    </span>
                                                    {file.pageCount > 0 && (
                                                        <span className="bg-blue-600/5 text-blue-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-blue-600/10">
                                                            {file.pageCount} Pages
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <motion.button
                                                whileHover={{ scale: 1.1, rotate: 90 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => removeFile(file.id)}
                                                className="w-12 h-12 rounded-2xl flex items-center justify-center text-gray-300 hover:bg-red-50 hover:text-red-500 transition-all shadow-sm"
                                            >
                                                <X size={24} />
                                            </motion.button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>

                            {/* Elite Configurator */}
                            <AnimatePresence>
                                {hasFiles && !isAllStationery && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-black rounded-[3.5rem] p-12 text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-white/5"
                                    >
                                        <div className="relative z-10">
                                            <div className="flex items-center justify-between mb-12">
                                                <h3 className="text-2xl font-black flex items-center gap-3 tracking-tighter">
                                                    <Zap size={24} className="text-blue-500 fill-current" /> Print Settings
                                                </h3>
                                                <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">Hardware Active</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-8">
                                                <SettingToggle
                                                    label="Color"
                                                    active={currentOrder.settings.color}
                                                    onClick={() => updateSettings('color', !currentOrder.settings.color)}
                                                    onLabel="Full Color"
                                                    offLabel="Black & White"
                                                />
                                                <SettingToggle
                                                    label="Print Type"
                                                    active={currentOrder.settings.doubleSided}
                                                    onClick={() => updateSettings('doubleSided', !currentOrder.settings.doubleSided)}
                                                    onLabel="Double Sided"
                                                    offLabel="Single Sided"
                                                />
                                            </div>
                                            <div className="mt-12 pt-12 border-t border-white/5 flex items-center justify-between">
                                                <div className="space-y-1">
                                                    <p className="text-xs font-black text-white uppercase tracking-[0.2em]">Quantity</p>
                                                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Number of copies</p>
                                                </div>
                                                <div className="flex items-center gap-10 bg-white/5 p-3 rounded-3xl border border-white/10 shadow-inner">
                                                    <button onClick={() => updateSettings('copies', Math.max(1, currentOrder.settings.copies - 1))} className="w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-colors font-black text-2xl text-blue-500 active:scale-90">-</button>
                                                    <span className="font-black text-4xl w-10 text-center tracking-tighter">{currentOrder.settings.copies}</span>
                                                    <button onClick={() => updateSettings('copies', currentOrder.settings.copies + 1)} className="w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-colors font-black text-2xl text-blue-500 active:scale-90">+</button>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Decorative Background */}
                                        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] -mr-40 -mt-40 pointer-events-none" />
                                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-600/10 rounded-full blur-[80px] -ml-24 -mb-24 pointer-events-none" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            className="space-y-12"
                        >
                            {/* Pro Review Card */}
                            <div className="bg-white rounded-[3.5rem] p-12 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col gap-10">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-3xl font-black tracking-tighter">Order Summary.</h3>
                                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                                        <ShieldCheck size={24} />
                                    </div>
                                </div>
                                <div className="space-y-8">
                                    <SummaryLine label="Total Files" value={`${currentOrder.files.length} Files`} />
                                    {!isAllStationery && (
                                        <>
                                            <SummaryLine label="Total Pages" value={`${currentOrder.files.reduce((acc, f) => acc + (f.pageCount || 1), 0)} Pages`} />
                                            <SummaryLine label="Color Mode" value={currentOrder.settings.color ? 'Full Color' : 'Black & White'} />
                                            <SummaryLine label="Copies" value={`${currentOrder.settings.copies}x`} />
                                        </>
                                    )}
                                    <div className="h-px bg-gray-100/50" />
                                    <div className="flex justify-between items-center">
                                        <div className="space-y-1">
                                            <p className="text-3xl font-black tracking-tighter italic text-gray-950">Grand Total</p>
                                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest pl-1">All protocols included</p>
                                        </div>
                                        <span className="text-6xl font-black text-blue-600 tracking-tighter italic">₹{total}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Secure Terminal Card */}
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                className="bg-black rounded-[3.5rem] p-12 text-white relative overflow-hidden shadow-2xl border border-white/5"
                            >
                                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-10">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 text-white/30 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                                            <CreditCard size={18} /> UPI Payment
                                        </div>
                                        <h3 className="text-3xl font-black mb-4 tracking-tighter italic">Online Pay.</h3>
                                        <p className="text-white/40 text-sm font-bold leading-relaxed max-w-[280px]">Instant payment via Jaypee Credit or any UPI app.</p>
                                    </div>
                                    <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl shrink-0 group hover:rotate-6 transition-transform">
                                        <Zap size={48} className="text-blue-600 fill-current group-hover:scale-110 transition-transform" />
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
                            </motion.div>

                            <div className="flex items-start gap-5 p-8 bg-blue-600/[0.03] rounded-[2.5rem] border border-blue-600/10 shadow-sm shadow-blue-600/5">
                                <AlertCircle size={24} className="text-blue-600 shrink-0 mt-0.5 animate-pulse" />
                                <div className="space-y-1">
                                    <p className="text-[10px] text-blue-600 font-black uppercase tracking-[0.2em]">Important Note</p>
                                    <p className="text-xs text-gray-500 font-bold leading-relaxed italic">
                                        Orders cannot be cancelled once they are sent to the printer. Please confirm settings.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Floating Operations Bar */}
            <div className="fixed bottom-10 left-6 right-6 z-50">
                <div className="max-w-2xl mx-auto">
                    {step === 1 ? (
                        <motion.button
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={handleNext}
                            disabled={!hasFiles}
                            className="w-full bg-black text-white h-24 rounded-[2.5rem] font-black text-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] disabled:opacity-10 disabled:grayscale flex items-center justify-between px-12 hover:bg-gray-900 active:scale-[0.98] transition-all group border border-white/5"
                        >
                            <span className="italic tracking-tighter">Review Order</span>
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 group-hover:opacity-100 transition-opacity">Proceed</span>
                                <ChevronRight size={32} className="group-hover:translate-x-2 transition-transform" />
                            </div>
                        </motion.button>
                    ) : (
                        <motion.button
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={handlePay}
                            disabled={isProcessing}
                            className="w-full bg-blue-600 text-white h-24 rounded-[2.5rem] font-black text-2xl shadow-[0_30px_60px_-15px_rgba(37,99,235,0.4)] flex items-center justify-between px-12 disabled:opacity-70 active:scale-[0.98] transition-all relative overflow-hidden group border border-blue-400/20"
                        >
                            <div className="relative z-10 flex flex-col items-start leading-none gap-1">
                                <span className="text-[10px] opacity-40 font-black tracking-[0.3em] uppercase">Authorize</span>
                                <span className="italic tracking-tighter">₹{total}</span>
                            </div>
                            <div className="relative z-10 flex items-center gap-5">
                                <span className="text-[11px] font-black uppercase tracking-[0.3em] italic">
                                    {isProcessing ? 'PROCESSING...' : 'PLACE ORDER'}
                                </span>
                                {isProcessing ? <Loader2 className="animate-spin" size={32} /> : <ChevronRight size={32} className="group-hover:translate-x-2 transition-transform" />}
                            </div>
                            {/* Dynamic engine bar */}
                            {isProcessing && (
                                <motion.div
                                    className="absolute bottom-0 left-0 h-full bg-white/10"
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 3 }}
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
        <div className="flex justify-between items-center group">
            <span className="text-gray-400 font-black text-[10px] uppercase tracking-[0.2em] group-hover:text-gray-900 transition-colors">{label}</span>
            <span className="font-black text-gray-950 text-xl tracking-tighter italic">{value}</span>
        </div>
    );
}

function SettingToggle({ label, active, onClick, onLabel, offLabel }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className="cursor-pointer bg-white/5 border border-white/10 rounded-[2rem] p-8 flex flex-col gap-5 hover:bg-white/10 transition-all duration-500 shadow-inner group"
        >
            <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] group-hover:text-blue-500 transition-colors">{label}</span>
            <div className="flex items-center justify-between">
                <span className={clsx("font-black text-sm tracking-tighter uppercase italic transition-all duration-500", active ? "text-blue-500 shadow-blue-500/50" : "text-white/60")}>
                    {active ? onLabel : offLabel}
                </span>
                <div className={clsx("w-12 h-6 rounded-full relative transition-all duration-700", active ? "bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.6)]" : "bg-white/10")}>
                    <motion.div
                        animate={{ x: active ? 24 : 4 }}
                        className="absolute top-1.5 w-3 h-3 bg-white rounded-full transition-all shadow-xl"
                    />
                </div>
            </div>
        </motion.div>
    );
}
