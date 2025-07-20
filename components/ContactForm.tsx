'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const ContactForm = () => {
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.grecaptcha) {
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute('6LenyIArAAAAAPgXu-qESFv2bMmMRBDKMyhsOit2', { action: 'submit' })
          .then((recaptchaToken) => {
            setToken(recaptchaToken);
          });
      });
    }
  }, []);

  return (
    <section
      id="contact"
      className="relative py-24 px-6 md:px-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md p-10 rounded-2xl border-2 border-black shadow-[6px_6px_0_#000] relative z-10"
      >
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
          Contáctame
        </h2>

        <form
          action="https://formsubmit.co/minombresgabriel@gmail.com"
          method="POST"
          className="grid gap-6"
        >
          {/* Configuración oculta */}
          <input type="hidden" name="_captcha" value="false" />
          <input
            type="hidden"
            name="_next"
            value="https://portafolio-gabriel-avq9.vercel.app/gracias"
          />
          <input type="text" name="_honey" style={{ display: 'none' }} />
          <input type="hidden" name="g-recaptcha-response" value={token} />

          <input
            type="text"
            name="name"
            required
            placeholder="Tu nombre"
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />

          <input
            type="email"
            name="email"
            required
            placeholder="Tu correo electrónico"
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />

          <textarea
            name="message"
            rows={5}
            required
            placeholder="Tu mensaje..."
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
          ></textarea>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="mt-2 inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
          >
            <FiSend className="mr-2" /> Enviar mensaje
          </motion.button>
        </form>
      </motion.div>

      {/* Fondo decorativo sutil */}
      <div className="absolute -bottom-10 -right-10 opacity-5 z-0">
        <FiSend size={200} />
      </div>
    </section>
  );
};

export default ContactForm;
