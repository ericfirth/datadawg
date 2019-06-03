import React from 'react';

export const Alerts = props => (
  <div>
    <h2>Alerts</h2>
    <ul className="alert-list">
      {props.alerts.map((alert, idx) => <li key={idx}>{alert}</li>)}
    </ul>
  </div>
);
