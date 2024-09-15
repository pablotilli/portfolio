import styled from 'styled-components';
/* import './styles.css'; */
import { useTranslation } from 'react-i18next';

const MainContainer = styled.div`
  background-color: ${({ theme }) => theme.secondaryBackgroundColor};
  color: ${({ theme }) => theme.mainTextColor};

  width: 100% !important;
  height: 100%;
`;

const SidebarItem = styled.li`
  padding: 8px 15px;
  display: flex;
  margin: 2px;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.mainTextColor};
  font-weight: 100;

  img {
    width: 25px;
    aspect-ratio: 1/1;
    margin-right: 8px;
    filter: contrast(0.5);
  }

  &.active {
    background-color: ${({ theme }) => theme.titleBarActiveBackgroundColor};
    border-radius: 5px;
    color: ${({ theme }) => theme.mainTextColor};
    font-weight: normal;
  }

  a {
    color: ${({ theme }) => theme.mainTextColor};
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.mainTextColor};
  }
`;

const FileExplorerSidebarContainer = styled.ul`
  list-style-type: none;
  padding: 0 2px;

  & > li {
    margin: 10px 0;
  }

  & > li:hover {
    opacity: 0.7;
  }
`;

const FileExplorerSidebar = ({
  section,
  onSectionChange,
}: {
  section: string | null;
  onSectionChange: (section: string) => void;
}) => {
  const { t } = useTranslation();

  return (
    <MainContainer>
      <FileExplorerSidebarContainer>
        <SidebarItem
          className={`${section === '/documents' ? 'active' : ''}`}
          onClick={() => onSectionChange('/documents')}
        >
          <img src="/images/documents_icon.png" alt="" />
          <span>{t('documents')}</span>
        </SidebarItem>
        <SidebarItem
          className={`${section === '/images' ? 'active' : ''}`}
          onClick={() => onSectionChange('/images')}
        >
          <img src="/images/pictures_icon.png" alt="" />
          <span>{t('images')}</span>
        </SidebarItem>
      </FileExplorerSidebarContainer>
    </MainContainer>
  );
};

export default FileExplorerSidebar;
