import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignUp } from './features/signUp/SignUp';
import { LogIn } from './features/logIn/logIn';
import { ProfilePage } from './features/profilePage/components/home/ProfilePage';
import { PrivateRoute } from './features/commons/PrivateRoute';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<PrivateRoute />} />
                    <Route path="/signup" Component={SignUp} />
                    <Route path="/login" Component={LogIn} />
                    <Route
                        path="/user/:userId"
                        element={<PrivateRoute Component={ProfilePage} />}
                    />
                    <Route path="/user" element={<PrivateRoute Component={ProfilePage} />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
