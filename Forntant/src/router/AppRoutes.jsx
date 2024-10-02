import { Route, Routes, Navigate } from "react-router-dom";
import ProtectRoute from "../components/protectRoute/ProtectRoute";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { Getcokkies } from "../pages/authentication/Getcokkies";
import React from "react";

// Import your page components
import { LoginPage } from "../pages/authentication/LoginPage";
import { RegisterPage } from "../pages/authentication/RegisterPage";
import { DashboardPage } from "../pages/DashboardPage";
import TablesPage from "../pages/TablesPage";
import Sendmessage from "../Dashboard/SendMessages";
import SendMessageForUser from "../Dashboard/SendMessageForUser";
import RecivedMessage from "../Dashboard/RecivedMessage";
import Api from "../Dashboard/pages/Api";
import ApiSecreact from "../Dashboard/pages/ApiSecreact";

const AppRoutes = () => {

    const token = Getcokkies("token");
    const user = !!token;
    console.log("AppRoutes user:", user); // Debugging
    
    return (
        <>
            <Routes>
                <Route path="/auth/login" element={
                    <ProtectRoute user={!user} redirect="/">
                        <LoginPage />
                    </ProtectRoute>
                } />
                <Route path="/auth/register" element={
                    user ? <Navigate to="/" /> : <RegisterPage />
                } />
                
                <Route element={<ProtectRoute user={user} />}>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/user/sendmessage" element={<Sendmessage />} />
                    <Route path="/whatsapp/sent" element={<SendMessageForUser />} />
                    <Route path="/whatsapp/received" element={<RecivedMessage />} />
                    <Route path="/tables" element={<TablesPage />} />
                    <Route path="/dashboard/docs" element={<Api />} />
                    <Route path="/dashboard/tools/keys" element={<ApiSecreact />} />
                </Route>
            </Routes>
        </>
    );
}

export default AppRoutes;
