import { SplitPane } from '@andrewray/react-multi-split-pane';

import Sidebar from '../../Sidebar';
import MainContent from '../../MainContent/MainContent';

import Terminal from '../../Terminal/Terminal';
import BaseWindow from '../BaseWindow';

import '../../Desktop/styles.css';
import { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';

import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const ActivityBar = styled.div`
  border-top: 1px solid #363535;

  border-right: 1px solid black;
  height: 100%;
  display: flex;

  color: ${({ theme }) => theme.mainTextColor};

  span {
    border-left: 2px solid blue;
    max-height: 40px;
    width: 100%;
    padding: 9px;
  }
`;

const TabsBar = styled.div`
  margin-bottom: 10px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;

  border-top: 1px solid #363535;
  background-color: #000b1d;

  span {
    background-color: #222222;
    padding: 10px 20px;
    width: fit-content;
    border: 1px solid #363535;
    border-bottom: none;

    border-left: 0px;
    border-top: 2px solid blue;
  }
`;

const InactiveTabsContainer = styled.div`
  border-bottom: 1px solid #363535;
  height: 39px;
`;

const BreadCrumbs = styled.div`
  width: 100%;
  height: 31px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid black;

  color: ${({ theme }) => theme.mainTextColor};

  span {
    margin-left: 10px;
    font-size: 0.8rem;
    padding-bottom: 5px;
  }
`;

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

export default function CvWindow(props: BaseWindowProps) {
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

  const { t } = useTranslation();

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
        contentRef.current.getBoundingClientRect().top;

      contentRef.current.scrollTo({
        top: topPosition,
        behavior: 'smooth',
      });
    }
  };

  const sections = [
    t('cv_content.sections.presentation.title'),
    t('cv_content.sections.work_experience.title'),
    t('cv_content.sections.technical_skills_title'),
    t('cv_content.sections.languages.title'),
    t('cv_content.sections.higher_education_title'),
  ];

  const mainContentRef = useRef<HTMLDivElement>(null);

  function capitalizeString(str: string) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  return (
    <BaseWindow {...props} title={t('CV')}>
      <div style={{ display: 'flex', height: '100%', width: '100%' }}>
        <ActivityBar>
          <span>
            <FileCopyOutlinedIcon />
          </span>
        </ActivityBar>
        <SplitPane
          split="vertical"
          /*  onChange={(newSizes) => {
          setSizes(newSizes.map((size) => `${size}`));
        }} */
          minSize={[150, 300]}
          defaultSizes={[100, 500]}
          className="split-pane"
        >
          <Sidebar
            currentSection={currentSection}
            handleScrollTo={handleScrollTo}
            sections={sections}
          />

          <SplitPane
            split="horizontal"
            /* onChange={(newSizes) => {
            setSizes2(newSizes.map((size) => `${size}`));
          }} */
            minSize={[100]}
            defaultSizes={[500, 170]}
            className="split-pane"
          >
            <div style={{ width: '100%', height: 'calc(100% - 80px)' }}>
              <TabsBar>
                <span>{t('CV')}</span>
                <InactiveTabsContainer
                  style={{ flex: 1, height: '50px;' }}
                ></InactiveTabsContainer>
              </TabsBar>
              <BreadCrumbs>
                <span>
                  Pablo Tilli {'>'} {t('CV')} {'>'}{' '}
                  {capitalizeString(sections[currentSection])}
                </span>
              </BreadCrumbs>

              <MainContent
                sectionsRefs={sectionsRefs}
                contentRef={contentRef}
                ref={mainContentRef}
              />
            </div>
            <Terminal />
          </SplitPane>
        </SplitPane>
      </div>
    </BaseWindow>
  );
}
