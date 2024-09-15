import { useTranslation } from 'react-i18next';
import ContactForm from '../../ContactForm';
import '../../Desktop/styles.css';

import BaseWindow from '../BaseWindow';

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

export default function ContactWindow(props: BaseWindowProps) {
  const { t } = useTranslation();

  return (
    <BaseWindow {...props} title={t('contact')}>
      <ContactForm />
    </BaseWindow>
  );
}
