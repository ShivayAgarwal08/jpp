import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="w-12 h-12 rounded-2xl bg-card border border-border flex items-center justify-center text-foreground shadow-sm hover:shadow-md transition-all duration-300"
            aria-label="Toggle Theme"
        >
            {theme === 'light' ? (
                <Moon size={22} className="text-primary" />
            ) : (
                <Sun size={22} className="text-secondary" />
            )}
        </motion.button>
    );
}
