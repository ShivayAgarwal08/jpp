import { useState, useEffect } from 'react';
import { ArrowLeft, Check, ChevronRight, Loader2, Upload, File, X, FileImage, CreditCard, PenTool } from 'lucide-react';
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
    const [debugError, setDebugError] = useState(null); // New state for on-screen debugging

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
                alert(`Order failed: ${result?.error || "Please check if the Backend Server is running."}`);
            }
        } catch (e) {
            console.error(e);
            setDebugError(`CRITICAL ERROR: ${e.message}\n\nSTACK: ${e.stack}`);
            alert(`CRITICAL ERROR:\n\n${e.message}\n\nSee screen for details.`);
        } finally {
            setIsProcessing(false);
        }
    };

    // Auto-scroll to top on step change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [step]);

    if (step === 3 && completedOrder) {
        return (
            <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-6 text-center">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white mb-6 shadow-lg shadow-green-200"
                >
                    <Check size={48} strokeWidth={4} />
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Placed!</h2>
                <p className="text-gray-600 mb-8">Show this OTP at the counter.</p>

                <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 w-full max-w-sm mb-8">
                    <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Your OTP</div>
                    <div className="text-5xl font-mono font-bold text-gray-900 tracking-[0.2em]">{completedOrder.otp}</div>
                </div>

                <Link to="/" className="w-full max-w-xs bg-gray-900 text-white font-bold py-4 rounded-xl text-lg hover:bg-black transition-colors shadow-lg">
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-32">
            {/* Header */}
            <div className="bg-white sticky top-0 z-40 px-4 py-4 border-b border-gray-100 flex items-center gap-4">
                <button onClick={() => step === 1 ? navigate('/') : setStep(step - 1)} className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <div>
                    <h1 className="font-bold text-lg">{step === 1 ? 'Upload Files' : 'Print Settings'}</h1>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Step {step} of 2</p>
                </div>
            </div>

            <div className="container max-w-lg mx-auto p-4">
                <AnimatePresence mode='wait'>
                    {step === 1 ? (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="border-2 border-dashed border-primary/30 bg-primary/5 rounded-2xl p-8 text-center relative overflow-hidden group hover:bg-primary/10 transition-colors">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*,application/pdf"
                                    onChange={(e) => Array.from(e.target.files).forEach(addFile)}
                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                />
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-primary shadow-sm group-hover:scale-110 transition-transform">
                                    <Upload size={32} />
                                </div>
                                <h3 className="font-bold text-lg mb-1 text-gray-900">Tap to Upload</h3>
                                <p className="text-sm text-gray-500">PDF, JPG, PNG supported</p>
                            </div>

                            <div className="space-y-3">
                                {currentOrder.files.map((file) => (
                                    <div key={file.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-3">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                                                {file.type === 'stationery' ? <PenTool size={20} /> :
                                                    file.type.startsWith('image/') ? <FileImage size={20} /> : <File size={20} />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium truncate text-sm text-gray-900">{file.name}</p>
                                                <p className="text-xs text-gray-400">
                                                    {file.type === 'stationery' ? `₹${file.price}` : `${(file.size / 1024 / 1024).toFixed(2)} MB`}
                                                </p>
                                            </div>
                                            <button onClick={() => removeFile(file.id)} className="text-gray-400 hover:text-red-500 transition-colors p-2">
                                                <X size={20} />
                                            </button>
                                        </div>

                                        {/* Page Count Input */}
                                        {file.type !== 'stationery' && (
                                            <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg ml-14">
                                                <span className="text-xs font-bold text-gray-500 uppercase">Pages in file:</span>
                                                {file.pageCount === 0 ? (
                                                    <div className="flex items-center gap-2 text-blue-600">
                                                        <Loader2 className="animate-spin" size={16} />
                                                        <span className="text-xs font-bold">Scanning...</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-gray-900 text-sm bg-gray-100 px-3 py-1 rounded-md border border-gray-200">
                                                            {file.pageCount || 1}
                                                        </span>
                                                        <span className="text-[10px] uppercase font-bold text-gray-400">Pages detected</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {hasFiles && (
                                    <div className="text-center pt-2">
                                        <p className="text-xs text-gray-400">{currentOrder.files.length} items select</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-6"
                        >
                            {/* Settings Cards - Hide if only stationery */}
                            {!isAllStationery && (
                                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-gray-700">Color Mode</span>
                                        <div className="flex bg-gray-100 p-1 rounded-lg">
                                            <button
                                                onClick={() => updateSettings('color', false)}
                                                className={clsx("px-4 py-1.5 text-xs font-bold rounded-md transition-all", !currentOrder.settings.color ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700")}
                                            >B&W</button>
                                            <button
                                                onClick={() => updateSettings('color', true)}
                                                className={clsx("px-4 py-1.5 text-xs font-bold rounded-md transition-all", currentOrder.settings.color ? "bg-white shadow-sm text-purple-600" : "text-gray-500 hover:text-gray-700")}
                                            >Color</button>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-gray-700">Sides</span>
                                        <div className="flex bg-gray-100 p-1 rounded-lg">
                                            <button
                                                onClick={() => updateSettings('doubleSided', false)}
                                                className={clsx("px-4 py-1.5 text-xs font-bold rounded-md transition-all", !currentOrder.settings.doubleSided ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700")}
                                            >Single</button>
                                            <button
                                                onClick={() => updateSettings('doubleSided', true)}
                                                className={clsx("px-4 py-1.5 text-xs font-bold rounded-md transition-all", currentOrder.settings.doubleSided ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700")}
                                            >Double</button>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                                        <span className="font-medium text-gray-700">Copies</span>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => updateSettings('copies', Math.max(1, currentOrder.settings.copies - 1))}
                                                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-200 transition-colors"
                                            >-</button>
                                            <span className="font-bold w-6 text-center text-gray-900">{currentOrder.settings.copies}</span>
                                            <button
                                                onClick={() => updateSettings('copies', Math.max(1, currentOrder.settings.copies + 1))}
                                                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-200 transition-colors"
                                            >+</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Bill Details */}
                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 space-y-3">
                                <h3 className="font-bold text-sm text-gray-900">Bill Details</h3>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>Total Pages (All files)</span>
                                    <span>{currentOrder.files.reduce((acc, f) => acc + (f.pageCount || 1), 0)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>Rate per page</span>
                                    <span>₹{currentOrder.settings.color ? '10' : '2'}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>Copies</span>
                                    <span>{currentOrder.settings.copies}</span>
                                </div>
                                <div className="border-t border-dashed border-gray-200 my-2"></div>
                                <div className="flex justify-between font-bold text-lg text-gray-900">
                                    <span>To Pay</span>
                                    <span>₹{total}</span>
                                </div>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-xl flex items-center gap-3 text-blue-700 text-sm font-medium border border-blue-100">
                                <CreditCard size={20} className="shrink-0" />
                                <span className="text-xs">Secure Mock Payment Gateway. No real money is deducted.</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-4 pb-6 z-50">
                <div className="container max-w-lg mx-auto">
                    {step === 1 ? (
                        <button
                            onClick={handleNext}
                            disabled={!hasFiles}
                            className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 disabled:opacity-50 disabled:shadow-none flex items-center justify-between px-6 hover:scale-[1.01] active:scale-[0.99] transition-all"
                        >
                            <span>{hasFiles ? `${currentOrder.files.length} Files` : 'Select Files'}</span>
                            <span className="flex items-center gap-2">Next <ChevronRight size={20} /></span>
                        </button>
                    ) : (
                        <button
                            onClick={handlePay}
                            disabled={isProcessing}
                            className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-600/20 flex items-center justify-between px-6 disabled:opacity-70 hover:scale-[1.01] active:scale-[0.99] transition-all"
                        >
                            <div className="flex flex-col items-start leading-none">
                                <span className="text-[10px] opacity-80 font-bold tracking-wider">TOTAL</span>
                                <span>₹{total}</span>
                            </div>
                            <span className="flex items-center gap-2">
                                {isProcessing ? <Loader2 className="animate-spin" size={24} /> : 'Pay & Print'}
                                {!isProcessing && <ChevronRight size={20} />}
                            </span>
                        </button>
                    )}
                </div>
            </div>

            {/* Debug Overlay */}
            {debugError && (
                <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4">
                    <div className="bg-white p-6 rounded-xl max-w-lg w-full overflow-auto max-h-[80vh]">
                        <h3 className="text-red-600 font-bold text-xl mb-4">Debug Error</h3>
                        <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto whitespace-pre-wrap font-mono select-all">
                            {debugError}
                        </pre>
                        <button
                            onClick={() => setDebugError(null)}
                            className="mt-4 w-full bg-gray-900 text-white py-3 rounded-lg font-bold"
                        >
                            Close & Retry
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
