import { useState } from 'react';
import emailjs from '@emailjs/browser';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .send(
        'your_service_id',
        'your_template_id',
        formData,
        'your_public_key'
      )
      .then(
        () => {
          setStatus('Message sent successfully!');
          setFormData({ name: '', email: '', message: '' });
        },
        () => {
          setStatus('Failed to send message. Please try again.');
        }
      );
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <form onSubmit={handleSubmit} className="glass-card">
        <div className="mb-4">
          <label htmlFor="name" className="block text-[#D1D1D1] font-chillax">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-transparent border border-[#1A1A1A] rounded-md text-[#D1D1D1] focus:outline-none focus:border-[#A076F9]"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-[#D1D1D1] font-chillax">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-transparent border border-[#1A1A1A] rounded-md text-[#D1D1D1] focus:outline-none focus:border-[#A076F9]"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-[#D1D1D1] font-chillax">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-transparent border border-[#1A1A1A] rounded-md text-[#D1D1D1] focus:outline-none focus:border-[#A076F9]"
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn">
          Send Message
        </button>
        {status && <p className="mt-4 text-[#D1D1D1] font-chillax">{status}</p>}
      </form>
    </div>
  );
}

export default ContactForm;
