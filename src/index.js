import { useState } from 'react';
import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, useLocation } from 'react-router-dom';
import App from './App';


import * as serviceWorker from './serviceWorker';

const Root = () => {
  
  return (
    // <React.StrictMode>
    <Router>
    <App/>
  </Router>
  // </React.StrictMode>e8fe00
  );
}
  ReactDOM.render(<Root/>, document.getElementById('root'))
  // If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
