import { SplitPane } from '@andrewray/react-multi-split-pane';

import BaseWindow from '../BaseWindow/index';

import '../../Desktop/styles.css';
import ConfigurationSidebar from '../../ConfigurationSidebar';

import { Route, Routes } from 'react-router-dom';
import WallpaperPerferences from './WallpaperPreferences';
import AppearencePreferences from './AppearencePreferences';
import LanguagePreferences from './LanguagePreferences';
import WidgetsPreferences from './WidgetsPreferences';
import { useTranslation } from 'react-i18next';

interface BaseWindowProps {
  handleWindow: (event: string, windowName: string, data: any) => void; // Ajusta el tipo según sea necesario
  window: any; // Ajusta el tipo según sea necesario
  handleWindowNEW: (info: Array<any>) => void; // Ajusta el tipo según sea necesario

  windowName: string;
  activeDockIconPosition: { x: number; y: number };
  backgroundColor?: string;
  handleActiveWindow: (activeWindowName: string) => void; // Ajusta el tipo según sea necesario
  isActiveWindow: boolean;
  visible: boolean;
}

export default function ConfigurationWindow(props: BaseWindowProps) {
  const { t } = useTranslation();

  return (
    <BaseWindow {...props} title={t('preferences')}>
      <SplitPane
        split="vertical"
        minSize={[100, 300]}
        defaultSizes={[150, 500]}
        className="split-pane"
      >
        <ConfigurationSidebar />

        <Routes>
          <Route path="/wallpaper" element={<WallpaperPerferences />} />
          <Route path="/appearence" element={<AppearencePreferences />} />
          <Route path="/language" element={<LanguagePreferences />} />
          <Route path="/widgets" element={<WidgetsPreferences />} />
          <Route path="*" element={<WallpaperPerferences />} />
        </Routes>
      </SplitPane>
    </BaseWindow>
  );
}
