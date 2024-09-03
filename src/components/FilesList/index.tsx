import styled from 'styled-components';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { handleImageViewer } from '../../redux/features/global/globalSlice';
import { useState } from 'react';
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

export default function FilesList({
  files,
}: {
  files: { path: string; type: string; size: string }[];
}) {
  const dispatch = useAppDispatch();

  const getFileName = (path: string) => {
    const fileParts = path.split('/');

    const fileName = fileParts[fileParts.length - 1];

    return fileName;
  };

  const [isDrag, setIsDrag] = useState(false);

  const getViewerType = (type: string) => {
    const viewerType = type === 'PDF File' ? 'pdf' : 'image';
    return viewerType;
  };

  return (
    <>
      {files.map(
        (
          { path, type, size }: { path: string; type: string; size: string },
          index: number
        ) => (
          <div
            onDoubleClick={() => {
              dispatch(
                handleImageViewer({
                  visible: true,
                  fileIndex: index,
                  viewerType: getViewerType(type),
                })
              );
            }}
            onTouchStart={() => setIsDrag(false)}
            onTouchMove={() => setIsDrag(true)}
            onTouchEnd={() => {
              if (!isDrag) {
                dispatch(
                  handleImageViewer({
                    visible: true,
                    fileIndex: index,
                    viewerType: getViewerType(type),
                  })
                );
              }
            }}
            onClick={() => {
              dispatch(
                handleImageViewer({
                  visible: false,
                  fileIndex: index,
                  viewerType: getViewerType(type),
                })
              );
            }}
            /*  style={{ width: ' 120px', height: '90px' }} */
          >
            <FileIcon>
              <img
                src={
                  getViewerType(type) === 'pdf' ? '/images/pdf_icon.png' : path
                }
                style={{
                  width: getViewerType(type) === 'pdf' ? '45px' : '100px',
                }}
              />
              <span>{getFileName(path)}</span>
            </FileIcon>
          </div>
        )
      )}
    </>
  );
}
