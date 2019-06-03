import React from 'react';
import LoadAverage from '../utils/LoadAverage';

export const useAverage = (
  load,
  numToAverage,
  { liveResults, resultsBeforeThreshold } = {
    liveResults: true,
    resultsBeforeThreshold: true,
  }
) => {
  const averageCalculator = React.useRef(
    new LoadAverage(numToAverage, { resultsBeforeThreshold })
  );
  const timesPolledCounter = React.useRef(0);
  const [average, setAverage] = React.useState();

  React.useEffect(
    () => {
      if (!load) return;
      averageCalculator.current.add(load);
      timesPolledCounter.current++;

      if (!liveResults && timesPolledCounter.current >= numToAverage) {
        setAverage(averageCalculator.current.valueAsLoad());
        timesPolledCounter.current = 0;
        return;
      }

      if (liveResults) {
        setAverage(averageCalculator.current.valueAsLoad());
      }
    },
    [load, numToAverage, liveResults]
  );

  return { average, averageCalculator };
};
