import { motion } from "framer-motion";

export default function Loader() {
  const dots = [
    { delay: 0, yRange: [0, -8, 0] },
    { delay: 0.18, yRange: [0, -12, 0] },
    { delay: 0.36, yRange: [0, -6, 0] },
  ];

  return (
    <div className="flex items-center justify-center gap-2">
      {dots.map((dot, i) => (
        <motion.span
          key={i}
          className="w-2.5 h-2.5 rounded-full bg-mbwhite-500"
          animate={{
            y: dot.yRange,
          }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            ease: [0.45, 0, 0.55, 1], // smooth & natural
            delay: dot.delay,
          }}
        />
      ))}
    </div>
  );
}
