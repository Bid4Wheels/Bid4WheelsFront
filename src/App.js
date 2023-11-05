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
import { RouteWithHeader } from './features/commons/RouteWithHeader';
import { inputMail } from './features/logIn/inputMail';
import { ConfirmExchange } from './features/auction/ConfirmExchange';
import { NotFound } from './features/errorPage/NotFound';
import { WinningRoute } from './features/commons/WinningRoute';

//if you need to make a route private insert PrivateRoute in the element of the route,
// if you need to have the header, use RouteWithHeader in the element of the route, in case of needing both use first PrivateRoute
function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" Component={SignUp} />
                    <Route path="/login" Component={LogIn} />
                    <Route path="/validateIdentity" Component={ValidateIdentity} />
                    <Route path="/changePassword" Component={ChangePassword} />
                    <Route path="/changePass" Component={inputMail} />
                    <Route
                        path="/:userId/:auctionId"
                        element={
                            <WinningRoute>
                                <ConfirmExchange></ConfirmExchange>
                            </WinningRoute>
                        }
                    />
                    <Route
                        path="/auction/:auctionId"
                        element={
                            <PrivateRoute>
                                <RouteWithHeader>
                                    <Auction></Auction>
                                </RouteWithHeader>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/newAuction"
                        element={
                            <PrivateRoute>
                                <RouteWithHeader>
                                    <CreateAuction></CreateAuction>
                                </RouteWithHeader>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <RouteWithHeader>
                                    <Dashboard />
                                </RouteWithHeader>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/user/:userId"
                        element={
                            <PrivateRoute>
                                <RouteWithHeader>
                                    <ProfilePage />
                                </RouteWithHeader>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/user"
                        element={
                            <PrivateRoute>
                                <RouteWithHeader>
                                    <ProfilePage />
                                </RouteWithHeader>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <PrivateRoute>
                                <RouteWithHeader>
                                    <NotFound />
                                </RouteWithHeader>
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
