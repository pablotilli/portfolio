import React, { ReactNode } from 'react';

import './styles.css';

import { motion } from 'framer-motion';

export default function DesktopIconsContainer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="desktop-icons-container">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
