import { motion } from 'framer-motion';

const LoadingFallback = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    className="flex flex-col items-center justify-center min-h-screen"
    role="alert"
    aria-busy="true"
    aria-label="Loading content"
  >
    <div className="relative">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 dark:border-gray-700">
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-indigo-600 dark:border-indigo-400 border-t-transparent animate-pulse"></div>
      </div>
    </div>
    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 animate-pulse">Loading...</p>
  </motion.div>
);

export default LoadingFallback;