import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { motion } from 'framer-motion';

interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    id: number;
    icon: string;
    description: string;
  }[];
}

const WeatherInfo = styled.div<{ version: 'mobile' | 'desktop' }>`
  background-color: ${({ version }) =>
    version === 'mobile' ? 'transparent' : '#ff000036'};
  border-radius: 10px;
  width: fit-content;
  position: ${({ version }) => (version === 'mobile' ? 'unset' : 'absolute')};

  top: 20px;
  right: 30px;
  padding: ${({ version }) => (version === 'mobile' ? '0' : '10px')};

  width: 190px;
  height: 118px;

  & h2 {
    font-size: 0.8rem;
  }

  & p {
    font-size: 2rem;
    padding: 0 25px 0 0;
  }

  & .weather-detail-container {
    display: flex;
    align-items: center;
  }

  & img {
    width: ${({ version }) => (version === 'mobile' ? '90px' : '100%')};
  }
`;

const WeatherWidget = ({
  version = 'desktop',
}: {
  version?: 'mobile' | 'desktop';
}) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeatherData = async () => {
      setIsLoading(true);
      try {
        const position: { coords: { latitude: number; longitude: number } } =
          await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });

        const { latitude, longitude } = position.coords;

        const response = await axios.get(
          'https://api.openweathermap.org/data/2.5/weather',
          {
            params: {
              lat: latitude,
              lon: longitude,
              appid: '3d3b9b32aebc72e5e766753be6d6e4d5',
              units: 'metric',
            },
          }
        );

        setWeatherData(response.data);
      } catch (error) {
        setError('Error al obtener la ubicación o los datos del clima');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <WeatherInfo version={version}>
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
          }}
        >
          <p style={{ textAlign: 'center', fontSize: '1rem' }}>Cargando...</p>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : weatherData ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {version === 'desktop' && <h2>{weatherData.name}</h2>}
            <div className="weather-detail-container">
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt={weatherData.weather[0].description}
              />

              <p>{weatherData.main.temp.toFixed(0)}°C</p>
            </div>
          </motion.div>
        </>
      ) : null}
    </WeatherInfo>
  );
};

export default WeatherWidget;
