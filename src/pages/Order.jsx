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
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center overflow-hidden font-sans">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500 rounded-full blur-[150px]" />
                </div>

                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1, rotate: [0, 10, 0] }}
                    transition={{ type: "spring", damping: 15 }}
                    className="w-32 h-32 bg-orange-500 rounded-[40px] flex items-center justify-center text-white mb-10 shadow-3xl shadow-orange-500/20 relative z-10"
                >
                    <CheckCircle2 size={64} strokeWidth={2.5} />
                </motion.div>

                <motion.div
                   initial={{ y: 20, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.2 }}
                   className="relative z-10"
                >
                  <h2 className="text-5xl md:text-6xl font-black text-black mb-4 tracking-tighter uppercase">ORDER SECURED.</h2>
                  <p className="text-neutral-400 font-bold mb-12 max-w-xs mx-auto text-[10px] uppercase tracking-[0.2em]">Asset verification complete. Your order is now in the production queue.</p>

                  <div className="bg-white border border-black/5 rounded-[56px] p-16 shadow-premium mb-12 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/5 to-transparent transition-opacity" />
                      <div className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] mb-6">PRODUCTION OTP</div>
                      <div className="text-7xl md:text-8xl font-black text-black tracking-[0.1em] flex gap-3 justify-center">
                        {completedOrder.otp.split('').map((char, i) => (
                          <motion.span 
                            key={i}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 + (i * 0.1) }}
                            className="text-orange-500"
                          >
                            {char}
                          </motion.span>
                        ))}
                      </div>
                  </div>

                  <button 
                    onClick={() => navigate('/home')}
                    className="w-full bg-black text-white font-black py-6 rounded-[28px] text-xs uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl"
                  >
                    RETURN TO OPERATIONS
                  </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-black transition-colors duration-500 pb-40 font-sans">
            {/* Header */}
            <nav className="fixed top-0 left-0 w-full z-50 glass-morphism border-b border-black/5 py-4">
              <div className="container max-w-2xl mx-auto px-6 flex items-center gap-6">
                <button onClick={() => step === 1 ? navigate('/home') : setStep(step - 1)} className="p-2 hover:bg-black/5 rounded-xl transition-colors text-black">
                    <ArrowLeft size={24} />
                </button>
                <div>
                    <h1 className="font-black text-xl tracking-tighter leading-none uppercase">{step === 1 ? 'UPLOAD ASSETS' : 'SPECIFICATIONS'}</h1>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="h-1 w-12 bg-neutral-100 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-orange-500" 
                          animate={{ width: step === 1 ? '50%' : '100%' }}
                        />
                      </div>
                      <span className="text-[10px] text-neutral-400 font-black uppercase tracking-[0.3em] leading-none">PHASE {step}</span>
                    </div>
                </div>
              </div>
            </nav>

            <div className="container max-w-2xl mx-auto px-6 pt-32">
                <AnimatePresence mode='wait'>
                    {step === 1 ? (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-10"
                        >
                            <div className="relative group overflow-hidden bg-neutral-50 rounded-[48px] p-16 text-center border-2 border-dashed border-black/5 hover:border-orange-500/40 transition-all cursor-pointer">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*,application/pdf"
                                    onChange={(e) => Array.from(e.target.files).forEach(addFile)}
                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                />
                                <div className="relative z-10">
                                  <div className="w-24 h-24 bg-white rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border border-black/5">
                                      <Upload size={36} className="text-orange-500" />
                                  </div>
                                  <h3 className="font-black text-3xl tracking-tighter mb-3 uppercase">IMPORT ASSETS.</h3>
                                  <p className="text-[10px] text-neutral-400 font-black uppercase tracking-[0.2em]">PDf • JPEG • PNG • MAX 50MB</p>
                                </div>
                                <div className="absolute bottom-0 right-0 w-40 h-40 bg-orange-500/5 blur-3xl rounded-full" />
                            </div>

                            <div className="space-y-4">
                                {currentOrder.files.map((file) => (
                                    <motion.div 
                                      key={file.id} 
                                      layout
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      className="stunning-card bg-white p-6 rounded-[40px] border border-black/5 shadow-premium"
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 rounded-2xl bg-neutral-50 flex items-center justify-center text-black shrink-0 border border-black/5">
                                                {file.type === 'stationery' ? <PenTool size={28} /> :
                                                    file.type.startsWith('image/') ? <FileImage size={28} /> : <File size={28} />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-black truncate text-xl tracking-tighter uppercase text-black">{file.name}</p>
                                                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mt-1">
                                                    {file.type === 'stationery' ? `UNIT COST: ₹${file.price}` : `${(file.size / 1024 / 1024).toFixed(2)} MB • READY`}
                                                </p>
                                            </div>
                                            <button onClick={() => removeFile(file.id)} className="w-12 h-12 rounded-full hover:bg-black hover:text-white transition-all flex items-center justify-center text-neutral-300 border border-black/5">
                                                <X size={20} />
                                            </button>
                                        </div>

                                        {file.type !== 'stationery' && (
                                            <div className="mt-6 flex items-center justify-between bg-black/5 px-6 py-4 rounded-[24px]">
                                                <span className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em]">ANALYTICS VOLUME</span>
                                                {file.pageCount === 0 ? (
                                                    <div className="flex items-center gap-3 text-orange-500 font-black text-[10px] uppercase tracking-widest">
                                                        <Loader2 className="animate-spin" size={14} />
                                                        <span>SCANNING...</span>
                                                    </div>
                                                ) : (
                                                    <div className="font-black text-sm tracking-tighter text-black uppercase">
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
                            className="space-y-10"
                        >
                            {!isAllStationery && (
                                <div className="stunning-card bg-white p-12 rounded-[56px] border border-black/5 shadow-premium space-y-10">
                                    <div className="flex justify-between items-center group">
                                        <div className="flex items-center gap-5">
                                          <div className="w-12 h-12 rounded-2xl bg-orange-500/5 text-orange-500 flex items-center justify-center border border-orange-500/10">
                                            <Zap size={24} />
                                          </div>
                                          <span className="font-black tracking-tighter text-xl uppercase text-black">COLOR PROFILE</span>
                                        </div>
                                        <div className="flex bg-neutral-100 p-1.5 rounded-[24px]">
                                            <button
                                                onClick={() => updateSettings('color', false)}
                                                className={clsx("px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-[20px] transition-all", !currentOrder.settings.color ? "bg-black text-white shadow-2xl" : "text-neutral-400 hover:text-black")}
                                            >MONO</button>
                                            <button
                                                onClick={() => updateSettings('color', true)}
                                                className={clsx("px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-[20px] transition-all", currentOrder.settings.color ? "bg-black text-white shadow-2xl" : "text-neutral-400 hover:text-black")}
                                            >COLOR</button>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center group">
                                        <div className="flex items-center gap-5">
                                          <div className="w-12 h-12 rounded-2xl bg-black/5 text-black flex items-center justify-center border border-black/5">
                                            <CreditCard size={24} />
                                          </div>
                                          <span className="font-black tracking-tighter text-xl uppercase text-black">DUPLEX MODE</span>
                                        </div>
                                        <div className="flex bg-neutral-100 p-1.5 rounded-[24px]">
                                            <button
                                                onClick={() => updateSettings('doubleSided', false)}
                                                className={clsx("px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-[20px] transition-all", !currentOrder.settings.doubleSided ? "bg-black text-white shadow-2xl" : "text-neutral-400 hover:text-black")}
                                            >SINGLE</button>
                                            <button
                                                onClick={() => updateSettings('doubleSided', true)}
                                                className={clsx("px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-[20px] transition-all", currentOrder.settings.doubleSided ? "bg-black text-white shadow-2xl" : "text-neutral-400 hover:text-black")}
                                            >DOUBLE</button>
                                        </div>
                                    </div>

                                    <div className="pt-10 border-t border-black/5 flex justify-between items-center">
                                        <div className="flex items-center gap-5">
                                          <div className="w-12 h-12 rounded-2xl bg-black/5 text-black flex items-center justify-center border border-black/5">
                                            <Target size={24} />
                                          </div>
                                          <span className="font-black tracking-tighter text-xl uppercase text-black">TOTAL COPIES</span>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <button
                                                onClick={() => updateSettings('copies', Math.max(1, currentOrder.settings.copies - 1))}
                                                className="w-14 h-14 rounded-[24px] bg-neutral-100 flex items-center justify-center font-black text-2xl hover:bg-black hover:text-white transition-all shadow-sm"
                                            >-</button>
                                            <span className="font-black text-3xl w-10 text-center tabular-nums text-black">{currentOrder.settings.copies}</span>
                                            <button
                                                onClick={() => updateSettings('copies', Math.max(1, currentOrder.settings.copies + 1))}
                                                className="w-14 h-14 rounded-[24px] bg-neutral-100 flex items-center justify-center font-black text-2xl hover:bg-black hover:text-white transition-all shadow-sm"
                                            >+</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Summary Card */}
                            <div className="stunning-card bg-black text-white p-12 rounded-[56px] shadow-3xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[100px] rounded-full" />
                                <h3 className="font-black text-[10px] uppercase tracking-[0.4em] text-orange-500 mb-10">PRODUCTION SUMMARY</h3>
                                <div className="space-y-6 font-bold text-sm uppercase tracking-tight">
                                  <div className="flex justify-between items-center opacity-40">
                                      <span>TOTAL IMPRESSIONS</span>
                                      <span>{currentOrder.files.reduce((acc, f) => acc + (f.pageCount || 1), 0)}</span>
                                  </div>
                                  <div className="flex justify-between items-center opacity-40">
                                      <span>RATE VARIABLE</span>
                                      <span>₹{currentOrder.settings.color ? '10.00' : '2.00'} / PAGE</span>
                                  </div>
                                  <div className="flex justify-between items-center opacity-40">
                                      <span>BULK MULTIPLIER</span>
                                      <span>x {currentOrder.settings.copies}</span>
                                  </div>
                                  <div className="h-px bg-white/10 my-8" />
                                  <div className="flex justify-between items-center">
                                      <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 mb-2">Total Payable</span>
                                        <span className="text-5xl font-black tracking-tighter tabular-nums leading-none">₹{total}</span>
                                      </div>
                                      <div className="flex flex-col items-end gap-2">
                                        <ShieldCheck size={28} className="text-orange-500" />
                                        <span className="text-[8px] font-bold uppercase tracking-widest text-white/40 text-right">ENCRYPTED<br />GATEWAY</span>
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
                            className="w-full bg-black text-white p-8 rounded-[40px] font-black text-xl shadow-3xl disabled:opacity-20 transition-all flex items-center justify-between px-12 group overflow-hidden"
                        >
                            <span className="relative z-10 text-xs uppercase tracking-[0.2em]">{hasFiles ? `${currentOrder.files.length} ASSETS READY` : 'ADD ASSETS'}</span>
                            <div className="flex items-center gap-4 relative z-10">
                              <span className="font-black text-xs tracking-widest uppercase">CONFIGURE</span>
                              <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-10 transition-opacity" />
                        </button>
                    ) : (
                        <button
                            onClick={handlePay}
                            disabled={isProcessing}
                            className="w-full bg-orange-500 text-white p-8 rounded-[40px] font-black text-xl shadow-[0_40px_80px_-20px_rgba(249,115,22,0.4)] flex items-center justify-between px-12 disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98] transition-all group relative overflow-hidden"
                        >
                            <div className="flex flex-col items-start leading-none relative z-10">
                                <span className="text-[10px] font-black tracking-[0.3em] mb-2 uppercase opacity-60">AUTHORIZE</span>
                                <span className="text-2xl font-black tabular-nums">₹{total}</span>
                            </div>
                            <span className="flex items-center gap-4 relative z-10">
                                {isProcessing ? (
                                  <>
                                    <span className="text-xs font-black tracking-widest uppercase">PROCESSING</span>
                                    <Loader2 className="animate-spin" size={24} />
                                  </>
                                ) : (
                                  <>
                                    <span className="text-xs font-black tracking-widest uppercase">Pay & Print</span>
                                    <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                                  </>
                                )}
                            </span>
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
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
                      className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-3xl flex items-center justify-center p-8"
                    >
                        <div className="max-w-md w-full text-center">
                            <div className="w-24 h-24 bg-red-500/10 text-red-500 rounded-[32px] flex items-center justify-center mx-auto mb-10 shadow-xl border border-red-500/20">
                              <ShieldAlert size={48} />
                            </div>
                            <h3 className="text-black font-black text-4xl tracking-tighter mb-6 leading-none uppercase">TRANSACTION <br />ERROR.</h3>
                            <pre className="text-[10px] bg-black/5 border border-black/10 p-6 rounded-3xl text-neutral-500 mb-10 whitespace-pre-wrap font-mono uppercase tracking-[0.2em] max-h-40 overflow-auto leading-relaxed">
                                {debugError}
                            </pre>
                            <button
                                onClick={() => setDebugError(null)}
                                className="w-full bg-black text-white py-6 rounded-[28px] font-black uppercase tracking-[0.3em] text-[10px] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-3xl"
                            >
                                CLOSE & RETRY
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

