import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import 'antd/dist/antd.css';
import './index.less';
import './services';
import reportWebVitals from './reportWebVitals';
import { baseRoutesConfig, routesConfig } from './routes';
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
          {baseRoutesConfig.map(route => {
            return <Route key={route.path} path={route.path} component={route.component} />
          })}
          {routesConfig.map(route => {
            return <Route key={route.path} path={route.path} component={route.component} />
          })}
          <Redirect from='*' to='/home' />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
