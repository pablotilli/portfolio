import styled from 'styled-components';
import './styles.css';

import { useTranslation } from 'react-i18next';

type Size = {
  width: string | number;
  height: string | number;
};

interface MobileIconProps {
  text: string;
  image: string;
}

const DesktopIconImage = styled.img`
  width: 100%;
  pointer-events: none;
`;

export default function MobileIcon({ text, image }: MobileIconProps) {
  const { t } = useTranslation();

  return (
    <div
      className="desktop-icon"
      style={{ width: '100%', textAlign: 'center' }}
    >
      <div
        className="desktop-icon-image"
        style={{
          width: '70%',
          maxWidth: '60px',
        }}
      >
        <DesktopIconImage src={image} alt="" />
      </div>
      <div style={{ fontSize: '0.8rem' }} className="text">
        {t(text)}
      </div>
    </div>
  );
}
