import React, { ReactNode } from 'react';

import './styles.css';

export default function MobileIconsContainer({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="mobile-icons-container">{children}</div>;
}
