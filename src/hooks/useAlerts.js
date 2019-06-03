import React from 'react';
import { useAverage } from './useAverage';
import LoadAverage from '../utils/LoadAverage';

const exceedsThresholdAlert = (load, time) =>
  `High load generated an alert - load = ${load}, triggered at ${time}`;
const belowThresholdAlert = time => `High threshold alert over at ${time}`;

export const useAlerts = currentLoad => {
  const {
    average: twoMinuteAverage,
    averageCalculator: twoMinuteAverageCalculator,
  } = useAverage(currentLoad, 120, {
    liveResults: true,
    resultsBeforeThreshold: true,
  });
  const [alerts, setAlerts] = React.useState([]);
  const inAlert = React.useRef(false);

  React.useEffect(
    () => {
      if (!twoMinuteAverage) return;

      if (!inAlert.current && twoMinuteAverage.value > 0.75) {
        inAlert.current = true;
        setAlerts([
          exceedsThresholdAlert(
            twoMinuteAverage.value,
            twoMinuteAverage.dateString()
          ),
          ...alerts,
        ]);
      }

      if (inAlert.current && twoMinuteAverage.value < 0.75) {
        inAlert.current = false;
        setAlerts([belowThresholdAlert(twoMinuteAverage.dateString()), ...alerts]);
      }
    },
    [twoMinuteAverage]
  );

  return { alerts };
};
