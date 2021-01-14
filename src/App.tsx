import React, { Suspense } from 'react';
import './App.css';
import UserMainPage from './components/User';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <UserMainPage/>
    </Suspense>
  );
}

export default App;
