import React from 'react';
import classnames from 'classnames';
import Tooltip from '@reach/tooltip';

const heightFrom = loadValue => {
  return `${loadValue * 200 > 300 ? 300 : loadValue * 200}px`;
};

export const AverageBar = props => (
  <Tooltip
    style={{
      background: 'hsla(0, 0%, 0%, 0.75)',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '0.5em 1em',
    }}
    label={`Load: ${props.load.asPercent()} from ${props.load.dateString()}`}
  >
    <li
      className={classnames(
        'bar',
        props.load.value > 1 && 'too-high',
        props.load.value > 0.8 && 'warning'
      )}
      style={{ height: heightFrom(props.load.value) }}
    />
  </Tooltip>
);
