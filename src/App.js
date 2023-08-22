import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Home } from './features/profile_page/components/home/Home';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" Component={Counter} />
                    <Route path="/user/:userId" Component={Home} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
