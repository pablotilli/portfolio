import styled from 'styled-components';
import MobileScreen from '..';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { selectImagesFiles } from '../../../redux/features/global/globalSelectors';
import FilesList from '../../FilesList';

const Container = styled.div`
  background-color: ${({ theme }) => theme.mainBackgroundColor};

  overflow-y: auto;

  height: 100%;
  width: 100%;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  grid-auto-rows: max-content;

  padding: 15px;
  grid-row-gap: 40px;
  grid-column-gap: 10px;
`;

export default function FileExplorerPhotosScreen() {
  const imagesFiles = useAppSelector(selectImagesFiles);

  return (
    <MobileScreen>
      <Container>
        <FilesList files={imagesFiles} />
      </Container>
    </MobileScreen>
  );
}
