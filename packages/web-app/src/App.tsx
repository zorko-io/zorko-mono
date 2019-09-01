import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from './login/LoginPage';
import { AdminPage } from './admin/AdminPage';

export function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path={'/'} component={LoginPage} />
        <Route exact={true} path={'/login'} component={LoginPage} />
        <Route exact={true} path={'/admin'} component={AdminPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
