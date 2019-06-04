import React from 'react';

export const BelowThresholdAlert = props => (
  <li>High Threshold Alert over at {props.alert.loggedAt()}</li>
);
