import React from 'react';
import { useAverageLoad } from '../hooks/useAverageLoad';

const hasTenMinutesOfAverages = averages => averages.length >= 60;
const oneLessThanTenMinutesOfAverages = averages =>
  hasTenMinutesOfAverages(averages) ? averages.slice(1, 60) : averages;

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

  console.log(averages);
  return <div>averages: {averages.toLocaleString()}</div>;
};

export default Chart;
