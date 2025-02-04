import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

const Error404 = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-900 px-4'>
      <div className='text-center'>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className='text-6xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4'>
            404
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
            Page Not Found
          </h2>
          <p className='text-gray-600 dark:text-gray-300 mb-8'>
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>

          <Link
            to='/'
            className='inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all'
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Error404;