import React from 'react';

const makeGetAverage = allLoads => numRelevantForAverage => {
  const numLogged = allLoads.length;
  if (numLogged < 1) return 0;

  const denominator =
    numLogged < numRelevantForAverage ? numLogged : numRelevantForAverage;

  return (
    allLoads
      .slice(0, numRelevantForAverage - 1)
      .reduce((sum, load) => sum + load, 0) / denominator
  );
};

export const useStatistics = currentLoad => {
  const loadsOfTheLastTenMinutes = React.useRef([]);
  const totalLoad = React.useRef(0);
  const timesPolled = React.useRef(0);
  React.useEffect(
    () => {
      if (!currentLoad) return;

      loadsOfTheLastTenMinutes.current.unshift(currentLoad);
      if (loadsOfTheLastTenMinutes.length > 600) {
        loadsOfTheLastTenMinutes.pop();
      }
      totalLoad.current = totalLoad.current + currentLoad;
      timesPolled.current++;
    },
    [currentLoad]
  );

  return {
    getAverageForLastXTimesPolled: makeGetAverage(loadsOfTheLastTenMinutes.current),
    averageFromBeginning: totalLoad.current / timesPolled.current || 0,
  };
};
