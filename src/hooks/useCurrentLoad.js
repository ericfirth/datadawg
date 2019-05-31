import React from 'react';
import { get } from 'axios';
import { useInterval } from './useInterval';

const makeGetAverage = loads => numRelevantForAverage => {
  if (loads.length < 1) return;

  const totalRelevantLoad = loads
    .slice(loads.length - numRelevantForAverage, loads.length)
    .reduce((sum, load) => sum + load, 0);

  const numRelevantLoads =
    loads.length < numRelevantForAverage ? loads.length : numRelevantForAverage;

  return totalRelevantLoad / numRelevantLoads;
};

export const useCurrentLoad = () => {
  const [currentLoad, setCurrentLoad] = React.useState();
  // const loads = React.useRef([]);
  const [loads, setLoads] = React.useState([]);

  // setup polling interval
  useInterval(() => {
    get('/api/load').then(response => {
      setCurrentLoad(response.data.load);
      setLoads([
        ...loads.slice(loads.length - 600, loads.length),
        response.data.load,
      ]);
    });
  }, 1000);

  return {
    currentLoad,
    loads,
    getAverageForLastXTimesPolled: makeGetAverage(loads),
  };
};
