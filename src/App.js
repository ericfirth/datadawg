import React from 'react';
import './App.css';
import { useCurrentLoadEverySecond } from './hooks/useCurrentLoadEverySecond';
import { useAlerts } from './hooks/useAlerts';
import { Statistics } from './components/Statistics';
import { ChartSection } from './components/Chart';
import { Alerts } from './components/Alerts';

function App() {
  const { currentLoad } = useCurrentLoadEverySecond();
  const { alerts } = useAlerts(currentLoad);

  return (
    <div className="App">
      <Statistics load={currentLoad} />
      <ChartSection currentLoad={currentLoad} />
      <Alerts alerts={alerts} />
    </div>
  );
}

export default App;
