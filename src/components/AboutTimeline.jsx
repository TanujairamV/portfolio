import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

export default function AboutTimeline({ isDarkMode }) {
  const timelineRef = useRef(null);

  const milestones = [
    {
      year: '2020',
      title: 'Started Coding',
      description: 'Began learning JavaScript and built first web projects.',
    },
    {
      year: '2022',
      title: 'Mastered React',
      description: 'Developed multiple React applications with modern practices.',
    },
    {
      year: '2024',
      title: 'Freelance Developer',
      description: 'Worked on client projects, focusing on UI/UX and performance.',
    },
  ];

  useEffect(() => {
    const items = timelineRef.current.querySelectorAll('.timeline-item');
    gsap.fromTo(
      items,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.3,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <div ref={timelineRef} className="max-w-3xl mx-auto">
      {milestones.map((milestone, index) => (
        <motion.div
          key={index}
          className="timeline-item mb-12 flex items-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 flex-shrink-0">
            <span className="text-xl font-bold font-poppins text-purple-500">
              {milestone.year}
            </span>
          </div>
          <div className="flex-1 glassmorphic p-6 rounded-xl">
            <h3 className="text-lg font-bold font-poppins text-gray-900 dark:text-gray-100 mb-2">
              {milestone.title}
            </h3>
            <p className="text-base font-inter text-gray-600 dark:text-gray-300">
              {milestone.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
