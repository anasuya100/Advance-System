import React from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../contexts/ThemeContext';
import clsx from 'clsx';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className,
  size = 'md' 
}) => {
  const { theme, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={clsx(
        'relative rounded-lg border border-gray-300 dark:border-gray-600',
        'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800',
        'transition-colors duration-200',
        'flex items-center justify-center',
        sizeClasses[size],
        className
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === 'dark' ? 180 : 0,
          scale: theme === 'dark' ? 0.8 : 1,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
        }}
        className="absolute"
      >
        {theme === 'light' ? (
          <SunIcon className={clsx(iconSizes[size], 'text-amber-500')} />
        ) : (
          <MoonIcon className={clsx(iconSizes[size], 'text-blue-400')} />
        )}
      </motion.div>
    </motion.button>
  );
};