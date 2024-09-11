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
  background-color: red;
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
          <button
            style={{
              position: 'absolute',
              zIndex: 2,
              width: '50px',
              left: 'calc(50% - 25px)',
              top: '10px',
            }}
            onClick={handleCloseImageViewer}
          >
            X
          </button>
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
              <button onClick={handleCloseImageViewer}>X</button>
            </div>
            {/*             <embed
              src="/documents/cv_pablo_tilli.pdf"
              type="application/pdf"
              width="100%"
              height="100%"
            /> */}
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
              <a href="/documents/cv_pablo_tilli.pdf">Download</a>.
            </object>
          </>
        </PdfViewerContainer>
      )}
    </>
  );
}
