import React, { useEffect, Suspense, useState } from 'react';

import './Home.css';

import { Canvas } from '@react-three/fiber';

// @ts-ignore
import { OrbitControls, Environment, Text } from '@react-three/drei';

import { PulseLoader } from 'react-spinners';

import Slider from '../components/Slider';
import Typewriter from 'react-ts-typewriter';

import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { handleLight } from '../redux/features/global/globalSlice';

import { useTranslation } from 'react-i18next';

import {
  selectIsLogged,
  selectIsMobile,
  selectAnimateIntro,
} from '../redux/features/global/globalSelectors';

import Cube, { CameraAnimation } from '../components/Cube';

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
    <div className="home">
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

      <div className="text-container">
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
          <>
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
          </>
        )}
        {typeWriterFinished && !isMobile && (
          <div
            className={`lamp-indicator ${
              animateShowLampIndicator ? 'lamp-indicator-show' : ''
            }`}
          >
            <img src="/images/flecha-derecha.png" />
          </div>
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
          <div className="mobile-loader">
            <PulseLoader color="gray" speedMultiplier={0.6} size={10} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
