import React from 'react';
import { BelowThresholdAlert } from './BelowThresholdAlert';
import { AboveThresholdAlert } from './AboveThresholdAlert';

const alertComponents = {
  below: BelowThresholdAlert,
  above: AboveThresholdAlert,
};

export const Alerts = props => (
  <div>
    <h2>Alerts</h2>
    <ul className="alert-list">
      {props.alerts.map((alert, idx) => {
        const AlertComponent = alertComponents[alert.type];
        return <AlertComponent key={idx} alert={alert} />;
      })}
    </ul>
  </div>
);
