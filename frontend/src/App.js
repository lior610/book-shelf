    import React from "react";
    import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
    import Main from "./pages/main";
    import Login from "./pages/login";
    import SignUp from "./pages/signUp";
    import ForgotPassword from "./pages/forgotPassword";

    const isAuthenticated = () => {
        // Check if the 'loggedIn' cookie exists
        return document.cookie.includes('loggedIn=True');
    };

    function App() {
        return (
        <Router>
            <Routes>
                {/* Define your routes */}
                <Route path="/" element={isAuthenticated() ? <Navigate replace to="/main" />: <Login />} />
                <Route path="/main" element={isAuthenticated() ? <Main /> : <Navigate replace to="/" />} />
                <Route path="/reset-password" element={<ForgotPassword />}/>
                <Route path="/signup" element={<SignUp />}/>
            </Routes>
        </Router>
        );
    }

    export default App;