import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { changeWidget } from '../../../../redux/features/theme/themeSlice';
import Switch from '../../../Switch';

import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { selectWidgets } from '../../../../redux/features/theme/themeSelectors';

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

  const widgets = useAppSelector(selectWidgets);

  const weatherWidget = widgets.find(({ name }) => name === 'weather');

  const isChecked = Boolean(weatherWidget?.visible);

  const { t } = useTranslation();

  const handleSwitchChange = () => {
    //setIsChecked(!isChecked);
    dispatch(changeWidget({ name: 'weather', show: !isChecked }));
  };

  return (
    <Container>
      <h1>{t('widgets')}</h1>
      <WidgetSwitcher>
        <span>{t('weather')}</span>
        <div>
          <img src="/images/weather_icon.png" alt="weather icon" />

          <Switch checked={isChecked} onChange={handleSwitchChange} />
        </div>
      </WidgetSwitcher>
    </Container>
  );
}
