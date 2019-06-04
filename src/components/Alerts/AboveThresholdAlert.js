import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

export const AboveThresholdAlert = props => (
  <li>
    <FontAwesomeIcon icon={faExclamationTriangle} />
    High load generated an alert - load = {props.alert.load()}, triggered at{' '}
    {props.alert.loggedAt()}
  </li>
);
