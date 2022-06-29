import { useState } from 'react';
import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, useLocation } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import { getBaseUrlPath, setBase } from "./url-util";




const Root = () => {
  
  // const [baseName, setBaseName] = useState('')
  // const basename = `/${baseName}`
  return (
    <React.StrictMode>
    <Router 
    // basename={baseName} key={baseName}
    >
    {/* Current basename – {baseName} */}
    <App
    //  setBaseName={setBaseName} 
    //  baseName={baseName}
    />
  </Router>
  </React.StrictMode>
  );
}
  ReactDOM.render(<Root/>, document.getElementById('root'))
  // If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
