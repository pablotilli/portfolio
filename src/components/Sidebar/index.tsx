import styled from 'styled-components';

import CodeIcon from '@material-ui/icons/Code';

const SidebarContainer = styled.nav`
  padding: 0;
  overflow-y: auto; // Permite el scroll dentro de la sidebar si el contenido es largo
  display: flex;
  flex-direction: column;
  width: 100%;

  color: ${({ theme }) => theme.mainTextColor};

  border-top: 1px solid #363535;
`;

const SidebarItem = styled.div<{ active: boolean }>`
  padding: 4px;
  /*   margin-bottom: 10px; */
  cursor: pointer;
  background-color: ${({ active }) => (active ? '#007bff' : 'transparent')};
  color: '#fff';
  border-radius: 1px;
  transition: background-color 0.3s ease;
  font-size: 0.8rem;
  display: flex;
  width: 100%;

  &:hover {
    background-color: ${({ active }) => (active ? '#0056b3' : '#808080')};
  }
`;

const SidebarHeader = styled.div`
  margin-bottom: 10px;
  padding: 20px 0 20px 4px;
  font-size: 0.8rem;
  display: flex;

  align-items: center;
  height: 30px;
`;

interface SidebarProps {
  currentSection: number;
  handleScrollTo: (index: number) => void;
  sections: string[];
}

const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  handleScrollTo,
  sections,
}) => {
  //REFACTOR -> REPEAT
  function capitalizeString(str: string) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  return (
    <SidebarContainer>
      <SidebarHeader>Explorer</SidebarHeader>
      {sections.map((section, index) => (
        <SidebarItem
          key={index}
          active={currentSection === index}
          onClick={() => handleScrollTo(index)}
        >
          <CodeIcon fontSize="small" />
          <span style={{ marginLeft: '3px' }}>{capitalizeString(section)}</span>
        </SidebarItem>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;
