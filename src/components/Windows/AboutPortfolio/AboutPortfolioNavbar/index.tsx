import { Tabs } from '@sinm/react-chrome-tabs';

import '@sinm/react-chrome-tabs/css/chrome-tabs.css';
import '@sinm/react-chrome-tabs/css/chrome-tabs-dark-theme.css';

import './Sidebar.css';

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  /* padding: 20px; */

  /*  height: 90px; */
  /*   display: flex; */
  width: 100%;
`;

const SidebarItem = styled.div<{ active: boolean }>`
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? '#007bff' : 'transparent')};
  color: ${({ active }) => (active ? '#fff' : '#000')};
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ active }) => (active ? '#0056b3' : '#e9ecef')};
  }
`;

interface SidebarProps {
  currentSection: number;
  handleScrollTo: (index: number) => void;
}

const AboutPortfolioNavbar: React.FC<SidebarProps> = ({
  currentSection,
  handleScrollTo,
}) => {
  const { t } = useTranslation();

  const sections = [
    'Presentación!!!',
    'Experiencia laboral',
    'Habilidades técnicas',
    'Idiomas',
    'Educación superior',
  ];

  const desktopIcon = '/images/desktop_icon.png';
  const mobileIcon = '/images/mobile_icon.png';
  const ideaIcon = '/images/idea_icon.png';
  const conclusionIcon = '/images/conclusion_icon.png';
  const techIcon = '/images/tech_icon.png';

  let _id = 1;
  function uniqId() {
    return _id++;
  }

  function createNewTab() {
    /*     const id = uniqId();
    return {
      id: `tab-id-${id}`,
      title: `New Tabs ${id}`,
      favicon: id % 2 ? desktopIcon : mobileIcon,
    }; */
  }

  interface Tabs {
    id: string;
    favicon: string;
    title: string;
    active: boolean;
  }

  const [tabs, setTabs] = useState<Tabs[]>([]);

  const initTabs = () => {
    setTabs([
      {
        id: '0',
        favicon: ideaIcon,
        title: t('about_portfolio_content.sections.the_idea.title'),
        active: true,
      },
      {
        id: '1',
        favicon: desktopIcon,
        title: t('about_portfolio_content.sections.desktop_experience.title'),
        active: false,
      },
      {
        id: '2',
        favicon: mobileIcon,
        title: t('about_portfolio_content.sections.mobile_experience.title'),
        active: false,
      },
      {
        id: '3',
        favicon: conclusionIcon,
        title: t('about_portfolio_content.sections.conclusion.title'),
        active: false,
      },
      {
        id: '4',
        favicon: techIcon,
        title: t('about_portfolio_content.sections.technologies.title'),
        active: false,
      },
    ]);
  };

  useEffect(initTabs, [t]);

  const [darkMode, setDarkMode] = useState(true);

  /*   const addTab = () => {
    setTabs([...tabs, createNewTab()]);
  };
 */
  const active = (id: string) => {
    /*     setIsTabClick(true); */
    console.log({ id });
    setTabs(tabs.map((tab) => ({ ...tab, active: id === tab.id })));
    handleScrollTo(parseInt(id));
  };

  /*   const close = (id) => {
    setTabs(tabs.filter((tab) => tab.id !== id));
  }; */

  /*   const reorder = (tabId, fromIndex, toIndex) => {
    const beforeTab = tabs.find((tab) => tab.id === tabId);
    if (!beforeTab) {
      return;
    }
    let newTabs = tabs.filter((tab) => tab.id !== tabId);
    newTabs.splice(toIndex, 0, beforeTab);
    setTabs(newTabs);
  }; */

  /* const closeAll = () => setTabs([]); */

  const toogleDarkMode = () => setDarkMode((darkMode) => !darkMode);

  /*   const [isTabClick, setIsTabClick] = useState(false); */

  useEffect(() => {
    setTabs(
      tabs.map((tab) => ({ ...tab, active: `${currentSection}` === tab.id }))
    );
  }, [currentSection]);

  return (
    <Container>
      <Tabs
        darkMode={darkMode}
        /*  onTabClose={close}
        onTabReorder={reorder} */
        onTabActive={active}
        tabs={tabs}
      />
    </Container>
  );
};

export default AboutPortfolioNavbar;
