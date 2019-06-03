import React from 'react';
import classnames from 'classnames';

const heightFrom = loadValue => {
  return `${loadValue * 200 > 300 ? 300 : loadValue * 200}px`;
};

export const AverageBar = props => (
  <li
    className={classnames(
      'bar',
      props.load.value > 1 && 'too-high',
      props.load.value > 0.8 && 'warning'
    )}
    style={{ height: heightFrom(props.load.value) }}
  />
);
