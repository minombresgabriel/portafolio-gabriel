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
      className="relative bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white py-28 px-6 md:px-20 overflow-hidden min-h-screen flex flex-col items-center"
    >
      {/* Partículas sutiles */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('/images/particles.svg')] bg-cover"></div>

      {/* Fondo animado suave */}
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-tr from-cyan-400 to-blue-500 opacity-10 blur-3xl rounded-full"
      />
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 7 }}
        className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tr from-purple-400 to-cyan-500 opacity-10 blur-3xl rounded-full"
      />

      {/* Contenedor del formulario */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="max-w-3xl w-full bg-black/40 backdrop-blur-lg p-10 rounded-3xl border border-cyan-400/80 shadow-[0_0_25px_#00f0ff] relative z-10"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-6 tracking-tight">
          Let’s Work Together
        </h2>
        <p className="text-center text-gray-300 mb-10">
          Got a project in mind? Drop me a message and I’ll get back to you soon.
        </p>

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

          {/* Campos */}
          {['Name', 'Email'].map((placeholder, idx) => (
            <motion.input
              key={idx}
              type={placeholder === 'Email' ? 'email' : 'text'}
              name={placeholder.toLowerCase()}
              required
              placeholder={placeholder}
              whileFocus={{ scale: 1.02 }}
              className="w-full px-5 py-3 border border-cyan-400/50 rounded-xl bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all shadow-[0_0_10px_#00f0ff50] hover:shadow-[0_0_15px_#00f0ff80]"
            />
          ))}

          <motion.textarea
            name="message"
            rows={5}
            required
            placeholder="Your message..."
            whileFocus={{ scale: 1.02 }}
            className="w-full px-5 py-3 border border-cyan-400/50 rounded-xl bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all shadow-[0_0_10px_#00f0ff50] hover:shadow-[0_0_15px_#00f0ff80] resize-none"
          />

          {/* Botón futurista */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="mt-2 inline-flex items-center justify-center bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 px-8 rounded-xl shadow-[0_0_15px_#00f0ff] hover:shadow-[0_0_25px_#00f0ff] transition duration-300"
          >
            <FiSend className="mr-2" /> Send Message
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default ContactForm;
