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

import {
  selectIsLogged,
  selectIsMobile,
  selectAnimateIntro,
} from '../redux/features/global/globalSelectors';

import Cube, { CameraAnimation } from '../components/Cube';

const Home = () => {
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
                  text="¡Hola! Mi nombre es Pablo Tili"
                  cursor={typeWriterLine === 0}
                  onFinished={() => {
                    setTypeWriterLine(1);
                  }}
                  speed={60}
                />
              </p>
            ) : (
              <p style={{ marginBottom: '25px' }}>
                ¡Hola! Mi nombre es Pablo Tilli
              </p>
            )}
            {typeWriterLine === 1 ? (
              <p style={{ marginBottom: '10px' }}>
                <Typewriter
                  text="Soy desarrollador web fullstack con más de 20 años de experiencia."
                  onFinished={() => {
                    setTypeWriterLine(2);
                  }}
                  speed={60}
                />
              </p>
            ) : (
              typeWriterLine >= 1 && (
                <p style={{ marginBottom: '10px' }}>
                  Soy desarrollador web fullstack con más de 20 años de
                  experiencia.
                </p>
              )
            )}

            {typeWriterLine === 2 ? (
              <p style={{ marginBottom: '10px' }}>
                <Typewriter
                  text="Me dedico a crear soluciones web efectivas y atractivas, y en este portfolio intento reflejar mi pasión y dedicación por lo que hago."
                  onFinished={() => {
                    setTypeWriterLine(3);
                  }}
                  speed={60}
                />
              </p>
            ) : (
              typeWriterLine >= 2 && (
                <p style={{ marginBottom: '10px' }}>
                  Me dedico a crear soluciones web efectivas y atractivas, y en
                  este portfolio intento reflejar mi pasión y dedicación por lo
                  que hago.
                </p>
              )
            )}

            {typeWriterLine === 3 && !typeWriterFinished ? (
              <p style={{ marginBottom: '10px' }}>
                <Typewriter
                  text={`${
                    isMobile ? '' : 'Enciende la luz y'
                  } ¡Espero que lo disfrutes!`}
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
                          Enciende la luz{' '}
                        </span>
                        y{' '}
                      </>
                    )}
                    ¡Espero que lo disfrutes!
                  </>
                </p>
              )
            )}
          </>
        ) : (
          <>
            <p className="fadein-1" style={{ marginBottom: '25px' }}>
              ¡Espero que estés disfrutando explorando mi portfolio!
            </p>
            <p className="fadein-2" style={{ marginBottom: '10px' }}>
              Si quieres seguir descubriendo más, puedes volver a{' '}
              {`${isMobile ? 'ingresar' : 'encender la luz para continuar.'}`}
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
