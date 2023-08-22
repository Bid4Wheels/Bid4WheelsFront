import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Counter } from './features/counter/Counter';
import './App.css';
import { LogIn } from './features/logIn/logIn';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" Component={Counter} />
                    <Route path="/login" Component={LogIn} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
