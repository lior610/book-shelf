import React from "react";

function BookList(props) {
    const books = props.Books.map((book) => 
    <Book name={ book.name } author={ book.author } pages={ book.pages } 
        languages={ book.languages }  price={ book.price } imageUrl={ book.imageUrl } />) 
}

export default BookList;