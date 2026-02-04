import { useState } from 'react';
import { Star, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from './Toast';

export default function FeedbackForm() {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { addToast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            addToast('Please select a star rating', 'error');
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
                addToast('Thank you for your feedback!', 'success');
                setRating(0);
                setFeedback('');
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to submit feedback');
            }
        } catch (error) {
            console.error('Feedback error:', error);
            addToast(error.message || 'Something went wrong. Please try again.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-[40px] p-10 shadow-premium border border-black/5 mb-10 font-sans">
            <div className="flex items-center gap-3 mb-8">
                <Star className="text-orange-500 fill-orange-500" size={24} />
                <h3 className="text-2xl font-black tracking-tighter uppercase text-black">RATE SESSION.</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="flex justify-center gap-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="p-1 transition-transform hover:scale-125 focus:outline-none group"
                        >
                            <Star
                                size={40}
                                className={`transition-all duration-300 ${star <= rating
                                    ? 'text-orange-500 fill-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]'
                                    : 'text-neutral-200 fill-neutral-50 group-hover:text-neutral-300'
                                    }`}
                            />
                        </button>
                    ))}
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-neutral-400 ml-1 uppercase tracking-[0.2em]">Transmission Notes</label>
                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="DEPLOY YOUR FEEDBACK..."
                        rows="4"
                        className="w-full p-6 bg-black/5 border border-transparent rounded-[32px] focus:ring-4 focus:ring-orange-500/10 transition-all resize-none text-sm font-black uppercase tracking-tight placeholder:text-neutral-300 outline-none"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white py-5 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                >
                    {isSubmitting ? (
                        'UPLOADING...'
                    ) : (
                        <>
                            TRANSMIT REVIEW <Send size={18} />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
