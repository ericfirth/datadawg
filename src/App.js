import React from 'react';
import './App.css';
import { useCurrentLoad } from './hooks/useCurrentLoad';
import { useStatistics } from './hooks/useStatistics';
import { CurrentLoad } from './components/CurrentLoad';

function App() {
  const { currentLoad } = useCurrentLoad();
  const { getAverageForLastXTimesPolled, averageFromBeginning } = useStatistics(
    currentLoad
  );
  return (
    <div className="App">
      <CurrentLoad load={currentLoad} />
      <ul>
        <li>10s: {getAverageForLastXTimesPolled(10)}</li>
        <li>1m: {getAverageForLastXTimesPolled(60)}</li>
        <li>2m: {getAverageForLastXTimesPolled(120)}</li>
        <li>total: {averageFromBeginning}</li>
      </ul>
    </div>
  );
}

export default App;
