import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Api from '@zorko/client-api';

Api.setConfig({
  baseURL: process.env.REACT_APP_SEVER_API_URL
});

const App: React.FC = () => {

  useEffect( () => {
     async function fetchData() {
       try{
         await Api.loginAs({
           email: 'admin@email.com',
           password: 'qwerty'
         });

         const users = await Api.User.findMany();
         console.log('USERS: ', users);
       } catch (e) {
         console.error(e);
       }
     }

     fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
