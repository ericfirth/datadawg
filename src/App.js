import React from 'react';
import { useCurrentLoadEverySecond } from './hooks/useCurrentLoadEverySecond';
import { useAlerts } from './hooks/useAlerts';
import { Statistics } from './components/Statistics';
import { ChartSection } from './components/Chart';
import { Alerts } from './components/Alerts';
import './App.css';
import '@reach/tooltip/styles.css';

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
