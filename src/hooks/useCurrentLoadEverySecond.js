import React from 'react';
import { get } from 'axios';
import { useInterval } from './useInterval';
import Load from '../utils/Load';

export const useCurrentLoadEverySecond = () => {
  const [load, setLoad] = React.useState();

  // setup polling interval
  useInterval(() => {
    get('/api/load').then(response => setLoad(new Load(response.data)));
  }, 1000);

  return {
    currentLoad: load,
  };
};
