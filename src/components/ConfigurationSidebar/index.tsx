import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { SidebarContainer } from './styles';

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
