import React from 'react';
import Chart from './Chart';
import './App.css';

const App = () => {
  return (
    <div className="App">
      {/* add header component */}
      <Chart 
        width={800}
        height={600}
      />
      {/* add footer component */}
    </div>
  );
}

export default App;
