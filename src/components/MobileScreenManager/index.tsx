import { t } from 'i18next';
import { DraggableData, Rnd, RndDragCallback } from 'react-rnd';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { motion } from 'framer-motion';
import { DraggableEvent } from 'react-draggable';

interface MobileScreenManagerProps {
  openedApps: Array<any>;
  onAppClick: (app: any) => void;
  onAppClose: (app: any) => void;
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  gap: 10px;
  padding: 40px 15px;

  overflow-x: hidden;

  @media (min-width: 300px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export default function MobileScreenManager({
  openedApps,
  onAppClick,
  onAppClose,
}: MobileScreenManagerProps) {
  const [positions, setPositions] = useState(
    openedApps.map(() => ({ x: 0, y: 0 }))
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (openedApps.length > 0) {
      setPositions(openedApps.map(() => ({ x: 0, y: 0 })));
    } else {
      navigate('/');
    }
  }, [openedApps]);

  const handleDragStop =
    (index: number): RndDragCallback =>
    (event: DraggableEvent, data: DraggableData) => {
      const targetElement = event.target as HTMLElement;
      const parentElement = targetElement.parentElement;

      if (!parentElement) {
        return;
      }

      const parentWidth = parentElement.offsetWidth;
      const parentLeft = parentElement.getBoundingClientRect().left;

      targetElement.style.opacity = '1';

      if (data.lastX > parentWidth - 50 || data.lastX < -100) {
        onAppClose(openedApps[index]);
      } else {
        targetElement.parentElement.style.zIndex = '0';

        // Reset position to grid
        setPositions((prevPositions) => {
          const newPositions = [...prevPositions];
          newPositions[index] = { x: 0, y: 0 };
          return newPositions;
        });
      }
    };

  const [isDrag, setIsDrag] = useState(false);

  const handleDrag =
    (index: number): RndDragCallback =>
    (event: DraggableEvent, data: DraggableData) => {
      setIsDrag(true);

      const targetElement = event.target as HTMLElement;
      const parentElement = targetElement.parentElement;

      if (!parentElement) {
        return;
      }

      setPositions((prevPositions) => {
        const newPositions = [...prevPositions];
        newPositions[index] = { x: data.x, y: 0 }; // Maintain Y position relative to the grid
        return newPositions;
      });

      targetElement.style.opacity = `${Math.abs(100 / data.x)}`;

      targetElement.parentElement.style.zIndex = '1';
    };

  const variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, transition: { duration: 0.1 }, scale: 1 },
    exit: { opacity: 0, transition: { duration: 0.1 }, scale: 0 },
  };

  return (
    <div>
      <GridContainer>
        {openedApps.map((openedApp, index) => (
          <AppContainer key={index}>
            <motion.div
              initial="hidden" // Estado inicial (oculto)
              animate="visible" // Estado al montar (visible)
              exit="exit" // Estado al desmontar (oculto)
              variants={variants}
            >
              <Rnd
                position={positions[index]}
                size={{ height: 150, width: '100%' }}
                enableResizing={false}
                onDragStart={() => setIsDrag(false)}
                onDrag={handleDrag(index)}
                onDragStop={handleDragStop(index)}
                dragAxis="x"
                style={{ position: 'relative' }} // Maintain relative positioning
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'gray',
                    padding: '15px',
                    height: '100%',
                    opacity: 1,
                  }}
                  onClick={() => onAppClick(openedApp)}
                  onTouchEnd={() => {
                    !isDrag && onAppClick(openedApp);
                  }}
                >
                  <img
                    src={openedApp.icon.image}
                    style={{ width: '50px', pointerEvents: 'none' }}
                  />
                  <span
                    style={{
                      textAlign: 'center',
                      marginTop: '15px',
                      pointerEvents: 'none',
                    }}
                  >
                    {t(openedApp.name)}
                  </span>
                </div>
              </Rnd>
            </motion.div>
          </AppContainer>
        ))}
      </GridContainer>
    </div>
  );
}
