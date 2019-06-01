import React from 'react';
import './App.css';
import { useCurrentLoad } from './hooks/useCurrentLoad';
import { Statistics } from './components/Statistics';
import { Chart } from './components/Chart';
import { Alerts } from './components/Alerts';

function App() {
  const {
    currentLoad,
    getAverageForLastXTimesPolled,
    timesPolled,
  } = useCurrentLoad();

  return (
    <div className="App">
      <Statistics
        getAverageForLastXTimesPolled={getAverageForLastXTimesPolled}
        load={currentLoad}
      />
      <Chart getTenSecondAverage={'hi'} currentLoad={currentLoad} />
      <Alerts />
    </div>
  );
}

export default App;
