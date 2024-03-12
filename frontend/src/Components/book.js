import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, Typography } from "@mui/material";

function Book(props){
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
                image="https://m.media-amazon.com/images/I/61I24wOsn8L._AC_UF1000,1000_QL80_.jpg"
                style={{
                    //width: '85%',
                    margin: "0 auto",
                    alignItems: "center"
                }}
            />
            <CardContent>
                <Typography variant="h6" component="h2" style={{ fontWeight: "bold", fontSize: "1rem" }}> {/* Adjust fontSize for title */}
                    The Hunger Games
                </Typography>
                <Typography variant="body1" component="p" style={{ fontSize: "0.85rem" }}> {/* Adjust fontSize for other text */}
                    Written By: Suzan Collines
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{ fontSize: "0.85rem" }}> {/* Adjust fontSize for other text */}
                    496 pages<br />
                    Languages: Hebrew, English
                </Typography>
            </CardContent>
            <Button variant="contained" color="primary">
                Price: 14.99$
            </Button>
        </Card>
    )
}

export default Book;
