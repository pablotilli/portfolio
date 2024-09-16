import { useAppDispatch } from '../../../../hooks/reduxHooks';
import { setWallpaper } from '../../../../redux/features/theme/themeSlice';
import styled from 'styled-components';
import CategoryContainer from './CategoryContainer';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  width: 100%;

  h1 {
    font-size: 1rem;
    font-weight: normal;
    margin-bottom: 15px;
    margin-left: 10px;

    color: ${({ theme }) => theme.mainTextColor};
  }
`;

const WallpapersContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  overflow-y: auto;
  height: 100%;
`;

export default function WallpaperPerferences() {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  interface Wallpaper {
    name: string;
    fileName: string;
  }

  const handleWallpaperClick = (categoryName: string, wallpaper: Wallpaper) => {
    if (!isLoading) {
      setIsLoading(true);

      dispatch(
        setWallpaper(`wallpapers/${categoryName}/${wallpaper.fileName}`)
      );

      setTimeout(() => setIsLoading(false), 500);
    }
  };

  return (
    <Container>
      <h1>{t('wallpaper')}</h1>
      <WallpapersContainer>
        <CategoryContainer title="Abstract" onClick={handleWallpaperClick} />

        <CategoryContainer title="Landscape" onClick={handleWallpaperClick} />
        <CategoryContainer title="Cityscape" onClick={handleWallpaperClick} />
        <CategoryContainer title="Underwater" onClick={handleWallpaperClick} />
        <CategoryContainer title="Earth" onClick={handleWallpaperClick} />
      </WallpapersContainer>
    </Container>
  );
}
