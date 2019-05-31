import React from 'react';
import './App.css';
import useCurrentLoad from './hooks/useCurrentLoad';
import { CurrentLoad } from './components/CurrentLoad';

function App() {
  const { currentLoad } = useCurrentLoad();
  return (
    <div className="App">
      <CurrentLoad load={currentLoad} />
    </div>
  );
}

export default App;
