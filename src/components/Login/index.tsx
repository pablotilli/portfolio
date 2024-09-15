import React, { useContext, useEffect, useState } from 'react';
import {
  MainContainer,
  DateWidget,
  AvatarWidget,
  AvatarImage,
  LoginButton,
  IndicatorsBar,
} from './styles';

import Slider from '../Slider';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { handleLight } from '../../redux/features/global/globalSlice';

import { selectIsMobile } from '../../redux/features/global/globalSelectors';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface LoginProps {
  handleLogin: () => void;
}

export default function Login({ handleLogin }: LoginProps) {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const isMobile = useAppSelector(selectIsMobile);

  function getCurrentDateTime(locale: string) {
    const currentDate = new Date();

    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    };

    const formattedDate = currentDate.toLocaleDateString(locale, options);

    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');

    const formattedTime = `${hours}:${minutes}`;

    return { formattedDate, formattedTime };
  }

  const languageMappings = {
    es: {
      weekday: [
        'Domingo',
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
      ],
      month: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ],
    },
    en: {
      weekday: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      month: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    },
  };

  const [formattedDate, setFormattedDate] = useState('');
  const [formattedTime, setFormattedTime] = useState('');

  const userLanguage = navigator.language || (navigator as any).userLanguage;
  const languageCode = userLanguage.split('-')[0];

  const updateDateTime = () => {
    const dateTime = getCurrentDateTime(languageCode);

    setFormattedDate(dateTime.formattedDate);
    setFormattedTime(dateTime.formattedTime);
  };

  useEffect(() => {
    updateDateTime();

    setInterval(updateDateTime, 1000);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ height: '100%', width: '100%' }}
    >
      <MainContainer>
        {!isMobile && (
          <IndicatorsBar>
            <img className="battery-indicator" src="/images/battery.png" />
            <img src="/images/wifi.png" />
          </IndicatorsBar>
        )}
        <DateWidget>
          <div className="date">{formattedDate}</div>
          <div className="time">{formattedTime}</div>
        </DateWidget>
        <AvatarWidget>
          <AvatarImage />

          {isMobile ? (
            <>
              <div className="fingerprint-container">
                <img
                  className={`fingerprint fingerprint-visible`}
                  src="/images/fingerprint.png"
                  onClick={() => dispatch(handleLogin)}
                />
              </div>
              <Slider
                color="red"
                visible
                handleTurnOn={() => dispatch(handleLight(false))}
                translucent
                text="Slide to power off"
              />

              <div style={{ marginTop: '5px' }}>
                Touch the fingerprint sensor
              </div>
            </>
          ) : (
            <LoginButton onClick={() => dispatch(handleLogin)}>
              {t('signIn')}
            </LoginButton>
          )}
        </AvatarWidget>
      </MainContainer>
    </motion.div>
  );
}
