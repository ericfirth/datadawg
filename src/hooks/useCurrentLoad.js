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
  // const loads = React.useRef([]);
  const [loads, setLoads] = React.useState([]);
  const timesPolled = React.useRef(0);

  // setup polling interval
  useInterval(() => {
    get('/api/load').then(response => {
      setLoads([
        ...loads.slice(loads.length - 600, loads.length),
        response.data.load,
      ]);
      timesPolled.current++;
    });
  }, 1000);

  return {
    currentLoad: loads[loads.length - 1],
    loads,
    getAverageForLastXTimesPolled: makeGetAverage(loads),
    timesPolled,
  };
};
