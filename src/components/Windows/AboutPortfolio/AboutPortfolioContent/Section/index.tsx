import styled from 'styled-components';
import { forwardRef, ReactNode, useCallback, useRef } from 'react';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

const SectionContainer = styled.div`
  padding: ${(props) =>
    props.id === 'section-0' ? '10px 20px 100px 20px;' : '100px 20px'};
  min-height: 100%;
  border-bottom: 1px solid #ddd;
  width: 100%;

  background: url(/images/wallpapers/abstract/1.jpg) no-repeat;
  background-size: cover;
  background-attachment: fixed;

  h2 {
    margin-top: 0;
    margin-bottom: 60px;
    font-size: 2rem;
  }
`;

interface SectionProps {
  id: string;
  title: string;
  children?: ReactNode;
  style?: CSSProperties;
}

export const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ id, title, children, style }, ref) => {
    const titleRef = useRef<HTMLHeadingElement>(null);

    return (
      <SectionContainer ref={ref} id={id} style={style}>
        <h2 ref={titleRef}>{title}</h2>
        {children && children}
      </SectionContainer>
    );
  }
);
