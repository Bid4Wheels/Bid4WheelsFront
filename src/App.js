import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Counter } from './features/counter/Counter';
import { SignUp } from './features/signUp/SignUp';
import './App.css';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" Component={Counter} />
                    <Route path="/signup" Component={SignUp} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
