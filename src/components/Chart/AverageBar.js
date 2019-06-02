import React from 'react';
import classnames from 'classnames';

const heightFrom = load => {
  return `${load * 200 > 300 ? 300 : load * 200}px`;
};

export const AverageBar = props => (
  <li
    className={classnames(
      'bar',
      props.load > 1 && 'too-high',
      props.load > 0.8 && 'warning'
    )}
    style={{ height: heightFrom(props.load) }}
  />
);
