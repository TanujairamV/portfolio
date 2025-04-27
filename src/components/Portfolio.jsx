import { motion } from "framer-motion";

export default function Portfolio() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100/50 to-purple-200/50 backdrop-blur-lg flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/30 backdrop-blur-2xl rounded-2xl shadow-xl p-10 w-[90%] md:w-[600px] flex flex-col items-center text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Hey, I'm Tanujairam
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Developer. Creator. Explorer.
        </p>
        <div className="flex gap-4">
          <a
            href="#projects"
            className="px-6 py-2 rounded-full bg-purple-500 text-white font-semibold hover:bg-purple-600 transition-all"
          >
            See Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-2 rounded-full bg-white/40 backdrop-blur-md text-purple-700 font-semibold hover:bg-white/60 transition-all"
          >
            Contact Me
          </a>
        </div>
      </motion.div>
    </div>
  );
}
