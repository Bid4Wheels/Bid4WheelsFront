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
import { RoutesWithHeader } from './features/commons/RoutesWithHeader';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" Component={SignUp} />
                    <Route path="/login" Component={LogIn} />
                    <Route path="/validateIdentity" Component={ValidateIdentity} />
                    <Route path="/changePassword" Component={ChangePassword} />
                    <Route
                        path="/auction/:auctionId"
                        element={
                            <PrivateRoute>
                                <RoutesWithHeader>
                                    <Auction></Auction>
                                </RoutesWithHeader>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/newAuction"
                        element={
                            <PrivateRoute>
                                <RoutesWithHeader>
                                    <CreateAuction></CreateAuction>
                                </RoutesWithHeader>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <RoutesWithHeader>
                                    <Dashboard />
                                </RoutesWithHeader>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/auction/:auctionId"
                        element={
                            <PrivateRoute>
                                <RoutesWithHeader>
                                    <Auction></Auction>
                                </RoutesWithHeader>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/user/:userId"
                        element={
                            <PrivateRoute>
                                <RoutesWithHeader>
                                    <ProfilePage />
                                </RoutesWithHeader>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/user"
                        element={
                            <PrivateRoute>
                                <RoutesWithHeader>
                                    <ProfilePage />
                                </RoutesWithHeader>
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
