import styled from 'styled-components';

interface Wallpaper {
  name: string;
  fileName: string;
}

interface WallpaperCategory {
  categoryName: string;
  wallpapers: Wallpaper[];
}

const wallpapers: WallpaperCategory[] = [
  {
    categoryName: 'Abstract',
    wallpapers: [
      {
        name: 'Wallaper 1',
        fileName: '1.jpg',
      },
      {
        name: 'Wallaper 2',
        fileName: '2.jpg',
      },
      {
        name: 'Wallaper 3',
        fileName: '3.jpg',
      },
    ],
  },
  {
    categoryName: 'Cityscape',
    wallpapers: [
      {
        name: 'Wallaper 1',
        fileName: '1.jpg',
      },
      {
        name: 'Wallaper 2',
        fileName: '2.jpg',
      },
      {
        name: 'Wallaper 3',
        fileName: '3.jpg',
      },
    ],
  },
  {
    categoryName: 'Landscape',
    wallpapers: [
      {
        name: 'Wallaper 1',
        fileName: '1.jpg',
      },
      {
        name: 'Wallaper 1',
        fileName: '2.jpg',
      },
      {
        name: 'Wallaper 1',
        fileName: '3.jpg',
      },
      {
        name: 'Wallaper 1',
        fileName: '4.jpg',
      },
    ],
  },
  {
    categoryName: 'Underwater',
    wallpapers: [
      {
        name: 'Wallaper 1',
        fileName: '1.jpg',
      },
      {
        name: 'Wallaper 1',
        fileName: '2.jpg',
      },
      {
        name: 'Wallaper 1',
        fileName: '3.jpg',
      },
      {
        name: 'Wallaper 1',
        fileName: '4.jpg',
      },
    ],
  },
  {
    categoryName: 'Earth',
    wallpapers: [
      {
        name: 'Wallaper 1',
        fileName: '1.jpg',
      },
      {
        name: 'Wallaper 2',
        fileName: '2.jpg',
      },
      {
        name: 'Wallaper 3',
        fileName: '3.jpg',
      },
    ],
  },
];

const Container = styled.div`
  padding: 15px;
`;

const Title = styled.div`
  padding: 15px 0;
`;

const WallpaperThumbnailsContainer = styled.div`
  display: grid;

  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 15px;
`;

const WallpaperThumbnail = styled.div<{ image: string }>`
  height: 110px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  border-radius: 7px;

  border: 1px solid gray;
`;

const getWallpapers = (categoryName: string): Wallpaper[] => {
  return (
    wallpapers.find((wallpaper) => wallpaper.categoryName === categoryName)
      ?.wallpapers || []
  );
};

export default function CategoryContainer({
  title,
  onClick,
}: {
  title: string;
  onClick: (categoryName: string, wallpaper: Wallpaper) => void;
}) {
  return (
    <Container>
      <Title>{title}</Title>
      <WallpaperThumbnailsContainer>
        {getWallpapers(title).map((wallpaper) => (
          <WallpaperThumbnail
            onClick={() => onClick(title, wallpaper)}
            image={`/images/wallpapers/${title.toLocaleLowerCase()}/thumbnails/${
              wallpaper.fileName
            }`}
          />
        ))}
      </WallpaperThumbnailsContainer>
    </Container>
  );
}
