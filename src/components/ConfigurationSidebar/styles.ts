import styled from 'styled-components';

export const SidebarContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.mainBackgroundColor};

  ul {
    list-style-type: none;
    padding: 0;

    li {
      padding: 10px 0;
      padding-left: 10px;
      display: flex;
      align-items: center;

      img {
        height: 30px;
        margin-right: 6px;
        aspect-ratio: 1 / 1;
      }

      a {
        color: #d4d4d4;
        text-decoration: none;
        color: ${({ theme }) => theme.mainTextColor};

        &:hover {
          color: ${({ theme }) => theme.secondaryTextColor};
        }
      }
    }
  }
`;
