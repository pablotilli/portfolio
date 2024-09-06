import styled from 'styled-components';
import { forwardRef, ReactNode, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

const SectionContainer = styled(motion.section)`
  padding: 15px 20px;
  min-height: 100%;
  border-bottom: 1px solid #ddd;
  max-width: 700px;

  h2 {
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 2rem;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
`;

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ id, title, children }, ref) => {
    const titleRef = useRef<HTMLHeadingElement>(null);

    return (
      <SectionContainer id={id} ref={ref} className="highlight">
        <h2 ref={titleRef}>{title}</h2>
        {children}
      </SectionContainer>
    );
  }
);
