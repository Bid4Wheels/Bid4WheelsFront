import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Counter } from './features/counter/Counter';
import './App.css';
import { ProfileTest } from './features/counter/profile/profileTest';
import { EditProfileModal } from './features/counter/profile/editProfile';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" Component={Counter} />
                    <Route path="/user/${userId}" Component={ProfileTest}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
