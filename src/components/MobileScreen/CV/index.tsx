import React, { useEffect, useRef, useState } from 'react';
import MainContent from '../../MainContent/MainContent';
import MobileScreen from '..';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';

export default function CVMobileScreen() {
  const sectionsRefs = [
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null),
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
        (ref) => ref.current?.querySelector('h2') === mostVisibleEntry.target
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
        contentRef.current.getBoundingClientRect().top -
        50;
      contentRef.current.scrollTo({
        top: topPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <MobileScreen>
      <MainContent contentRef={contentRef} sectionsRefs={sectionsRefs} />
    </MobileScreen>
  );
}
