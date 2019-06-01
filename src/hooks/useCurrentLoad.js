import React from 'react';
import { get } from 'axios';
import { useInterval } from './useInterval';

// const makeGetAverage = loads => numRelevantForAverage => {
//   if (loads.length < 1) return;

// const totalRelevantLoad = loads
//   .slice(loads.length - numRelevantForAverage, loads.length)
//   .reduce((sum, load) => sum + load, 0);

// const numRelevantLoads =
//   loads.length < numRelevantForAverage ? loads.length : numRelevantForAverage;

// return totalRelevantLoad / numRelevantLoads;
// };

export const useCurrentLoad = () => {
  const [load, setLoad] = React.useState();

  // setup polling interval
  useInterval(() => {
    get('/api/load').then(response => setLoad(response.data));
  }, 1000);

  return {
    currentLoad: load,
  };
};
