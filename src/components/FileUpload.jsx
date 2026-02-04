import { useCallback, useState } from 'react';
import { Upload, File, X, FileImage, Sparkles, ChevronRight, Check } from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

export default function FileUpload() {
    const { addFile, removeFile, currentOrder } = useOrder();
    const [isDragging, setIsDragging] = useState(false);

    const onDragOver = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const onDragLeave = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const onDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            Array.from(e.dataTransfer.files).forEach(file => addFile(file));
        }
    }, [addFile]);

    const onFileInput = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            Array.from(e.target.files).forEach(file => addFile(file));
        }
    };

    return (
        <div className="w-full space-y-8">
            <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={clsx(
                    "relative border-2 border-dashed rounded-[40px] p-12 transition-all duration-500 ease-out text-center cursor-pointer overflow-hidden",
                    isDragging 
                        ? "border-orange-500 bg-orange-500/5 scale-[1.02] shadow-[0_40px_80px_-20px_rgba(249,115,22,0.1)]" 
                        : "border-black/5 bg-white hover:border-orange-500/30 hover:shadow-premium"
                )}
            >
                <input
                    type="file"
                    multiple
                    onChange={onFileInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />

                <div className="flex flex-col items-center gap-6">
                    <div className={clsx(
                        "w-20 h-20 rounded-[28px] flex items-center justify-center transition-all duration-500 shadow-xl",
                        isDragging ? "bg-orange-500 text-white rotate-12" : "bg-black text-white group-hover:bg-orange-500"
                    )}>
                        <Upload size={32} />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-black tracking-tighter uppercase text-black">ASSET INGESTION.</h3>
                        <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em]">Drag files or click to initialize</p>
                    </div>
                    
                    <div className="flex gap-3 pt-2">
                        {['PDF', 'JPG', 'PNG'].map(type => (
                            <span key={type} className="px-3 py-1 bg-neutral-50 border border-black/5 rounded-full text-[8px] font-black text-neutral-400 uppercase tracking-widest">{type}</span>
                        ))}
                    </div>
                </div>

                {/* Background Fluidics */}
                <div className={clsx(
                    "absolute inset-0 pointer-events-none transition-opacity duration-1000",
                    isDragging ? "opacity-100" : "opacity-0"
                )}>
                   <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-3xl animate-pulse" />
                   <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 blur-3xl" />
                </div>
            </div>

            <div className="space-y-4">
                <AnimatePresence mode='popLayout'>
                    {currentOrder.files.map((file) => (
                        <motion.div
                            key={file.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex items-center gap-5 p-5 rounded-[28px] bg-white border border-black/5 group hover:border-orange-500/20 shadow-sm hover:shadow-premium transition-all"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-orange-500/5 text-orange-500 flex items-center justify-center border border-orange-500/10 shadow-sm shrink-0 group-hover:scale-110 transition-transform">
                                {file.type.startsWith('image/') ? <FileImage size={24} /> : <File size={24} />}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3">
                                    <p className="font-black text-sm text-black uppercase tracking-tight truncate">{file.name}</p>
                                    <div className="p-1 rounded-full bg-green-500/10 text-green-500">
                                        <Check size={10} strokeWidth={4} />
                                    </div>
                                </div>
                                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-1">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB • READY FOR LAB
                                </p>
                            </div>

                            <button
                                onClick={() => removeFile(file.id)}
                                className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center hover:bg-black hover:text-white text-neutral-300 transition-all border border-black/5 shadow-sm"
                            >
                                <X size={18} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
                
                {currentOrder.files.length > 0 && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-center gap-2 py-4"
                    >
                        <Sparkles size={14} className="text-orange-500" />
                        <span className="text-[9px] font-black text-neutral-400 uppercase tracking-[0.4em]">Batch Synchronized ({currentOrder.files.length} Assets)</span>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
