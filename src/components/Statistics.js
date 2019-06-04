import React from 'react';
import classnames from 'classnames';
import { useAverage } from '../hooks/useAverage';

const LoadIndicator = props => (
  <ul className={classnames('indicator', props.className)}>
    <li className="load-label">{props.label}</li>
    <li className="load-value">{props.load ? props.load.asPercent() : '-'}</li>
  </ul>
);

export const Statistics = props => {
  const { average: tenSecondAverage } = useAverage(props.load, 10);
  const { average: oneMinuteAverage } = useAverage(props.load, 60);
  const { average: fiveMinuteAverage } = useAverage(props.load, 300);

  return (
    <div className="basic-stats">
      <LoadIndicator load={props.load} label="Current" />
      <LoadIndicator load={tenSecondAverage} label="10s Avg" />
      <LoadIndicator load={oneMinuteAverage} label="1m Avg" />
      <LoadIndicator load={fiveMinuteAverage} label="5m Avg" />
    </div>
  );
};
