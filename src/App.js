import React from 'react';
import './App.css';
import { useCurrentLoadEverySecond } from './hooks/useCurrentLoadEverySecond';
import { useAlerts } from './hooks/useAlerts';
import { Statistics } from './components/Statistics';
import Chart from './components/Chart';
import { Alerts } from './components/Alerts';

function App() {
  const { currentLoad } = useCurrentLoadEverySecond();
  const { alerts } = useAlerts(currentLoad);

  return (
    <div className="App">
      <Statistics load={currentLoad} />
      <Chart currentLoad={currentLoad} />
      <Alerts />
    </div>
  );
}

export default App;
