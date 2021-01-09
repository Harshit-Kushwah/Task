import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './scss/Hello.scss'
import 'jquery/dist/jquery.min.js'
import Home from './Component/Home'
ReactDOM.render(
  <React.StrictMode>
<Home/>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
