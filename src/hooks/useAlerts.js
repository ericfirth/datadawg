import React from 'react';
import LoadAverage from '../utils/LoadAverage';

const exceedsThresholdAlert = (load, time) =>
  `High load generated an alert - load = ${load}, triggered at ${time}`;
const belowThresholdAlert = time => `High threshold alert over at ${time}`;

export const useAlerts = currentLoad => {
  const twoMinuteAverage = React.useRef(new LoadAverage(120));
  const [alerts, setAlerts] = React.useState([]);
  const inAlert = React.useRef(false);

  React.useEffect(
    () => {
      if (!currentLoad) return;
      twoMinuteAverage.current.add(currentLoad);
      console.log({
        alerting: inAlert.current,
        average: twoMinuteAverage.current.value(),
      });

      if (!inAlert.current && twoMinuteAverage.current.higherThan(1)) {
        inAlert.current = true;
        setAlerts([
          exceedsThresholdAlert(
            twoMinuteAverage.current.value(),
            currentLoad.timestamp
          ),
          ...alerts,
        ]);
      }

      if (inAlert.current && twoMinuteAverage.current.lowerThan(1)) {
        inAlert.current = false;
        setAlerts([belowThresholdAlert(currentLoad.timestamp), ...alerts]);
      }
    },
    [currentLoad]
  );

  return { alerts };
};
