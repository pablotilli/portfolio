import { Link } from 'react-router-dom';
import './styles.css';

const FileExplorerSidebar = ({
  section,
  onSectionChange,
}: {
  section: string;
  onSectionChange: (section: string) => void;
}) => {
  return (
    <div className="file-explorer-sidebar">
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
    </div>
  );
};

export default FileExplorerSidebar;
