import styled from 'styled-components';
import './styles.css';
import { useTranslation } from 'react-i18next';

const MainContainer = styled.div`
  background-color: ${({ theme }) => theme.mainBackgroundColor};
  color: ${({ theme }) => theme.mainTextColor};

  width: 100% !important;
  height: 100%;
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
      <ul>
        <li
          className={`sidebar-file-explorer-item ${
            section === '/documents' ? 'active' : ''
          }`}
          onClick={() => onSectionChange('/documents')}
        >
          <img src="/images/documents_icon.png" alt="" />
          <span>{t('documents')}</span>
        </li>
        <li
          className={`sidebar-file-explorer-item ${
            section === '/images' ? 'active' : ''
          }`}
          onClick={() => onSectionChange('/images')}
        >
          <img src="/images/pictures_icon.png" alt="" />
          <span>{t('images')}</span>
        </li>
      </ul>
    </MainContainer>
  );
};

export default FileExplorerSidebar;
