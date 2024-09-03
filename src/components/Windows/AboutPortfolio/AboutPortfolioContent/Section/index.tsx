import styled from 'styled-components';
import { forwardRef, ReactNode, useCallback, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

const SectionContainer = styled(motion.section)`
  padding: 100px 20px;
  min-height: 100%;
  border-bottom: 1px solid #ddd;
  /*   max-width: 700px; */
  width: 100%;

  background: url(/images/wallpapers/abstract/1.jpg) no-repeat;
  background-size: cover;
  background-attachment: fixed;

  h2 {
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 2rem;
  }
`;

interface SectionProps {
  id: string;
  title: string;
  children?: ReactNode;
  style?: CSSProperties;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ id, title, children, style }, ref) => {
    const titleRef = useRef<HTMLHeadingElement>(null);

    const variants = {
      /*       hidden: { opacity: 0, scale: 0.8 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4 },
      }, */
      /*  exit: { opacity: 0, x: 0 }, */
    };

    console.log('RR', { ref });

    return (
      <SectionContainer
        id={id}
        ref={ref}
        style={style}
        /*    variants={variants}
        initial="hidden"
        whileInView="visible" */
      >
        <h2 ref={titleRef}>{title}</h2>
        {children && children}
      </SectionContainer>
    );
  }
);
