import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MobileScreenProps {
  children: ReactNode;
}

export default function MobileScreen({ children }: MobileScreenProps) {
  const variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, transition: { duration: 0.2 }, scale: 1 },
    exit: { opacity: 0, transition: { duration: 0.1 }, scale: 0 },
  };

  return (
    <motion.div
      initial="hidden" // Estado inicial (oculto)
      animate="visible" // Estado al montar (visible)
      exit="exit" // Estado al desmontar (oculto)
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
