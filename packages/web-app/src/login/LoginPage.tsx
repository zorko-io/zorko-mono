import React from 'react';
import { Page } from '../ui/Page';
import { LoginForm } from './LoginForm';
import { RouterProps } from 'react-router';

export interface PropTypes extends RouterProps{}

export function LoginPage(props: PropTypes) {
  return (
    <Page>
      <span>Login</span>
      <LoginForm onSuccess={(token)=>{
        console.log('Persist token', { token });
        props.history.push('/admin');
      }}/>
    </Page>
  );
}
