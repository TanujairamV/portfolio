import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactForm({ isDarkMode }) {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (formData) => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) errors.message = 'Message is required';
    return errors;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = {
      name: e.target[0].value,
      email: e.target[1].value,
      message: e.target[2].value,
    };
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      return;
    }
    setFormErrors({});
    setTimeout(() => {
      alert('Form submitted successfully (placeholder)');
      setIsSubmitting(false);
      e.target.reset();
    }, 1000);
  };

  return (
    <div className={`card ${isDarkMode ? 'box-blur' : 'card-light'} p-10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 max-w-xl mx-auto`}>
      <form className="flex flex-col gap-6" onSubmit={handleFormSubmit} noValidate>
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <input
            type="text"
            id="name"
            className="w-full p-4 rounded-lg bg-input-bg text-text-primary border border-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent-purple font-inter text-lg peer"
            aria-label="Name"
            aria-describedby="name-error"
            required
          />
          <label
            htmlFor="name"
            className="absolute left-4 top-4 text-text-secondary font-inter text-lg transition-all duration-300 peer-focus:-translate-y-7 peer-focus:text-sm peer-focus:text-accent-purple peer-valid:-translate-y-7 peer-valid:text-sm peer-valid:text-accent-purple"
          >
            Name
          </label>
          {formErrors.name && (
            <p id="name-error" className="text-red-500 text-sm mt-1" role="alert">
              {formErrors.name}
            </p>
          )}
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <input
            type="email"
            id="email"
            className="w-full p-4 rounded-lg bg-input-bg text-text-primary border border-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent-purple font-inter text-lg peer"
            aria-label="Email"
            aria-describedby="email-error"
            required
          />
          <label
            htmlFor="email"
            className="absolute left-4 top-4 text-text-secondary font-inter text-lg transition-all duration-300 peer-focus:-translate-y-7 peer-focus:text-sm peer-focus:text-accent-purple peer-valid:-translate-y-7 peer-valid:text-sm peer-valid:text-accent-purple"
          >
            Email
          </label>
          {formErrors.email && (
            <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
            {formErrors.email}
          </p>
          )}
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <textarea
            id="message"
            rows="5"
            className="w-full p-4 rounded-lg bg-input-bg text-text-primary border border-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent-purple font-inter text-lg peer"
            aria-label="Message"
            aria-describedby="message-error"
            required
          ></textarea>
          <label
            htmlFor="message"
            className="absolute left-4 top-4 text-text-secondary font-inter text-lg transition-all duration-300 peer-focus:-translate-y-7 peer-focus:text-sm peer-focus:text-accent-purple peer-valid:-translate-y-7 peer-valid:text-sm peer-valid:text-accent-purple"
          >
            Message
          </label>
          {formErrors.message && (
            <p id="message-error" className="text-red-500 text-sm mt-1" role="alert">
              {formErrors.message}
            </p>
          )}
        </motion.div>

        <motion.button
          type="submit"
          className="btn-primary font-inter text-xl py-4 rounded-lg flex items-center justify-center gap-2"
          disabled={isSubmitting}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(124, 58, 237, 0.5)' }}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </motion.button>
      </form>
    </div>
  );
}
