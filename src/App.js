import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignUp } from './features/signUp/SignUp';
import { LogIn } from './features/logIn/logIn';
import { ProfilePage } from './features/profilePage/components/home/ProfilePage';
import Header from './features/commons/Header';
import { Dashboard } from './features/dashboard/Dashboard';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" Component={Dashboard} />
                    <Route path="/signup" Component={SignUp} />
                    <Route path="/login" Component={LogIn} />
                    <Route path="/user/:userId" Component={ProfilePage} />
                    <Route path="/user" Component={ProfilePage} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
