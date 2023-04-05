import React, { Fragment, useContext } from "react";
import BookContext from "../Store/BookContext";
import BookItem from "./BookItem";
const BookList = (props) => {
  const BookCtx = useContext(BookContext);
  return (
    <Fragment>
      {BookCtx.httpError && (
        <p style={{ color: "#ff9900", fontSize: "1.5rem" }}>
          Something went wrong!
        </p>
      )}
      {BookCtx.isLoading ? (
        <p style={{ color: "#6d3051", fontSize: "1.5rem" }}>loading...</p>
      ) : (
        BookCtx.items.map((item) => {
          return (
            <BookItem
              key={item.id}
              id={item.id}
              name={item.BookName}
              author={item.author}
              price={item.price}
              imgURL={item.imgURL}
            />
          );
        })
      )}
    </Fragment>
  );
};

export default BookList;
