import React from 'react';

export const useAverageLoad = (numTimesToAverage, load) => {
  const timesPolledCounter = React.useRef(0);
  const loadAccumulator = React.useRef(0);
  const [average, setAverage] = React.useState();

  React.useEffect(
    () => {
      if (!load) return;
      timesPolledCounter.current++;
      loadAccumulator.current = loadAccumulator.current + load.value;

      if (timesPolledCounter.current === numTimesToAverage) {
        setAverage(loadAccumulator.current / numTimesToAverage);
        timesPolledCounter.current = 0;
        loadAccumulator.current = 0;
      }
    },
    [load]
  );

  return { average };
};
