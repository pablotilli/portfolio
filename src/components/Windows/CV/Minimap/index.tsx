import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const MinimapContainer = styled.div`
  margin-left: 10px;
  border: 1px solid #ccc;
  position: relative;
  overflow-y: scroll;
  height: 100%;
  /*   width: 120px; */
`;

const MinimapContent = styled.div<{ scale: number }>`
  transform: scale(${(props) => props.scale});
  transform-origin: top left;
  width: ${(props) => 100 / props.scale}%;
  position: relative;
`;

const ViewportIndicator = styled.div<{ top: number; height: number }>`
  position: absolute;
  left: 0;
  right: 0;
  top: ${(props) => props.top}px;
  height: ${(props) => props.height}px;
  border: 2px solid rgba(0, 0, 255, 0.5);
  background-color: #ff000045;
  box-sizing: border-box;
  pointer-events: none;
`;

interface MinimapProps {
  contentRef: React.RefObject<HTMLDivElement>;
}

const Minimap: React.FC<MinimapProps> = ({ contentRef }) => {
  const [scale] = useState<number>(0.2);
  const [scrolling, setScrolling] = useState<'minimap' | 'content' | null>(
    null
  );
  const [viewport, setViewport] = useState({ top: 0, height: 0 });

  // Manejar el scroll del minimap
  const handleMinimapScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (contentRef.current && scrolling !== 'content') {
      setScrolling('minimap');
      const minimapScrollTop = e.currentTarget.scrollTop;
      const contentScrollTop = minimapScrollTop; /* / scale */
      contentRef.current.scrollTo({
        top: contentScrollTop,
        behavior: 'auto',
      });
      setScrolling(null);
    }
  };

  // Sincronizar el scroll del contenido principal con el minimap
  useEffect(() => {
    const handleMainScroll = () => {
      if (contentRef.current && scrolling !== 'minimap') {
        setScrolling('content');
        const mainScrollTop = contentRef.current.scrollTop;
        const minimap = document.getElementById(
          'minimapContainer'
        ) as HTMLElement;
        const visibleArea = minimap.clientHeight;

        const minimapScrollTop = minimap.scrollTop;
        const minimapScrollBottom = minimapScrollTop + visibleArea;
        const viewportTop = mainScrollTop; /* * scale */
        const viewportBottom =
          viewportTop + contentRef.current.clientHeight; /* * scale */

        // Solo mover el minimap si la vista actual está fuera del área visible del minimap
        /*    if (
          viewportTop < minimapScrollTop ||
          viewportBottom > minimapScrollBottom
        ) { */
        minimap.scrollTop = viewportTop;
        /*   } */

        setViewport({
          top: viewportTop,
          height: contentRef.current.clientHeight /* * scale */,
        });
        setScrolling(null);
      }
    };

    if (contentRef.current) {
      contentRef.current.addEventListener('scroll', handleMainScroll);
    }

    return () => {
      if (contentRef.current) {
        contentRef.current.removeEventListener('scroll', handleMainScroll);
      }
    };
  }, [contentRef, scale, scrolling]);

  return (
    <MinimapContainer id="minimapContainer" onScroll={handleMinimapScroll}>
      <MinimapContent scale={scale}>
        <div
          dangerouslySetInnerHTML={{
            __html: contentRef.current?.innerHTML || '',
          }}
        />
        <ViewportIndicator top={viewport.top} height={viewport.height} />
      </MinimapContent>
    </MinimapContainer>
  );
};

export default Minimap;
