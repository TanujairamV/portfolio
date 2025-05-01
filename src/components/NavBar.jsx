import { motion } from 'framer-motion';

export default function NavBar({ isMenuOpen, setIsMenuOpen }) {
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const section = document.querySelector(href);
    section.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
    console.log('Navigated to:', href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#home"
          className="text-3xl font-dancing font-bold text-text-primary hover:text-accent-purple transition-colors duration-300"
          onClick={(e) => handleNavClick(e, '#home')}
          aria-label="Tanu Home"
        >
          Tanu
        </a>

        <ul className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-text-primary font-poppins text-lg hover:text-accent-purple hover:scale-110 transition-all duration-300 the group"
                aria-label={link.name}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-accent-purple group-hover:w-full transition-all duration-300"></span>
              </a>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden text-text-primary focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={isMenuOpen}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <motion.ul
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-background/95 backdrop-blur-lg absolute top-16 left-0 right-0 flex flex-col items-center py-6 shadow-md"
        >
          {navLinks.map((link) => (
            <li key={link.name} className="py-3">
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-text-primary font-poppins text-lg hover:text-accent-purple transition-colors duration-300"
                aria-label={link.name}
              >
                {link.name}
              </a>
            </li>
          ))}
        </motion.ul>
      )}
    </nav>
  );
}
