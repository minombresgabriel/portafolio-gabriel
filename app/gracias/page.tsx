'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';

const GraciasPage = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-gray-900 to-gray-950 text-white px-6 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-lg w-full bg-gray-800/80 backdrop-blur-md rounded-xl p-10 shadow-xl"
      >
        <div className="flex justify-center mb-6">
          <FiCheckCircle className="text-green-400 text-6xl" />
        </div>

        <h1 className="text-3xl font-bold mb-4">Thank you for your message!</h1>
        <p className="text-gray-300 mb-6">
          I have received your message correctly. I will contact you as soon as possible.
                  </p>

        <Link
          href="/"
          className="inline-block mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition duration-300"
        >
          Back to top
                  </Link>
      </motion.div>
    </section>
  );
};

export default GraciasPage;
