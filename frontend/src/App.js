    import React from "react";
    import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
    import Main from "./pages/main";
    import Login from "./pages/login"

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
            </Routes>
        </Router>
        );
    }

    export default App;