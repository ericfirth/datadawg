import React from 'react';
import { useAverage } from './useAverage';
import { Alerter } from '../utils/Alerter';

export const useAlerts = currentLoad => {
  const { average: twoMinuteAverage } = useAverage(currentLoad, 120, {
    liveResults: true,
    resultsBeforeThreshold: false,
  });
  const alerter = React.useRef(new Alerter());

  React.useEffect(
    () => {
      if (!twoMinuteAverage) return;
      alerter.current.updateWith(twoMinuteAverage);
    },
    [twoMinuteAverage]
  );

  return { alerts: alerter.current.alerts };
};
