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
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-center gap-2 mb-4">
                <Star className="text-yellow-500 fill-yellow-500" size={20} />
                <h3 className="font-bold text-gray-900 text-lg">Rate Your Experience</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="p-2 transition-transform hover:scale-110 focus:outline-none"
                        >
                            <Star
                                size={32}
                                className={`transition-colors ${star <= rating
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-200 fill-gray-100'
                                    }`}
                            />
                        </button>
                    ))}
                </div>

                <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Tell us what you think..."
                    rows="3"
                    className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-black/10 focus:ring-4 focus:ring-black/5 outline-none transition-all resize-none text-sm font-medium placeholder:text-gray-400"
                />

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        'Sending...'
                    ) : (
                        <>
                            Send Feedback <Send size={16} />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
