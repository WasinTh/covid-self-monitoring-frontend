import React from 'react';
import { toast } from 'react-toastify';
import Routes from './routes/Routes';
import { BrowserRouter as Router } from "react-router-dom";

toast.configure();


function App() {
  return (
    <Router>
        <Routes />
    </Router>
  );
}

export default App;
