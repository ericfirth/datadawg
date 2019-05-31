import React from 'react';
import { get } from 'axios';
import { useInterval } from './useInterval';

export const useCurrentLoad = () => {
  const [currentLoad, setCurrentLoad] = React.useState();

  useInterval(() => {
    get('/api/load').then(response => {
      setCurrentLoad(response.data.load);
    });
  }, 1000);

  return { currentLoad };
};
