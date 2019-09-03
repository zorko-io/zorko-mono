import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from './features/login/LoginPage';
import AdminPage from './features/admin/AdminPage';
import HomePage from './features/home/HomePage';
import PrivateRoute from './auth/PrivateRoute';
import NotFoundPage from './ui/NotFoundPage';

export function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path={'/'} component={LoginPage} />
        <Route exact={true} path={'/login'} component={LoginPage} />
        <PrivateRoute exact={true} path={'/admin'} component={AdminPage} />
        <PrivateRoute exact={true} path={'/home'} component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
