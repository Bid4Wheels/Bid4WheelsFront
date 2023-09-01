import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignUp } from './features/signUp/SignUp';
import { LogIn } from './features/logIn/logIn';
import { ProfilePage } from './features/profilePage/components/home/ProfilePage';
import { Auction } from './features/auction/Auction';
import Header from './features/commons/Header';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" />
                    <Route path="/signup" Component={SignUp} />
                    <Route path="/login" Component={LogIn} />
                    <Route path="/user/:userId" Component={ProfilePage} />
                    <Route path="/user" Component={ProfilePage} />
                    <Route path="/auction/:auctionId" Component={Auction} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
