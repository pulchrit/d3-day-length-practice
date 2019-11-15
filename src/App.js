import React from 'react';
import Header from './Header';
import Chart from './Chart';
import ChartDescription from './ChartDescription';
import Footer from './Footer';
import './App.css';


const App = () => {
  return (
    <div className="App">
      <Header />
      
      <Chart 
        width={800}
        height={600}
        padding={40}
      />

      <ChartDescription />
     
      <Footer />
    </div>
    
  );
}

export default App;
