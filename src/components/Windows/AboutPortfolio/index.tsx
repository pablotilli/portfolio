import { useEffect, useRef, useState } from 'react';
import '../../Desktop/styles.css';
import BaseWindow from '../BaseWindow';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import AboutPortfolioContent from './AboutPortfolioContent';
import styled from 'styled-components';
import AboutPortfolioNavbar from './AboutPortfolioNavbar';
import NavBarComponent from './NavBarComponent';

import { useTranslation } from 'react-i18next';

interface BaseWindowProps {
  handleWindow: (event: string, windowName: string, data: any) => void;
  window: any;
  handleWindowNEW: (info: Array<any>) => void;
  windowName: string;
  activeDockIconPosition: { x: number; y: number };
  backgroundColor?: string;
  handleActiveWindow: (activeWindowName: string) => void;
  isActiveWindow: boolean;
  visible: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 34px);
  width: 100%;
`;

export default function AboutPorfolio(props: BaseWindowProps) {
  const { t } = useTranslation();

  const containerRef = useRef(null);

  const sectionsRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const { observe, visibleEntries } = useIntersectionObserver({
    threshold: 0.1,
  });
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    console.log('Avisar!!', currentSection);
  }, [currentSection]);

  useEffect(() => {
    sectionsRefs.forEach((ref) => {
      const h2Element = ref.current?.querySelector('h2');
      if (h2Element) {
        observe(h2Element);
      }
    });
  }, [sectionsRefs, observe]);

  useEffect(() => {
    if (visibleEntries.length > 0) {
      const mostVisibleEntry = visibleEntries.reduce((prev, current) => {
        return prev.intersectionRatio > current.intersectionRatio
          ? prev
          : current;
      });

      const index = sectionsRefs.findIndex(
        (ref) =>
          ref.current?.querySelector('h2') ===
          visibleEntries[visibleEntries.length - 1].target
      );
      if (index !== -1) setCurrentSection(index);
    }
  }, [visibleEntries, sectionsRefs]);

  const contentRef = useRef<HTMLDivElement>(null);

  const handleScrollTo = (index: number) => {
    const section = sectionsRefs[index].current;
    if (section && contentRef.current) {
      const topPosition =
        section.getBoundingClientRect().top +
        contentRef.current.scrollTop -
        contentRef.current.getBoundingClientRect().top;
      contentRef.current.scrollTo({
        top: topPosition,
        behavior: 'smooth',
      });
    }
  };

  const handlePrev = () => {
    console.log(contentRef.current);

    if (currentSection > 0) {
      const prevSectionRef = sectionsRefs[currentSection - 1].current;

      if (prevSectionRef && contentRef.current) {
        let sectionTop = prevSectionRef.offsetTop - 40;

        if (currentSection === 1) {
          sectionTop = 0;
        }

        contentRef.current.scrollTo({
          top: sectionTop,
          behavior: 'smooth',
        });
      }
    }
  };

  const handleNext = () => {
    console.log({ currentSection });

    if (currentSection < sectionsRefs.length - 1) {
      const nextSectionRef = sectionsRefs[currentSection + 1].current;

      if (nextSectionRef && contentRef.current) {
        contentRef.current.scrollTo({
          top: nextSectionRef.offsetTop - 40,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <BaseWindow {...props} title={t('about_this_proyect')}>
      <Container>
        <AboutPortfolioNavbar
          currentSection={currentSection}
          handleScrollTo={handleScrollTo}
        />

        <NavBarComponent handlePrev={handlePrev} handleNext={handleNext} />

        <AboutPortfolioContent
          sectionsRefs={sectionsRefs}
          contentRef={contentRef}
        />

        {/* <div style={{ width: '100%', height: '600px' }}>
          <WebSite url="http://localhost:3000" />
        </div> */}
      </Container>
    </BaseWindow>
  );
}
