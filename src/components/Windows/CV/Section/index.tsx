import styled from 'styled-components';
import { forwardRef, ReactNode, useCallback, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

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

    const variants = {
      hidden: { opacity: 0, scale: 0.8 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4 },
      },
      /*  exit: { opacity: 0, x: 0 }, */
    };

    return (
      <SectionContainer
        id={id}
        ref={ref}
        /*         variants={variants}
        initial="hidden"
        whileInView="visible" */
        className="highlight"
      >
        <h2 ref={titleRef}>{title}</h2>
        {children}
      </SectionContainer>
    );
  }
);
