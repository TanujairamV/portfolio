export default function Navbar() {
  return (
    <nav
      className="section fixed top-0 left-0 right-0 mx-auto mt-4 w-[90%] md:w-[600px] z-10"
      role="navigation"
      aria-label="Main navigation"
    >
      <ul className="flex justify-center gap-6 py-2">
        <li>
          <a
            href="#home"
            className="text-gray-900 hover:text-purple-500"
            aria-label="Home"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#projects"
            className="text-gray-900 hover:text-purple-500"
            aria-label="Projects"
          >
            Projects
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className="text-gray-900 hover:text-purple-500"
            aria-label="Contact"
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}
