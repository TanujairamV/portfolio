import { useMousePosition } from './mouse';

const Cursor = () => {
  const { x, y } = useMousePosition();

  return (
    <div
      className="fixed pointer-events-none z-50 w-8 h-8 rounded-full mix-blend-difference bg-white/20 backdrop-blur-md border border-white/30"
      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
    />
  );
};

export default Cursor;
