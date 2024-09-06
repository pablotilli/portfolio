import styled from 'styled-components';
import './styles.css';

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
  section: string;
  onSectionChange: (section: string) => void;
}) => {
  return (
    <MainContainer>
      <ul>
        <li
          className="sidebar-file-explorer-item"
          onClick={() => onSectionChange('/documents')}
        >
          <img src="/images/documents_icon.png" alt="" />
          <span>Documents</span>
        </li>
        <li
          className="sidebar-file-explorer-item"
          onClick={() => onSectionChange('/images')}
        >
          <img src="/images/pictures_icon.png" alt="" />
          <span>Images</span>
        </li>
      </ul>
    </MainContainer>
  );
};

export default FileExplorerSidebar;
