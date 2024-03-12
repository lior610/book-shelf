import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, Typography } from "@mui/material";

function Book(props){
    let languages = props.languages.join(", ");
    return (
        <Card raised 
            style={{ 
                maxWidth: 200, // Adjust the maxWidth to make the card smaller
                alignItems: "center",
                padding: "10px"
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
            <Button variant="contained" color="primary">
                Price: { props.price }$
            </Button>
        </Card>
    )
}

export default Book;
