import { useCallback, useState } from 'react';
import { Upload, File, X, FileImage } from 'lucide-react';
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
        <div className="w-full">
            <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={clsx(
                    "relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 ease-in-out text-center cursor-pointer overflow-hidden",
                    isDragging ? "border-primary bg-primary/5 scale-[1.01]" : "border-border bg-bg-card hover:border-primary/50"
                )}
            >
                <input
                    type="file"
                    multiple
                    onChange={onFileInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />

                <div className="flex flex-col items-center gap-3">
                    <div className={clsx(
                        "p-3 rounded-full transition-colors",
                        isDragging ? "bg-primary text-white" : "bg-bg-app text-primary"
                    )}>
                        <Upload size={24} />
                    </div>
                    <div>
                        <p className="font-semibold text-lg">Click to browse or drag files here</p>
                        <p className="text-sm text-muted-foreground mt-1">PDF, JPG, PNG up to 10MB</p>
                    </div>
                </div>
            </div>

            <div className="mt-6 space-y-3">
                <AnimatePresence>
                    {currentOrder.files.map((file) => (
                        <motion.div
                            key={file.id}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex items-center gap-4 p-3 rounded-lg bg-bg-card border border-border group"
                        >
                            <div className="p-2 rounded-md bg-primary/10 text-primary">
                                {file.type.startsWith('image/') ? <FileImage size={20} /> : <File size={20} />}
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{file.name}</p>
                                <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>

                            <button
                                onClick={() => removeFile(file.id)}
                                className="p-1.5 rounded-full hover:bg-error/10 hover:text-error text-muted-foreground transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
