import { useState } from 'react';
import { Star, Send, Heart, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from './Toast';
import clsx from 'clsx';

export default function FeedbackForm() {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { addToast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            addToast('Please assign a rating level', 'error');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('https://sheetdb.io/api/v1/n484xera5odpb', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: [
                        {
                            rating: rating,
                            feedback: feedback,
                            timestamp: new Date().toISOString()
                        }
                    ]
                })
            });

            if (response.ok) {
                addToast('Experience Logged. Thank you.', 'success');
                setRating(0);
                setFeedback('');
            } else {
                throw new Error('Terminal Feedback Link Offline');
            }
        } catch (error) {
            console.error('Feedback error:', error);
            addToast('Uplink Failed: Offline Mode', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[3rem] p-10 shadow-2xl shadow-black/[0.03] border border-gray-100 relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-orange-500/10 transition-colors" />

            <div className="flex items-center gap-4 mb-10 relative z-10">
                <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center shadow-inner">
                    <Heart size={28} className="fill-orange-500/20" />
                </div>
                <div>
                    <h3 className="text-2xl font-black tracking-tighter">Experience Log.</h3>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em] mt-1">Quality Control Sync</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                <div className="space-y-4 text-center">
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.4em] mb-6">Service Rating Level</p>
                    <div className="flex justify-center gap-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <motion.button
                                key={star}
                                type="button"
                                whileHover={{ scale: 1.2, rotate: 10 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setRating(star)}
                                className="focus:outline-none transition-all"
                            >
                                <Star
                                    size={44}
                                    className={clsx(
                                        "transition-all duration-500 drop-shadow-xl",
                                        star <= rating
                                            ? 'text-orange-500 fill-orange-500 scale-110'
                                            : 'text-gray-100 fill-gray-50'
                                    )}
                                />
                            </motion.button>
                        ))}
                    </div>
                </div>

                <div className="relative group">
                    <div className="absolute left-6 top-6 text-gray-300 group-focus-within:text-orange-500 transition-colors">
                        <MessageSquare size={20} />
                    </div>
                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Transmission details (Optional)..."
                        rows="4"
                        className="w-full p-6 pl-16 bg-gray-50 border border-transparent rounded-[2rem] focus:bg-white focus:border-orange-500/20 outline-none transition-all resize-none text-base font-bold text-gray-950 placeholder:text-gray-300 placeholder:italic"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white py-6 rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:bg-orange-600 transition-all shadow-2xl shadow-black/10 disabled:opacity-50 uppercase tracking-widest"
                >
                    {isSubmitting ? (
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-white rounded-full animate-ping" />
                            TRANSMITTING...
                        </div>
                    ) : (
                        <>
                            Commit Feedback <Send size={20} />
                        </>
                    )}
                </button>
            </form>
        </motion.div>
    );
}
