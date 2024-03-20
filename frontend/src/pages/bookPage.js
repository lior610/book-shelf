import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, Typography } from "@mui/material";
import Header from "../Components/header";
import useFetch from "../useFetch";
import { useParams } from "react-router-dom";
import LoadingIndicator from "./main"

function BookDisplay(props) {
    let book = props.book;
    let languages = book.languages.join(", ");
    let genres = book.genres.join(", ");
    return (
        <div className="bookPage">
        <Header />
        <Card raised
            style={{
                display: 'flex',
                maxWidth: '40%', // Make card smaller
                heigth: '80%',
                margin: '20px auto', // Center card with auto margins
            }}
        >
            <CardMedia
                component="img"
                image={book.book_photo_url}
                style={{
                    width: '40%',
                    height: 'auto',
                    margin: '20px 15px'
                }}
            />
            <CardContent
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center', // Center content vertically
                    alignItems: "center", // Center content horizontally
                    padding: "20px",
                    width: '60%',
                }}
            >
                <Typography variant="h5" component="h2" style={{ fontWeight: "bold", marginBottom: "20px", textAlign: "center", fontSize: "1.5rem" }}>
                    {book.name}
                </Typography>
                <Typography variant="subtitle1" component="p" style={{marginBottom: "10px", textAlign: "center", fontSize: "1.2rem"}}>
                    Written By: {book.author}
                </Typography>
                <Typography variant="body1" color="textSecondary" style={{marginBottom: "10px", textAlign: "center", fontSize: "1.1rem"}}>
                    {book.num_pages} pages<br />
                </Typography>
                <Typography variant="body1" color="textSecondary" style={{marginBottom: "10px", textAlign: "center", fontSize: "1.1rem"}}>
                    Languages: {languages}<br />
                </Typography>
                <Typography variant="body1" color="textSecondary" style={{marginBottom: "10px", textAlign: "center", fontSize: "1.1rem"}}>
                    Genres: {genres}
                </Typography>
                <Button variant="contained" color="primary" size="large" style={{marginTop: "50px"}}>
                    ONLY: {book.price}$
                </Button>
            </CardContent>
        </Card>
        </div>
    )
}

function BookPage() {
    const { bookName } = useParams();
    const { data: book, loading: booksLoading } = useFetch(`http://localhost:5001/${bookName}`);
    return (
        <>
            {booksLoading ? <LoadingIndicator loadingMessage="Loading book..." /> : <BookDisplay book={book}/>}
        </>
    );

}

export default BookPage;
