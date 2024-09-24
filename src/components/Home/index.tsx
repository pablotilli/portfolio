import { useEffect, Suspense, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { handleLight } from '../../redux/features/global/globalSlice';
import {
  selectIsLogged,
  selectIsMobile,
  selectAnimateIntro,
} from '../../redux/features/global/globalSelectors';

import { useTranslation } from 'react-i18next';

// @ts-ignore
import { OrbitControls, Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import { PulseLoader } from 'react-spinners';

import Typewriter from 'react-ts-typewriter';

import Slider from '../Slider';

import Cube, { CameraAnimation } from '../Cube';

import {
  ContinueTextContainer,
  HomeContainer,
  LampIndicator,
  MobileLoader,
  TextContainer,
} from './styles';

const Home = () => {
  const { t } = useTranslation();

  const isMobile = useAppSelector(selectIsMobile);
  const animateIntro = useAppSelector(selectAnimateIntro);
  const isLogged = useAppSelector(selectIsLogged);

  const [typeWriterFinished, setTypeWriterFinished] = useState(false);
  const [animateShowLampIndicator, setAnimateShowLampIndicator] =
    useState(false);

  useEffect(() => {
    if (typeWriterFinished && !isMobile) {
      setTimeout(() => {
        setAnimateShowLampIndicator(true);
      }, 200);
    }
  }, [typeWriterFinished]);

  const [typeWriterLine, setTypeWriterLine] = useState(0);

  const dispatch = useAppDispatch();

  return (
    <HomeContainer>
      <Canvas
        camera={{
          position: [6, 6, 6],
          fov: animateIntro ? 90 : isMobile ? 30 : 40,
        }}
        style={animateIntro ? { zIndex: 2 } : { zIndex: 1 }}
      >
        <Suspense>
          <Environment preset="apartment" />
        </Suspense>
        <Cube />

        {animateIntro ? (
          <CameraAnimation />
        ) : (
          <OrbitControls target={[0, 0, 0]} />
        )}
      </Canvas>

      <TextContainer>
        {animateIntro ? (
          <>
            {typeWriterLine === 0 ? (
              <p style={{ marginBottom: '25px' }}>
                <Typewriter
                  text={t('intro_content.paragraphs.1')}
                  cursor={typeWriterLine === 0}
                  onFinished={() => {
                    setTypeWriterLine(1);
                  }}
                  speed={60}
                />
              </p>
            ) : (
              <p style={{ marginBottom: '25px' }}>
                {t('intro_content.paragraphs.1')}
              </p>
            )}
            {typeWriterLine === 1 ? (
              <p style={{ marginBottom: '10px' }}>
                <Typewriter
                  text={t('intro_content.paragraphs.2')}
                  onFinished={() => {
                    setTypeWriterLine(2);
                  }}
                  speed={60}
                />
              </p>
            ) : (
              typeWriterLine >= 1 && (
                <p style={{ marginBottom: '10px' }}>
                  {t('intro_content.paragraphs.2')}
                </p>
              )
            )}

            {typeWriterLine === 2 ? (
              <p style={{ marginBottom: '10px' }}>
                <Typewriter
                  text={t('intro_content.paragraphs.3')}
                  onFinished={() => {
                    setTypeWriterLine(3);
                  }}
                  speed={60}
                />
              </p>
            ) : (
              typeWriterLine >= 2 && (
                <p style={{ marginBottom: '10px' }}>
                  {t('intro_content.paragraphs.3')}
                </p>
              )
            )}

            {typeWriterLine === 3 && !typeWriterFinished ? (
              <p style={{ marginBottom: '10px' }}>
                <Typewriter
                  text={`${
                    isMobile ? '' : t('intro_content.paragraphs.4')
                  }  ${t('intro_content.paragraphs.5')}`}
                  onFinished={() => {
                    setTypeWriterFinished(true);
                  }}
                  speed={60}
                />
              </p>
            ) : (
              typeWriterLine >= 3 && (
                <p style={{ marginBottom: '10px' }}>
                  <>
                    {isMobile ? (
                      ''
                    ) : (
                      <>
                        <span
                          className="turn-on-light-text"
                          style={{ color: 'yellow' }}
                        >
                          {t('intro_content.paragraphs.10')}{' '}
                        </span>
                        {t('intro_content.paragraphs.11')}{' '}
                      </>
                    )}
                    {t('intro_content.paragraphs.5')}
                  </>
                </p>
              )
            )}
          </>
        ) : (
          <ContinueTextContainer>
            <p className="fadein-1" style={{ marginBottom: '25px' }}>
              {t('intro_content.paragraphs.6')}
            </p>
            <p className="fadein-2" style={{ marginBottom: '10px' }}>
              {t('intro_content.paragraphs.7')}{' '}
              {`${
                isMobile
                  ? t('intro_content.paragraphs.8')
                  : t('intro_content.paragraphs.9')
              }`}
            </p>
          </ContinueTextContainer>
        )}
        {typeWriterFinished && !isMobile && (
          <LampIndicator
            className={`${
              animateShowLampIndicator ? 'lamp-indicator-show' : ''
            }`}
          >
            <img src="/images/flecha-derecha.png" />
          </LampIndicator>
        )}

        {isMobile && (
          <Slider
            visible={typeWriterFinished || !animateIntro}
            handleTurnOn={() => dispatch(handleLight(true))}
            translucent={false}
            text="Slide to power on"
          />
        )}

        {isMobile && !isLogged && !typeWriterFinished && animateIntro && (
          <MobileLoader>
            <PulseLoader color="gray" speedMultiplier={0.6} size={10} />
          </MobileLoader>
        )}
      </TextContainer>
    </HomeContainer>
  );
};

export default Home;
