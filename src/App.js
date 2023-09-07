import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignUp } from './features/signUp/SignUp';
import { LogIn } from './features/logIn/logIn';
import { ProfilePage } from './features/profilePage/components/home/ProfilePage';
import { PrivateRoute } from './features/commons/PrivateRoute';
import { Auction } from './features/auction/Auction';
import ValidateIdentity from './features/logIn/validateIdentity';
import ChangePassword from './features/logIn/changePassword';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" Component={SignUp} />
                    <Route path="/login" Component={LogIn} />
                    <Route path="/validateIdentity" Component={ValidateIdentity} />
                    <Route path="/changePassword" Component={ChangePassword} />
                </Routes>
                <PrivateRoute>
                    <Routes>
                        <Route path="/" />
                        <Route path="/auction/:auctionId" Component={Auction} />
                        <Route path="/user/:userId" Component={ProfilePage} />
                        <Route path="/user" Component={ProfilePage} />
                    </Routes>
                </PrivateRoute>
            </BrowserRouter>
        </div>
    );
}

export default App;
