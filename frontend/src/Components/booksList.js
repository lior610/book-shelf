import React from "react";
import Book from "./book";

function BookList(props) {
  const books = props.books.map((book) => (
    <div key={book.name} style={{ flex: "1 0 auto", margin: "10px", maxWidth: "250px" }}>
      <Book
        name={book.name}
        author={book.author}
        pages={book.num_pages}
        languages={book.languages}
        price={book.price}
        imageUrl={book.book_photo_url}
      />
    </div>
  ));

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "20px", // Add gap between books
        margin: "25px 200px"
      }}
    >
      {books}
    </div>
  );
}

export default BookList;
