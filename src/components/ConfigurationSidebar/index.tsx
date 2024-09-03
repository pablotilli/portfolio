import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const SidebarContainer = styled.div`
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

const ConfigurationSidebar = () => {
  const { t } = useTranslation();

  return (
    <SidebarContainer>
      <ul>
        <li>
          <img src="/images/wallpaper_preferences_icon.png" alt="" />
          <Link to="/wallpaper">{t('wallpaper')}</Link>
        </li>
        <li>
          <img src="/images/appearence_icon.png" alt="" />
          <Link to="/appearence">{t('appearence')}</Link>
        </li>
        <li>
          <img src="/images/language_and_region_icon.png" alt="" />
          <Link to="/language">{t('language')}</Link>
        </li>
        <li>
          <img src="/images/widgets_preferences_icon.png" alt="" />
          <Link to="/widgets">{t('widgets')}</Link>
        </li>
      </ul>
    </SidebarContainer>
  );
};

export default ConfigurationSidebar;
