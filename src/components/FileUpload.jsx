import { useCallback, useState } from 'react';
import { Upload, File, X, FileImage, Zap, Search } from 'lucide-react';
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
                    "relative border-[3px] border-dashed rounded-[2.5rem] p-12 transition-all duration-500 ease-out text-center cursor-pointer overflow-hidden group",
                    isDragging 
                        ? "border-primary bg-primary/5 scale-[1.02] shadow-2xl shadow-primary/10" 
                        : "border-border bg-app/50 hover:border-muted hover:bg-card hover:shadow-xl hover:shadow-black/5"
                )}
            >
                <input
                    type="file"
                    multiple
                    onChange={onFileInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />

                <div className="flex flex-col items-center gap-6 relative z-10">
                    <div className={clsx(
                        "w-20 h-20 rounded-[2rem] flex items-center justify-center transition-all duration-500 shadow-2xl",
                        isDragging ? "bg-primary text-white rotate-12" : "bg-card text-primary group-hover:bg-primary group-hover:text-white"
                    )}>
                        <Upload size={32} />
                    </div>
                    <div>
                        <p className="font-black text-2xl tracking-tight text-foreground">Release Assets Here.</p>
                        <p className="text-[10px] text-muted font-black uppercase tracking-[0.3em] mt-2">PDF • JPG • PNG up to 10MB</p>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-1000" />
            </div>

            <AnimatePresence mode="popLayout">
                {currentOrder.files.length > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center justify-between mb-4 ml-2">
                            <h3 className="text-xs font-black text-muted uppercase tracking-[0.3em]">Pending Processing</h3>
                            <span className="text-[10px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-widest">{currentOrder.files.length} Unit{currentOrder.files.length > 1 ? 's' : ''}</span>
                        </div>
                        
                        <div className="grid gap-4">
                            {currentOrder.files.map((file) => (
                                <motion.div
                                    key={file.id}
                                    layout
                                    initial={{ opacity: 0, x: -20, scale: 0.95 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                    className="flex items-center gap-6 p-5 rounded-[2rem] bg-card border border-border group shadow-sm hover:shadow-xl hover:border-primary/10 transition-all duration-500"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-app text-muted flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                                        {file.type.startsWith('image/') ? <FileImage size={24} /> : <File size={24} />}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className="font-black text-foreground truncate tracking-tight">{file.name}</p>
                                        <div className="flex items-center gap-3 mt-1">
                                            <p className="text-[10px] font-black text-muted uppercase tracking-widest">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                            <div className="w-1 h-1 bg-border rounded-full" />
                                            {file.pageCount && <p className="text-[10px] font-black text-primary uppercase tracking-widest">{file.pageCount} PG{file.pageCount > 1 ? 'S' : ''}</p>}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => removeFile(file.id)}
                                        className="w-10 h-10 rounded-xl bg-app text-muted/40 flex items-center justify-center hover:bg-red-500 hover:text-white hover:rotate-90 transition-all duration-500"
                                    >
                                        <X size={18} />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
