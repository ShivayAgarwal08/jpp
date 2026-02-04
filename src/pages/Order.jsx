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
  Smartphone,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  FileText
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
            setDebugError(`Connection Error: ${e.message}`);
        } finally {
            setIsProcessing(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [step]);

    if (step === 3 && completedOrder) {
        return (
            <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-6 text-center font-sans selection:bg-amber-100">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-24 h-24 bg-green-500 rounded-3xl flex items-center justify-center text-white mb-8 shadow-xl"
                >
                    <CheckCircle2 size={48} strokeWidth={2.5} />
                </motion.div>

                <div className="max-w-md w-full">
                  <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">Order Confirmed!</h2>
                  <p className="text-neutral-500 font-medium mb-10">Your documents are now in the shop queue for printing.</p>

                  <div className="bg-white border border-neutral-200 rounded-[32px] p-10 shadow-sm mb-10 relative overflow-hidden">
                      <div className="relative z-10">
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-4">Pickup Code (OTP)</p>
                        <div className="text-6xl font-bold text-neutral-900 tracking-widest flex gap-2 justify-center italic">
                            {completedOrder.otp}
                        </div>
                        <p className="text-xs text-neutral-400 font-medium mt-6">Show this code at the counter to collect your order.</p>
                      </div>
                  </div>

                  <button 
                    onClick={() => navigate('/home')}
                    className="w-full bg-neutral-900 text-white font-bold py-5 rounded-xl hover:bg-neutral-800 transition-all shadow-lg active:scale-95"
                  >
                    Back to Home
                  </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fafaf9] text-neutral-800 pb-40 font-sans selection:bg-amber-100">
            {/* Header */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-neutral-100 py-4">
              <div className="max-w-xl mx-auto px-6 flex items-center justify-between">
                <button onClick={() => step === 1 ? navigate('/home') : setStep(step - 1)} className="p-2 hover:bg-neutral-50 rounded-lg transition-colors text-neutral-500">
                    <ArrowLeft size={24} />
                </button>
                <div className="text-center">
                    <h1 className="font-bold text-neutral-900">{step === 1 ? 'Upload Documents' : 'Print Settings'}</h1>
                    <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-0.5">Step {step} of 2</p>
                </div>
                <div className="w-10" />
              </div>
            </nav>

            <div className="max-w-xl mx-auto px-6 pt-32">
                <AnimatePresence mode='wait'>
                    {step === 1 ? (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-8"
                        >
                            <label className="relative group block w-full bg-white rounded-[32px] p-12 text-center border-2 border-dashed border-neutral-200 hover:border-amber-600 transition-all cursor-pointer shadow-sm">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*,application/pdf"
                                    onChange={(e) => Array.from(e.target.files).forEach(addFile)}
                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                />
                                <div className="w-16 h-16 bg-neutral-50 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110">
                                    <Upload size={28} className="text-amber-600" />
                                </div>
                                <h3 className="font-bold text-xl mb-1 text-neutral-900">Upload Your Files</h3>
                                <p className="text-xs text-neutral-400 font-medium">PDf, JPEG, or PNG up to 50MB</p>
                            </label>

                            <div className="space-y-4">
                                {currentOrder.files.map((file) => (
                                    <motion.div 
                                      key={file.id} 
                                      layout
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-neutral-50 flex items-center justify-center text-neutral-700 shrink-0 border border-neutral-100">
                                                {file.type === 'stationery' ? <PenTool size={22} /> :
                                                    file.type.startsWith('image/') ? <FileImage size={22} /> : <FileText size={22} />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold truncate text-sm text-neutral-900">{file.name}</p>
                                                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-0.5">
                                                    {file.type === 'stationery' ? `Price: ₹${file.price}` : `${(file.size / 1024 / 1024).toFixed(2)} MB`}
                                                </p>
                                            </div>
                                            <button onClick={() => removeFile(file.id)} className="w-9 h-9 rounded-lg hover:bg-neutral-50 transition-all flex items-center justify-center text-neutral-300">
                                                <X size={18} />
                                            </button>
                                        </div>

                                        {file.type !== 'stationery' && (
                                            <div className="mt-4 flex items-center justify-between bg-neutral-50 px-4 py-2.5 rounded-xl">
                                                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Page Count</span>
                                                {file.pageCount === 0 ? (
                                                    <div className="flex items-center gap-2 text-amber-600 font-bold text-[10px] uppercase">
                                                        <Loader2 className="animate-spin" size={12} />
                                                        <span>Analyzing...</span>
                                                    </div>
                                                ) : (
                                                    <div className="font-bold text-xs text-neutral-900">
                                                        {file.pageCount || 1} <span className="text-neutral-400 ml-1">Pages</span>
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
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-8"
                        >
                            {!isAllStationery && (
                                <div className="bg-white p-8 rounded-[32px] border border-neutral-200 shadow-sm space-y-8">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                                            <Printer size={20} />
                                          </div>
                                          <span className="font-bold text-neutral-900">Print Color</span>
                                        </div>
                                        <div className="flex bg-neutral-100 p-1 rounded-xl">
                                            <button
                                                onClick={() => updateSettings('color', false)}
                                                className={clsx("px-5 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all", !currentOrder.settings.color ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-400 hover:text-neutral-600")}
                                            >B&W</button>
                                            <button
                                                onClick={() => updateSettings('color', true)}
                                                className={clsx("px-5 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all", currentOrder.settings.color ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-400 hover:text-neutral-600")}
                                            >Color</button>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                          <div className="w-10 h-10 rounded-xl bg-neutral-50 text-neutral-500 flex items-center justify-center border border-neutral-100">
                                            <FileText size={20} />
                                          </div>
                                          <span className="font-bold text-neutral-900">Sides</span>
                                        </div>
                                        <div className="flex bg-neutral-100 p-1 rounded-xl">
                                            <button
                                                onClick={() => updateSettings('doubleSided', false)}
                                                className={clsx("px-5 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all", !currentOrder.settings.doubleSided ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-400 hover:text-neutral-600")}
                                            >Single</button>
                                            <button
                                                onClick={() => updateSettings('doubleSided', true)}
                                                className={clsx("px-5 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all", currentOrder.settings.doubleSided ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-400 hover:text-neutral-600")}
                                            >Double</button>
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t border-neutral-100 flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                          <div className="w-10 h-10 rounded-xl bg-neutral-50 text-neutral-500 flex items-center justify-center border border-neutral-100">
                                            <Smartphone size={20} />
                                          </div>
                                          <span className="font-bold text-neutral-900">Total Copies</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => updateSettings('copies', Math.max(1, currentOrder.settings.copies - 1))}
                                                className="w-11 h-11 rounded-xl bg-neutral-50 flex items-center justify-center font-bold text-xl border border-neutral-100"
                                            >-</button>
                                            <span className="font-bold text-lg w-6 text-center tabular-nums">{currentOrder.settings.copies}</span>
                                            <button
                                                onClick={() => updateSettings('copies', Math.max(1, currentOrder.settings.copies + 1))}
                                                className="w-11 h-11 rounded-xl bg-neutral-50 flex items-center justify-center font-bold text-xl border border-neutral-100"
                                            >+</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Summary Card */}
                            <div className="bg-neutral-900 text-white p-10 rounded-[32px] shadow-lg relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 blur-[60px] rounded-full" />
                                <h3 className="font-bold text-[10px] uppercase tracking-widest text-amber-500 mb-8">Order Summary</h3>
                                
                                <div className="space-y-4 font-medium text-xs">
                                  <div className="flex justify-between items-center opacity-60">
                                      <span>Total Pages</span>
                                      <span>{currentOrder.files.reduce((acc, f) => acc + (f.pageCount || 1), 0)}</span>
                                  </div>
                                  <div className="flex justify-between items-center opacity-60">
                                      <span>Rate per Page</span>
                                      <span>₹{currentOrder.settings.color ? '10.00' : '2.00'}</span>
                                  </div>
                                  <div className="flex justify-between items-center opacity-60">
                                      <span>Copies</span>
                                      <span>x {currentOrder.settings.copies}</span>
                                  </div>
                                  <div className="h-px bg-white/10 my-6" />
                                  <div className="flex justify-between items-end">
                                      <div>
                                        <p className="text-[10px] font-bold text-amber-500 uppercase tracking-wider mb-2">Grand Total</p>
                                        <p className="text-4xl font-bold tracking-tight tabular-nums">₹{total}</p>
                                      </div>
                                      <div className="flex flex-col items-end gap-1.5 opacity-60 text-[9px] font-bold uppercase tracking-widest">
                                        <ShieldCheck size={20} className="text-amber-500" />
                                        Secure Payment
                                      </div>
                                  </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bottom Bar */}
            <div className="fixed bottom-0 left-0 w-full z-50 p-6 bg-gradient-to-t from-[#fafaf9] via-[#fafaf9]/90 to-transparent">
                <div className="max-w-xl mx-auto">
                    {step === 1 ? (
                        <button
                            onClick={handleNext}
                            disabled={!hasFiles}
                            className="w-full bg-neutral-900 text-white p-5 rounded-2xl font-bold flex items-center justify-between px-8 disabled:opacity-30 transition-all hover:bg-neutral-800 shadow-xl"
                        >
                            <span className="text-sm">{hasFiles ? `${currentOrder.files.length} Files Ready` : 'Ready to Print'}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs">Next Step</span>
                              <ChevronRight size={18} />
                            </div>
                        </button>
                    ) : (
                        <button
                            onClick={handlePay}
                            disabled={isProcessing}
                            className="w-full bg-amber-600 text-white p-5 rounded-2xl font-bold flex items-center justify-between px-8 disabled:opacity-50 transition-all hover:bg-amber-700 shadow-xl"
                        >
                            <span className="text-lg">₹{total}</span>
                            <span className="flex items-center gap-2">
                                {isProcessing ? (
                                  <>
                                    <span className="text-sm">Processing...</span>
                                    <Loader2 className="animate-spin" size={18} />
                                  </>
                                ) : (
                                  <>
                                    <span className="text-sm">Place Order</span>
                                    <ChevronRight size={18} />
                                  </>
                                )}
                            </span>
                        </button>
                    )}
                </div>
            </div>

            {/* Error Overlay */}
            <AnimatePresence>
                {debugError && (
                    <motion.div 
                      className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-md flex items-center justify-center p-8"
                    >
                        <div className="max-w-md w-full text-center">
                            <div className="w-20 h-20 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-red-100">
                              <AlertCircle size={40} />
                            </div>
                            <h3 className="text-neutral-900 font-bold text-2xl mb-4">Something went wrong</h3>
                            <pre className="text-xs bg-neutral-100 p-4 rounded-xl text-neutral-500 mb-8 whitespace-pre-wrap font-mono">
                                {debugError}
                            </pre>
                            <button
                                onClick={() => setDebugError(null)}
                                className="w-full bg-neutral-900 text-white py-4 rounded-xl font-bold hover:bg-neutral-800 transition-all"
                            >
                                Try Again
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
