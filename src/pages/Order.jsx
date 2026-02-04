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
  Sparkles,
  Zap,
  Target,
  ShieldCheck,
  Smartphone,
  CheckCircle2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useOrder } from '../context/OrderContext';
import { clsx } from 'clsx';

export default function Order() {
    const { currentOrder, addFile, removeFile, updateFilePageCount, updateSettings, calculateTotal, placeOrder } = useOrder();
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Upload, 2: Settings, 3: Success
    const [isProcessing, setIsProcessing] = useState(false);
    const [completedOrder, setCompletedOrder] = useState(null);
    const [debugError, setDebugError] = useState(null);

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
            } else {
                setDebugError(`Order failed: ${result?.error || "Unknown Error"}`);
            }
        } catch (e) {
            console.error(e);
            setDebugError(`CRITICAL ERROR: ${e.message}`);
        } finally {
            setIsProcessing(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [step]);

    if (step === 3 && completedOrder) {
        return (
            <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500 rounded-full blur-[150px]" />
                </div>

                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1, rotate: [0, 10, 0] }}
                    transition={{ type: "spring", damping: 15 }}
                    className="w-32 h-32 bg-green-500 rounded-[40px] flex items-center justify-center text-white mb-8 shadow-2xl shadow-green-500/40 relative z-10"
                >
                    <CheckCircle2 size={64} strokeWidth={2.5} />
                </motion.div>

                <motion.div
                   initial={{ y: 20, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.2 }}
                   className="relative z-10"
                >
                  <h2 className="text-4xl md:text-5xl font-black text-black dark:text-white mb-4 tracking-tighter">ORDER SECURED.</h2>
                  <p className="text-neutral-500 dark:text-neutral-400 font-bold mb-10 max-w-xs mx-auto">Take a screenshot or remember this code for pickup.</p>

                  <div className="bg-neutral-100 dark:bg-neutral-900 border border-black/5 dark:border-white/5 rounded-[48px] p-12 shadow-3xl mb-12 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] mb-4">VERIFICATION CODE</div>
                      <div className="text-7xl font-black text-black dark:text-white tracking-[0.1em] flex gap-2 justify-center drop-shadow-sm">
                        {completedOrder.otp.split('').map((char, i) => (
                          <motion.span 
                            key={i}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 + (i * 0.1) }}
                          >
                            {char}
                          </motion.span>
                        ))}
                      </div>
                  </div>

                  <button 
                    onClick={() => navigate('/home')}
                    className="w-full bg-black dark:bg-white text-white dark:text-black font-black py-5 rounded-[24px] text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/20"
                  >
                    RETURN TO DASHBOARD
                  </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500 pb-40">
            {/* Header */}
            <nav className="fixed top-0 left-0 w-full z-50 glass-morphism border-b border-black/5 dark:border-white/5 py-4">
              <div className="container max-w-2xl mx-auto px-6 flex items-center gap-6">
                <button onClick={() => step === 1 ? navigate('/home') : setStep(step - 1)} className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <div>
                    <h1 className="font-black text-xl tracking-tighter leading-none">{step === 1 ? 'UPLOAD ASSETS' : 'PRINT SPECS'}</h1>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="h-1 w-12 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-orange-500" 
                          animate={{ width: step === 1 ? '50%' : '100%' }}
                        />
                      </div>
                      <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest leading-none">PHASE {step}</span>
                    </div>
                </div>
              </div>
            </nav>

            <div className="container max-w-2xl mx-auto px-6 pt-28">
                <AnimatePresence mode='wait'>
                    {step === 1 ? (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8"
                        >
                            <div className="relative group overflow-hidden bg-neutral-100 dark:bg-neutral-900 rounded-[40px] p-12 text-center border-2 border-dashed border-black/5 dark:border-white/10 hover:border-orange-500/30 transition-all cursor-pointer">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*,application/pdf"
                                    onChange={(e) => Array.from(e.target.files).forEach(addFile)}
                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                />
                                <div className="relative z-10">
                                  <div className="w-20 h-20 bg-white dark:bg-black rounded-[24px] flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                      <Upload size={32} className="text-orange-500" />
                                  </div>
                                  <h3 className="font-black text-2xl tracking-tighter mb-2">DROP YOUR PROJECT.</h3>
                                  <p className="text-sm text-neutral-500 font-medium">PDf, JPEG, PNG • MAX 50MB</p>
                                </div>
                                <div className="absolute bottom-0 right-0 w-32 h-32 bg-orange-500/5 blur-3xl rounded-full" />
                            </div>

                            <div className="space-y-4">
                                {currentOrder.files.map((file) => (
                                    <motion.div 
                                      key={file.id} 
                                      layout
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      className="stunning-card bg-neutral-50 dark:bg-neutral-900/50 p-6 rounded-[32px] border border-black/5 dark:border-white/5"
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className="w-14 h-14 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-neutral-600 dark:text-neutral-400 shrink-0">
                                                {file.type === 'stationery' ? <PenTool size={24} /> :
                                                    file.type.startsWith('image/') ? <FileImage size={24} /> : <File size={24} />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-black truncate text-lg tracking-tight">{file.name}</p>
                                                <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                                                    {file.type === 'stationery' ? `UNIT COST: ₹${file.price}` : `${(file.size / 1024 / 1024).toFixed(2)} MB • READY`}
                                                </p>
                                            </div>
                                            <button onClick={() => removeFile(file.id)} className="w-10 h-10 rounded-full hover:bg-red-500/10 hover:text-red-500 transition-all flex items-center justify-center text-neutral-400">
                                                <X size={20} />
                                            </button>
                                        </div>

                                        {file.type !== 'stationery' && (
                                            <div className="mt-4 flex items-center justify-between bg-black/5 dark:bg-white/5 px-6 py-3 rounded-2xl">
                                                <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Calculated Volume</span>
                                                {file.pageCount === 0 ? (
                                                    <div className="flex items-center gap-2 text-orange-500 font-black text-[10px] uppercase tracking-widest">
                                                        <Loader2 className="animate-spin" size={14} />
                                                        <span>Analyzing...</span>
                                                    </div>
                                                ) : (
                                                    <div className="font-black text-sm tracking-tighter">
                                                        {file.pageCount || 1} <span className="text-[10px] text-neutral-400 ml-1">PAGES</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8"
                        >
                            {!isAllStationery && (
                                <div className="stunning-card bg-neutral-50 dark:bg-neutral-900/50 p-10 rounded-[40px] border border-black/5 dark:border-white/5 space-y-8">
                                    <div className="flex justify-between items-center group">
                                        <div className="flex items-center gap-4">
                                          <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
                                            <Zap size={20} />
                                          </div>
                                          <span className="font-black tracking-tight text-lg uppercase">Color Profile</span>
                                        </div>
                                        <div className="flex bg-neutral-200 dark:bg-neutral-800 p-1.5 rounded-2xl">
                                            <button
                                                onClick={() => updateSettings('color', false)}
                                                className={clsx("px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all", !currentOrder.settings.color ? "bg-white dark:bg-black shadow-xl" : "opacity-40 hover:opacity-100")}
                                            >MONO</button>
                                            <button
                                                onClick={() => updateSettings('color', true)}
                                                className={clsx("px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all", currentOrder.settings.color ? "bg-white dark:bg-black shadow-xl text-orange-500" : "opacity-40 hover:opacity-100")}
                                            >COLOR</button>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center group">
                                        <div className="flex items-center gap-4">
                                          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                                            <CreditCard size={20} />
                                          </div>
                                          <span className="font-black tracking-tight text-lg uppercase">Duplex Mode</span>
                                        </div>
                                        <div className="flex bg-neutral-200 dark:bg-neutral-800 p-1.5 rounded-2xl">
                                            <button
                                                onClick={() => updateSettings('doubleSided', false)}
                                                className={clsx("px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all", !currentOrder.settings.doubleSided ? "bg-white dark:bg-black shadow-xl" : "opacity-40 hover:opacity-100")}
                                            >SINGLE</button>
                                            <button
                                                onClick={() => updateSettings('doubleSided', true)}
                                                className={clsx("px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all", currentOrder.settings.doubleSided ? "bg-white dark:bg-black shadow-xl" : "opacity-40 hover:opacity-100")}
                                            >DOUBLE</button>
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                          <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center">
                                            <Target size={20} />
                                          </div>
                                          <span className="font-black tracking-tight text-lg uppercase">Volume</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => updateSettings('copies', Math.max(1, currentOrder.settings.copies - 1))}
                                                className="w-12 h-12 rounded-[18px] bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-black text-xl hover:scale-110 active:scale-90 transition-all"
                                            >-</button>
                                            <span className="font-black text-2xl w-8 text-center tabular-nums">{currentOrder.settings.copies}</span>
                                            <button
                                                onClick={() => updateSettings('copies', Math.max(1, currentOrder.settings.copies + 1))}
                                                className="w-12 h-12 rounded-[18px] bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-black text-xl hover:scale-110 active:scale-90 transition-all"
                                            >+</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Summary Card */}
                            <div className="stunning-card bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black p-10 rounded-[40px] shadow-3xl">
                                <h3 className="font-black text-[10px] uppercase tracking-[0.3em] opacity-40 mb-8 px-1">PRODUCTION SUMMARY</h3>
                                <div className="space-y-4 font-bold text-sm">
                                  <div className="flex justify-between items-center opacity-60">
                                      <span>Total Impressions</span>
                                      <span>{currentOrder.files.reduce((acc, f) => acc + (f.pageCount || 1), 0)}</span>
                                  </div>
                                  <div className="flex justify-between items-center opacity-60">
                                      <span>Rate Variable</span>
                                      <span>₹{currentOrder.settings.color ? '10.00' : '2.00'} / page</span>
                                  </div>
                                  <div className="flex justify-between items-center opacity-60">
                                      <span>Distribution Bulk</span>
                                      <span>x {currentOrder.settings.copies}</span>
                                  </div>
                                  <div className="h-px bg-white/10 dark:bg-black/10 my-6" />
                                  <div className="flex justify-between items-end">
                                      <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase opacity-40 leading-none mb-1">Total Payable</span>
                                        <span className="text-4xl font-black tracking-tighter tabular-nums leading-none">₹{total}</span>
                                      </div>
                                      <div className="flex gap-1">
                                        <ShieldCheck size={18} className="text-orange-500" />
                                        <span className="text-[8px] font-black uppercase tracking-widest max-w-[80px] leading-tight text-white/40 dark:text-black/40">Verified Safe Transaction</span>
                                      </div>
                                  </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Sticky Action Bar */}
            <div className="fixed bottom-0 left-0 w-full z-50 p-6">
                <div className="container max-w-2xl mx-auto flex gap-4">
                    {step === 1 ? (
                        <button
                            onClick={handleNext}
                            disabled={!hasFiles}
                            className="w-full bg-black dark:bg-white text-white dark:text-black p-6 rounded-[32px] font-black text-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] dark:shadow-[0_30px_60px_-15px_rgba(255,255,255,0.1)] disabled:opacity-20 disabled:scale-95 disabled:grayscale transition-all flex items-center justify-between px-10 group overflow-hidden"
                        >
                            <span className="relative z-10">{hasFiles ? `${currentOrder.files.length} ASSETS` : 'ADD ASSETS'}</span>
                            <div className="flex items-center gap-3 relative z-10">
                              <span className="font-black text-sm tracking-widest">CONFIGURE</span>
                              <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-10 transition-opacity" />
                        </button>
                    ) : (
                        <button
                            onClick={handlePay}
                            disabled={isProcessing}
                            className="w-full bg-orange-500 text-white p-6 rounded-[32px] font-black text-xl shadow-[0_30px_60px_-15px_rgba(249,115,22,0.4)] flex items-center justify-between px-10 disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98] transition-all group relative overflow-hidden"
                        >
                            <div className="flex flex-col items-start leading-none relative z-10">
                                <span className="text-[10px] opacity-40 font-black tracking-[0.2em] mb-1">AUTHORIZE</span>
                                <span className="tabular-nums">₹{total}</span>
                            </div>
                            <span className="flex items-center gap-4 relative z-10">
                                {isProcessing ? (
                                  <>
                                    <span className="text-sm font-black tracking-widest">PROCESSING</span>
                                    <Loader2 className="animate-spin" size={24} />
                                  </>
                                ) : (
                                  <>
                                    <span className="text-sm font-black tracking-widest uppercase">Pay & Print</span>
                                    <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                                  </>
                                )}
                            </span>
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    )}
                </div>
            </div>

            {/* Error Overlay */}
            <AnimatePresence>
                {debugError && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
                    >
                        <div className="max-w-md w-full text-center">
                            <div className="w-20 h-20 bg-red-500/20 text-red-500 rounded-[28px] flex items-center justify-center mx-auto mb-8">
                              <ShieldCheck size={40} />
                            </div>
                            <h3 className="text-white font-black text-3xl tracking-tighter mb-4 leading-none uppercase">AUTHENTICATION <br />FAILED.</h3>
                            <pre className="text-[10px] bg-white/5 border border-white/10 p-4 rounded-2xl text-white/50 mb-8 whitespace-pre-wrap font-mono uppercase tracking-widest max-h-40 overflow-auto">
                                {debugError}
                            </pre>
                            <button
                                onClick={() => setDebugError(null)}
                                className="w-full bg-white text-black py-5 rounded-[24px] font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all"
                            >
                                CLOSE & REINITIALIZE
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

