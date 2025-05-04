import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';

const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.current) {
      emailjs.sendForm('service_93dx3kc', 'template_0azsdc9', form.current, 'cSsgnQAXJHC5uk2ew')
        .then(() => {
          alert('Message sent successfully!');
          form.current?.reset();
        }, (error) => {
          alert('Failed to send message. Please try again.');
          console.error(error.text);
        });
    }
  };

  return (
    <motion.form
      ref={form}
      onSubmit={sendEmail}
      className="material-card p-1.5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <div className="mb-1">
        <label className="block text-[0.65rem] font-inter text-subheading text-center">Name</label>
        <input
          type="text"
          name="user_name"
          className="w-full p-1 mt-0.25 bg-transparent border border-accent/30 rounded-lg font-inter text-[0.65rem] text-heading focus:outline-none focus:border-accent"
          required
        />
      </div>
      <div className="mb-1">
        <label className="block text-[0.65rem] font-inter text-subheading text-center">Email</label>
        <input
          type="email"
          name="user_email"
          className="w-full p-1 mt-0.25 bg-transparent border border-accent/30 rounded-lg font-inter text-[0.65rem] text-heading focus:outline-none focus:border-accent"
          required
        />
      </div>
      <div className="mb-1">
        <label className="block text-[0.65rem] font-inter text-subheading text-center">Message</label>
        <textarea
          name="message"
          className="w-full p-1 mt-0.25 bg-transparent border border-accent/30 rounded-lg font-inter text-[0.65rem] text-heading focus:outline-none focus:border-accent"
          rows={2}
          required
        ></textarea>
      </div>
      <button type="submit" className="btn material-btn w-full text-[0.65rem]">Send</button>
    </motion.form>
  );
};

export default ContactForm;
