import React from 'react';
import './App.css';
import Api from '@zorko/client-api';
import { LoginForm } from './LoginForm';

Api.setConfig({
  baseURL: process.env.REACT_APP_SEVER_API_URL
});

const App: React.FC = () => {

  return (
    <div className="App">
      <LoginForm onSuccess={(token)=>{
         console.log('TOKEN', { token });
      }}/>
    </div>
  );
};

export default App;
