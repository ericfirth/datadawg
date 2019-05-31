import React from 'react';
import { get } from 'axios';
import { useInterval } from './useInterval';

const useCurrentLoad = () => {
  const [currentLoad, setCurrentLoad] = React.useState();

  useInterval(() => {
    get('/api/load').then(response => {
      setCurrentLoad(response.data.oneSecond);
    });
  }, 1000);

  return { currentLoad };
};

export default useCurrentLoad;
