import React from 'react';
import LoadAverager from '../utils/LoadAverager';

const exceedsThresholdAlert = (load, time) =>
  `High load generated an alert - load = ${load}, triggered at ${time}`;
const belowThresholdAlert = time => `High threshold alert over at ${time}`;

export const useAlerts = currentLoad => {
  const twoMinuteAverage = React.useRef(new LoadAverager(120));
  const [alerts, setAlerts] = React.useState([]);
  const inAlert = React.useRef(false);

  React.useEffect(
    () => {
      if (!currentLoad) return;
      twoMinuteAverage.add(currentLoad);

      if (!inAlert.current && twoMinuteAverage.higherThan(1)) {
        inAlert.current = true;
        setAlerts([
          ...alerts,
          exceedsThresholdAlert(twoMinuteAverage.value(), currentLoad.timestamp),
        ]);
      }

      if (inAlert.current && twoMinuteAverage.lowerThan(1)) {
        inAlert.current = false;
        setAlerts([...alerts, belowThresholdAlert(currentLoad.timestamp)]);
      }
    },
    [currentLoad]
  );

  return { alerts };
};
