import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignUp } from './features/signUp/SignUp';
import { LogIn } from './features/logIn/logIn';
import { ProfilePage } from './features/profilePage/components/home/ProfilePage';
import { Auction } from './features/auction/Auction';
import Header from './features/commons/Header';
import ValidateIdentity from './features/logIn/validateIdentity';
import CreateAuction from './features/newAuction/CreateAuction';
import { Dashboard } from './features/dashboard/Dashboard';
import { PrivateRoute } from './features/commons/PrivateRoute';
import ChangePassword from './features/logIn/changePassword';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" Component={SignUp} />
                    <Route path="/login" Component={LogIn} />
                    <Route path="/user/:userId" Component={ProfilePage} />
                    <Route path="/user" Component={ProfilePage} />
                    <Route path="/auction/:auctionId" Component={Auction} />
                    <Route path="/validateIdentity" Component={ValidateIdentity} />
                    <Route path="/newAuction" Component={CreateAuction} />
                    <Route path="/changePassword" Component={ChangePassword} />
                </Routes>
                <PrivateRoute>
                    <Routes>
                        <Route path="/" Component={Dashboard} />
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
