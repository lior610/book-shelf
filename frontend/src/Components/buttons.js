import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function Logout(){
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        document.cookie = "loggedIn=True; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        // Redirect after successful submission
        window.location.reload();
    }
    return (
        <Button style={{margin: "0 10px"}} variant="contained" color="primary" onClick={ handleSubmit }>
            Logout
        </Button>
    );
}

function AddBook(){
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Redirect after successful submission
        navigate("/Add");
    }
    return (
        <Button style={{margin: "0 10px"}} variant="contained" color="primary" onClick={ handleSubmit }>
            Add a Book
        </Button>
    );
}

function MainPage(){
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Redirect after successful submission
        navigate("/main");
    }
    return (
        <Button style={{margin: "0 10px"}} variant="contained" color="primary" onClick={ handleSubmit }>
            Back to main
        </Button>
    );
}

export {Logout, AddBook, MainPage};