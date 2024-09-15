import '../Desktop/styles.css';

import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import { Navigation } from 'swiper/modules';

import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { handleImageViewer } from '../../redux/features/global/globalSlice';

import 'swiper/css';
import 'swiper/css/navigation';
import {
  selectImagesFiles,
  selectImageViewer,
} from '../../redux/features/global/globalSelectors';

const ImageViewerContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;

  z-index: 10;

  opacity: 1;
  transition: all 0.1s ease-in-out;
`;

const PdfViewerContainer = styled.div`
  position: absolute;
  z-index: 10;
  width: 100%;
  height: calc(100% - 20px);
  background-color: ${({ theme }) => theme.mainBackgroundColor};
`;

const DownloadButton = styled.a`
  border: 1px solid ${({ theme }) => theme.secondaryBackgroundColor};
  padding: 10px;
  border-radius: 15px;
  color: ${({ theme }) => theme.mainTextColor};
  text-decoration: none;
`;

const CloseButton = styled.button`
  border: 1px solid ${({ theme }) => theme.mainBackgroundColor};
  padding: 3px;
  border-radius: 15px;
  color: ${({ theme }) => theme.mainTextColor};
  background-color: ${({ theme }) => theme.secondaryBackgroundColor};
  position: absolute;
  z-index: 2;
  width: 60px;
  left: calc(50% - 30px);
  top: 2px;
  font-size: 1rem;
`;

export default function ImageViewerWindow() {
  const dispatch = useAppDispatch();

  const handleCloseImageViewer = () => {
    dispatch(handleImageViewer({ visible: false, fileIndex: 0 }));
  };

  const selectedFileImage = useAppSelector(selectImageViewer);
  const imagesFiles = useAppSelector(selectImagesFiles);

  return (
    <>
      {selectedFileImage.viewerType === 'image' && (
        <ImageViewerContainer>
          <CloseButton onClick={handleCloseImageViewer}>x</CloseButton>
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper: SwiperClass) => console.log(swiper)}
            style={{ height: '100%' }}
            navigation={true}
            modules={[Navigation]}
            freeMode={true}
            initialSlide={selectedFileImage.fileIndex}
            loop
          >
            {imagesFiles.map(({ path }) => (
              <SwiperSlide>
                <img
                  src={path}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </ImageViewerContainer>
      )}

      {/* REFACTOR CLOSE!! */}

      {selectedFileImage.viewerType === 'pdf' && (
        <PdfViewerContainer>
          <>
            <div style={{ height: '20px' }}>
              <CloseButton onClick={handleCloseImageViewer}>x</CloseButton>
            </div>

            <object
              data="/documents/cv_pablo_tilli.pdf"
              type="application/pdf"
              width="100%"
              height="100%"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <DownloadButton href="/documents/cv_pablo_tilli.pdf">
                Download
              </DownloadButton>
            </object>
          </>
        </PdfViewerContainer>
      )}
    </>
  );
}
