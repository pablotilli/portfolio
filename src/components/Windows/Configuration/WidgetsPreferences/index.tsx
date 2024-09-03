import React, { useState } from 'react';
import { useAppDispatch } from '../../../../hooks/reduxHooks';
import { changeWidget } from '../../../../redux/features/theme/themeSlice';
import Switch from '../../../Switch';

import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const WidgetSwitcher = styled.div`
  border: 1px solid gray;
  padding: 7px;
  display: flex;
  flex-direction: column;

  width: 250px;
  margin: 15px;
  border-radius: 8px;

  div {
    display: flex;
    justify-content: space-around;
    align-items: center;

    img {
      width: 100px;
    }
  }
`;

export default function WidgetsPreferences() {
  const dispatch = useAppDispatch();

  const [isChecked, setIsChecked] = useState(true);

  const { t } = useTranslation();

  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
    dispatch(changeWidget({ name: 'weather', show: !isChecked }));
  };

  return (
    <div>
      <WidgetSwitcher>
        <span>{t('weather')}</span>
        <div>
          <img src="/images/weather_icon.png" alt="weather icon" />

          <Switch checked={isChecked} onChange={handleSwitchChange} />
        </div>
      </WidgetSwitcher>
    </div>
  );
}
