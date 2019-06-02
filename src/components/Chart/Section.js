import React from 'react';
import { useAverageLoad } from '../../hooks/useAverageLoad';
import { AverageBar } from './AverageBar';

const hasTenMinutesOfAverages = averages => averages.length >= 60;
const oneLessThanTenMinutesOfAverages = averages =>
  hasTenMinutesOfAverages(averages) ? averages.slice(1, 60) : averages;

const columns = ['time', 'load'];
const Chart = props => {
  const { average: tenSecondAverage } = useAverageLoad(10, props.currentLoad);
  const [averages, setAverages] = React.useState([]);

  React.useEffect(
    () => {
      if (!tenSecondAverage) return;

      setAverages([...oneLessThanTenMinutesOfAverages(averages), tenSecondAverage]);
    },
    [tenSecondAverage]
  );

  return (
    <div className="chart-wrapper">
      <ul className="x-axis">
        <li>150%</li>
        <li>100%</li>
        <li>50%</li>
      </ul>
      <ul className="chart">
        {averages.map((avg, idx) => <AverageBar key={idx} load={avg} />)}
      </ul>
    </div>
  );
};

export default Chart;
