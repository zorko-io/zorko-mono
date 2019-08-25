import React from 'react';
import { Page } from '../ui/Page';
import { LoginForm } from './LoginForm';

export function LoginPage() {
  return (
    <Page>
      <LoginForm onSuccess={(token)=>{
        console.log('TOKEN', { token })
      }}/>
    </Page>
  );
}
