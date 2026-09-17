"use client";
import { AnimatePresence, motion } from "framer-motion";

const AnimationWrapper = ({
  children,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  exit = { opacity: 0 }, // Add exit prop for AnimatePresence
  transition = { duration: 1 },
  keyValue,
  classname,
}) => {
  return (
    <AnimatePresence initial={false}>
      {children && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimationWrapper;
