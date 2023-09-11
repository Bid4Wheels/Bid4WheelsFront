import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignUp } from './features/signUp/SignUp';
import { LogIn } from './features/logIn/logIn';
import { ProfilePage } from './features/profilePage/components/home/ProfilePage';
import { Auction } from './features/auction/Auction';
import ValidateIdentity from './features/logIn/validateIdentity';
import CreateAuction from './features/newAuction/CreateAuction';
import { Dashboard } from './features/dashboard/Dashboard';
import { PrivateRoute } from './features/commons/PrivateRoute';
import ChangePassword from './features/logIn/changePassword';
import { inputMail } from './features/logIn/inputMail';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" Component={SignUp} />
                    <Route path="/login" Component={LogIn} />
                    <Route
                        path="/auction/:auctionId"
                        element={
                            <PrivateRoute>
                                <Auction></Auction>
                            </PrivateRoute>
                        }
                    />
                    <Route path="/changePass" Component={inputMail} />
                    <Route path="/validateIdentity" Component={ValidateIdentity} />
                    <Route
                        path="/newAuction"
                        element={
                            <PrivateRoute>
                                <CreateAuction></CreateAuction>
                            </PrivateRoute>
                        }
                    />
                    <Route path="/changePassword" Component={ChangePassword} />
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/auction/:auctionId"
                        element={
                            <PrivateRoute>
                                <Auction></Auction>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/user/:userId"
                        element={
                            <PrivateRoute>
                                <ProfilePage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/user"
                        Component={
                            <PrivateRoute>
                                <ProfilePage />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
