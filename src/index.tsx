import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import 'antd/dist/antd.css';
import { Provider } from 'react-redux'
import { store } from './store';

import './index.scss';
import './services';
import reportWebVitals from './reportWebVitals';
import { baseRoutesConfig, routesConfig, RouteWithSubRoutes } from './routes';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Switch>
            {baseRoutesConfig.map(route => {
              return <Route key={route.path} path={route.path} component={route.component} />
            })}
            {routesConfig.map(route => {
              return <RouteWithSubRoutes key={route.path} {...route}/>
            })}
            <Redirect from='*' to='/home' />
        </Switch>
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
