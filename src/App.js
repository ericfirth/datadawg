import React from 'react';
import './App.css';
import { useCurrentLoad } from './hooks/useCurrentLoad';
import { Statistics } from './components/Statistics';

function App() {
  const { currentLoad, getAverageForLastXTimesPolled } = useCurrentLoad();
  return (
    <div className="App">
      <Statistics
        getAverageForLastXTimesPolled={getAverageForLastXTimesPolled}
        load={currentLoad}
      />
    </div>
  );
}

export default App;
