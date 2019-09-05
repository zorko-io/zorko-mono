import * as React from 'react';
import { RouteComponentProps, RouteProps, Route, Redirect } from 'react-router';
import * as Selector from '../selectors';
import { connect } from 'react-redux';

interface PropTypes extends RouteProps {
  isAuthenticated?: boolean;
}

export function PrivateRoute({ component, ...rest }: PropTypes) {
  const Component: React.ComponentType<RouteComponentProps<any>> |
    React.ComponentType<any> | undefined = component;

  if (!rest.isAuthenticated) {
    return <Redirect to={'/'} />
  }

  return <Route {...rest} render={
    (props) => (Component ? <Component {...props} /> : null)}
  />
}

const mapStateToProps = (state: Map<string, any>, ownProps: PropTypes) => {
  return {
    isAuthenticated: Selector.Auth.isAuthenticated(state),
    ...ownProps
  }
};

// @ts-ignore
export default connect(mapStateToProps)(PrivateRoute);
