import React from 'react';

const LoadIndicator = props => (
  <ul className="indicator">
    <li className="load-value">
      {props.load
        ? props.load.value.toLocaleString(undefined, { maximumSignificantDigits: 3 })
        : '-'}
    </li>
    <li className="load-label">{props.label}</li>
  </ul>
);

export const Statistics = props => {
  return (
    <div className="basic-stats">
      <LoadIndicator load={props.load} label="Current" />
      {/* <LoadIndicator */}
      {/* value={props.getAverageForLastXTimesPolled(10)} */}
      {/* label="10s Avg" */}
      {/* /> */}
      {/* <LoadIndicator */}
      {/* value={props.getAverageForLastXTimesPolled(60)} */}
      {/* label="1m Avg" */}
      {/* /> */}
      {/* <LoadIndicator */}
      {/* value={props.getAverageForLastXTimesPolled(300)} */}
      {/* label="5m Avg" */}
      {/* /> */}
    </div>
  );
};
