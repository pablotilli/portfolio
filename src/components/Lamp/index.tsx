import React, { useContext, useEffect, useState } from 'react';

import './styles.css';

/* import { globalContext } from '../../contexts/globalContext'; */

interface LampProps {
  onChange: (state: boolean) => void;
  blink: boolean;
}

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  handleLogin,
  handleLogout,
  handleLight,
  handleAnimateIntro,
  setIsMobile,
} from '../../redux/features/global/globalSlice';

import {
  selectIsLogged,
  selectIsMobile,
  selectLightOn,
  selectAnimateIntro,
} from '../../redux/features/global/globalSelectors';

export default function Lamp({ onChange, blink }: LampProps) {
  //const { lightOn, handleLight } = useContext(globalContext);

  /*   const [lightOn, setLightOn] = useState(false); */
  const lightOn = useAppSelector(selectLightOn);

  const dispatch = useAppDispatch();

  useEffect(() => {
    onChange(lightOn);
  }, [lightOn]);

  return (
    <div className="lamp-container">
      <div className="ligth-container">
        <img
          src="/images/lamp.png"
          alt=""
          className={blink ? 'lamp-blink' : ''}
          onClick={() => dispatch(handleLight(!lightOn))}
        />
      </div>
    </div>
  );
}
