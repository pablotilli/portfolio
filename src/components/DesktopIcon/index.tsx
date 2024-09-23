import styled from 'styled-components';
import './styles.css';
import { Rnd } from 'react-rnd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type Size = {
  width: string | number;
  height: string | number;
};

interface DesktopIconProps {
  onClick: (data: {
    name: string;
    target: string;
    icon: { image: string; dockRef: React.RefObject<HTMLLIElement> };
  }) => void;
  appData: {
    name: string;
    target: string;
    icon: {
      image: string;
      dockRef: React.RefObject<HTMLLIElement>;
      defaultPosition: {
        desktop: { x: number; y: number } & Size;
        mobile: { x: number; y: number } & Size;
      };
    };
  };
  size: 'desktop' | 'mobile';
}

const DesktopIconImage = styled.img`
  width: 100%;
  pointer-events: none;
`;

export default function DesktopIcon({
  onClick: handleClick,
  appData,
  size = 'desktop',
}: DesktopIconProps) {
  const { t } = useTranslation();

  const [canClick, setCanClick] = useState(true);

  return (
    <Rnd
      onClick={() => canClick && handleClick(appData)}
      onDrag={() => setCanClick(false)}
      enableResizing={false}
      onDragStop={() => {
        setTimeout(() => setCanClick(true), 1);
      }}
      default={appData.icon.defaultPosition[size]}
    >
      <div
        style={{ width: `${size === 'desktop' ? '4vw' : '70px'}` }}
        className="desktop-icon"
      >
        <div className="desktop-icon-image">
          <DesktopIconImage src={appData.icon.image} alt="" />
        </div>
        <div
          style={{
            fontSize: `${size === 'desktop' ? '1rem' : '0.8rem'}`,
            textAlign: 'center',
          }}
        >
          {t(appData.name)}
        </div>
      </div>
    </Rnd>
  );
}
