import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';

function ContactForm() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_93dx3kc', 'template_0azsdc9', form.current, 'cSsgnQAXJHC5uk2ew')
      .then((result) => {
        console.log(result.text);
        alert('Message sent successfully!');
        form.current.reset();
      }, (error) => {
        console.log(error.text);
        alert('Failed to send message. Please try again.');
      });
  };

  return (
    <motion.form
      ref={form}
      onSubmit={sendEmail}
      className="glass-card p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-5">
        <label className="block text-base font-inter text-subheading">Name</label>
        <input
          type="text"
          name="user_name"
          className="w-full p-3 mt-1 bg-transparent border border-accent/30 rounded-lg font-inter text-heading focus:outline-none focus:border-hover"
          required
        />
      </div>
      <div className="mb-5">
        <label className="block text-base font-inter text-subheading">Email</label>
        <input
          type="email"
          name="user_email"
          className="w-full p-3 mt-1 bg-transparent border border-accent/30 rounded-lg font-inter text-heading focus:outline-none focus:border-hover"
          required
        />
      </div>
      <div className="mb-5">
        <label className="block text-base font-inter text-subheading">Message</label>
        <textarea
          name="message"
          className="w-full p-3 mt-1 bg-transparent border border-accent/30 rounded-lg font-inter text-heading focus:outline-none focus:border-hover"
          rows="5"
          required
        ></textarea>
      </div>
      <button type="submit" className="btn glass-btn w-full">Send Message</button>
    </motion.form>
  );
}

export default ContactForm;
