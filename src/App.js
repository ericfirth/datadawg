import React from 'react';
import './App.css';
import { useCurrentLoad } from './hooks/useCurrentLoad';
import { Statistics } from './components/Statistics';
import { Chart } from './components/Chart';
import { Alerts } from './components/Alerts';

function App() {
  const {
    currentLoad,
  } = useCurrentLoad();

  return (
    <div className="App">
      <Statistics
        load={currentLoad}
      />
      <Chart currentLoad={currentLoad} />
      <Alerts />
    </div>
  );
}

export default App;
