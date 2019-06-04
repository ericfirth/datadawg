import React from 'react';
import { AverageBar } from './AverageBar';
import { useAverage } from '../../hooks/useAverage';

const hasTenMinutesOfAverages = averages => averages.length >= 60;
const oneLessThanTenMinutesOfAverages = averages =>
  hasTenMinutesOfAverages(averages) ? averages.slice(1, 60) : averages;

const Chart = props => {
  const { average: tenSecondAverage } = useAverage(props.currentLoad, 10, {
    liveResults: false,
    resultsBeforeThreshold: false,
  });
  const [averages, setAverages] = React.useState([]);

  React.useEffect(
    () => {
      if (!tenSecondAverage) return;

      setAverages([...oneLessThanTenMinutesOfAverages(averages), tenSecondAverage]);
    },
    [tenSecondAverage]
  );

  return (
    <>
      <h2>Last Ten Minutes of Load</h2>
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
    </>
  );
};

export default Chart;
