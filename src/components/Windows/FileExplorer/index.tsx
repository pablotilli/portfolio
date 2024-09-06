import { SplitPane } from '@andrewray/react-multi-split-pane';

import BaseWindow from '../BaseWindow';

import '../../Desktop/styles.css';
import FileExplorerSidebar from '../../FileExplorerSidebar';

import 'slick-carousel/slick/slick.css';

import { useAppSelector } from '../../../hooks/reduxHooks';

import {
  selectDocumentsFiles,
  selectImagesFiles,
  selectImageViewer,
} from '../../../redux/features/global/globalSelectors';

import './styles.css';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import FilesList from '../../FilesList';

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

interface FileExplorerWindow extends BaseWindowProps {
  section: string;
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.titleBarBackgroundColor};
  color: ${({ theme }) => theme.mainTextColor};

  overflow-y: auto;

  height: 100%;
  width: 100%;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  grid-auto-rows: max-content;

  padding: 15px;
  grid-row-gap: 40px;
  grid-column-gap: 10px;
`;

//REFACTOR: Repeat in FileList
const FileIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    margin-top: 7px;
    margin-bottom: 7px;
    padding: 0 7px;
    cursor: default;
    font-size: 0.8rem;
  }

  img {
    margin-top: 10px;
  }

  &:hover {
    background: rgba(156, 156, 156, 0.288);
  }
`;

export default function FileExplorerWindow(props: FileExplorerWindow) {
  const imagesFiles = useAppSelector(selectImagesFiles);
  const documentsFiles = useAppSelector(selectDocumentsFiles);

  const getFileName = (path: string) => {
    const fileParts = path.split('/');

    const fileName = fileParts[fileParts.length - 1];

    return fileName;
  };

  const getSection = () =>
    props.section === 'Photos' ? '/images' : `/${props.section.toLowerCase()}`;

  const [activeSection, setActiveSection] = useState<string | null>(
    getSection()
  );

  useEffect(
    () => console.log({ activeSection }, props.section),
    [activeSection]
  );

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  const imageViewer = useAppSelector(selectImageViewer);

  return (
    <BaseWindow {...props}>
      <SplitPane
        split="vertical"
        minSize={[100, 300, 150]}
        defaultSizes={[150, 500, 150]}
        className="split-pane"
      >
        <FileExplorerSidebar
          section={props.section}
          onSectionChange={handleSectionChange}
        />

        <Container>
          {activeSection === `/images` && (
            <>
              <FilesList files={imagesFiles} />
            </>
          )}

          {activeSection === `/documents` && (
            <>
              <FilesList files={documentsFiles} />
            </>
          )}
        </Container>
        <div style={{ width: '100%' }}>
          <p>Details</p>
          <FileIcon>
            <img
              src={imagesFiles[imageViewer.fileIndex].path}
              style={{ width: '100%' }}
            />

            <p>{getFileName(imagesFiles[imageViewer.fileIndex].path)}</p>
            <p>{imagesFiles[imageViewer.fileIndex].size}</p>
            <p>{imagesFiles[imageViewer.fileIndex].type}</p>
          </FileIcon>
        </div>
      </SplitPane>
    </BaseWindow>
  );
}
