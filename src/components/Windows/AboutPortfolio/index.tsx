import { useEffect, useRef, useState } from 'react';
import '../../Desktop/styles.css';
import Sidebar from '../../Sidebar';

import BaseWindow from '../BaseWindow';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import AboutPortfolioContent from './AboutPortfolioContent';
import styled from 'styled-components';
import AboutPortfolioNavbar from './AboutPortfolioNavbar';
import NavBarComponent from './NavBarComponent';
import WebSite from './Website';
import { useTranslation } from 'react-i18next';

interface BaseWindowProps {
  handleWindow: (event: string, windowName: string, data: any) => void; // Ajusta el tipo según sea necesario
  window: any; // Ajusta el tipo según sea necesario
  handleWindowNEW: (info: Array<any>) => void; // Ajusta el tipo según sea necesario
  windowName: string;
  activeDockIconPosition: { x: number; y: number };
  backgroundColor?: string;
  handleActiveWindow: (activeWindowName: string) => void; // Ajusta el tipo según sea necesario
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
    console.log('Avisar!!');
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

  return (
    <BaseWindow {...props} title={t('about_this_proyect')}>
      <Container>
        <AboutPortfolioNavbar
          currentSection={currentSection}
          handleScrollTo={handleScrollTo}
        />

        <NavBarComponent />

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
