import { useState } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainPage from './components/MainPage';
import {GoogleApiProvider} from 'react-gapi';

const App = () => {
  return (
    <GoogleApiProvider clientId={"40437059847-laiqou1tu207lp45j76b99r10lb63s4f.apps.googleusercontent.com"}>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage/>}/>
          </Routes>
        </BrowserRouter>
    </GoogleApiProvider>
  );
}

export default App