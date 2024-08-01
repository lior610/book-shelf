import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Book(props){
    const navigate = useNavigate();
    let languages = props.languages.join(", ");
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Redirect after successful submission
        navigate(`/${ props.name }`);
      }
    return (
        <Card raised 
            style={{ 
                width: 200, // Adjust the maxWidth to make the card smaller
                height: 500,
                display: 'flex', // Use flex display
                flexDirection: 'column', // Arrange content in a column
                justifyContent: 'space-between',
                alignItems: "center",
                padding: "15px 20px"
            }}
            >
            <CardMedia
                component="img"
                image={ props.imageUrl }
                style={{
                    //width: '85%',
                    margin: "0 auto",
                    alignItems: "center"
                }}
            />
            <CardContent>
                <Typography variant="h6" component="h2" style={{ fontWeight: "bold", fontSize: "1rem" }}> {/* Adjust fontSize for title */}
                    { props.name }
                </Typography>
                <Typography variant="body1" component="p" style={{ fontSize: "0.85rem" }}> {/* Adjust fontSize for other text */}
                    Written By: { props.author }
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{ fontSize: "0.85rem" }}> {/* Adjust fontSize for other text */}
                    { props.pages } pages<br />
                    Languages: { languages }
                </Typography>
            </CardContent>
            <Button variant="contained" color="primary" onClick={ handleSubmit }>
                Price: { props.price }$
            </Button>
        </Card>
    )
}

export default Book;
