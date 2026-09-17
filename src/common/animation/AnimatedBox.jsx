"use client"
import { motion } from "framer-motion";

const AnimatedBox = ({
  children,
  className = "",
  initial = { opacity: 0.5, y: 50 },
  whileInView = { opacity: 1, y: 0 },
  transition = { duration: 1 },
  ...rest // <-- collect all other props
}) => {
  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      transition={transition}
      className={`${className}`}
      {...rest} // <-- forward them here
    >
      {children}
    </motion.div>
  );
};

export default AnimatedBox;
