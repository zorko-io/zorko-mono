import React from 'react';
import { Page } from '../ui/Page';
import { LoginForm } from './LoginForm';
import { RouterProps } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { authTokenSet } from '../core/auth';
import { TokenDto } from '@zorko/dto';

export interface PropTypes extends RouterProps{
  onLoginSuccess: (token: TokenDto) => void
}

export function LoginPage(props: PropTypes) {
  return (
    <Page>
      <span>Login</span>
      <LoginForm onSuccess={(token)=>{
        props.onLoginSuccess(token);
        props.history.push('/home');
      }}/>
    </Page>
  );
}

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators(
    {
      onLoginSuccess: authTokenSet
    },
    dispatch
  );

// @ts-ignore
export default connect(null, mapDispatchToProps)(LoginPage)
