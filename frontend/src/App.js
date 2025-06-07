import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Main from "./pages/main";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import ForgotPassword from "./pages/forgotPassword";
import BookPage from "./pages/bookPage";
import CreateBook from "./pages/createBook";


const isAuthenticated = () => {
    // Check if the 'loggedIn' cookie exists and is set to 'True'
    return document.cookie.includes('loggedIn=True');
};


function App() {
    return (
    <Router>
        <Routes>
            {/* Define your routes here */}
            <Route path="/" element={isAuthenticated() ? <Navigate replace to="/main" />: <Login />} />
            <Route path="/main" element={isAuthenticated() ? <Main /> : <Navigate replace to="/" />} />
            <Route path="/reset-password" element={<ForgotPassword />}/>
            <Route path="/signup" element={<SignUp />}/>
            <Route path="/add" element={isAuthenticated() ? <CreateBook /> : <Navigate replace to="/" />} />
            <Route path="/:bookName" element={isAuthenticated() ? <BookPage /> : <Navigate replace to="/" />}/>
        </Routes>
    </Router>
    );
}

export default App;