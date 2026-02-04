import { useCallback, useState } from 'react';
import { Upload, File, X, FileImage, Check, FileText } from 'lucide-react';
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
        <div className="w-full space-y-8 font-sans">
            <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={clsx(
                    "relative border-2 border-dashed rounded-[32px] p-12 transition-all duration-300 ease-out text-center cursor-pointer overflow-hidden",
                    isDragging 
                        ? "border-amber-500 bg-amber-50 shadow-lg" 
                        : "border-neutral-200 bg-white hover:border-amber-600 hover:shadow-sm"
                )}
            >
                <input
                    type="file"
                    multiple
                    onChange={onFileInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />

                <div className="flex flex-col items-center gap-5">
                    <div className={clsx(
                        "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm",
                        isDragging ? "bg-amber-600 text-white scale-110" : "bg-neutral-50 text-neutral-400 group-hover:bg-amber-500"
                    )}>
                        <Upload size={28} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-neutral-900">Upload Documents</h3>
                        <p className="text-xs font-medium text-neutral-400 mt-1">Drag and drop your files here, or click to browse</p>
                    </div>
                    
                    <div className="flex gap-2 pt-1">
                        {['PDF', 'DOCX', 'JPG', 'PNG'].map(type => (
                            <span key={type} className="px-3 py-1 bg-neutral-50 border border-neutral-100 rounded-lg text-[9px] font-bold text-neutral-400 uppercase tracking-widest">{type}</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <AnimatePresence mode='popLayout'>
                    {currentOrder.files.filter(f => f.type !== 'stationery').map((file) => (
                        <motion.div
                            key={file.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-neutral-200 group hover:border-amber-600/30 shadow-sm transition-all"
                        >
                            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 shrink-0">
                                {file.type.startsWith('image/') ? <FileImage size={20} /> : <FileText size={20} />}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <p className="font-bold text-sm text-neutral-900 truncate">{file.name}</p>
                                    <div className="p-0.5 rounded-full bg-green-50 text-green-600">
                                        <Check size={10} strokeWidth={4} />
                                    </div>
                                </div>
                                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mt-0.5">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB • Ready
                                </p>
                            </div>

                            <button
                                onClick={() => removeFile(file.id)}
                                className="w-8 h-8 rounded-lg bg-neutral-50 flex items-center justify-center hover:bg-neutral-100 text-neutral-300 transition-all border border-neutral-100"
                            >
                                <X size={16} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
                
                {currentOrder.files.length > 0 && (
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-[10px] font-bold text-neutral-400 uppercase tracking-widest pt-4"
                    >
                        {currentOrder.files.length} {currentOrder.files.length === 1 ? 'File' : 'Files'} selected
                    </motion.p>
                )}
            </div>
        </div>
    );
}
