import { useState } from 'react';
import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { browserHistory } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { createHashHistory } from 'history'



import * as serviceWorker from './serviceWorker';

const Root = () => {
  const history = createHashHistory()
  return (
    // <React.StrictMode>
    <Router history={history}>
    <App/>
  </Router>
  // </React.StrictMode>
  );
}
  ReactDOM.render(<Root/>, document.getElementById('root'))
  // If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
