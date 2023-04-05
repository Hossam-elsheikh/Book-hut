import React, { Fragment, useContext } from "react";
import BookContext from "../Store/BookContext";
import BookItem from "./BookItem";
const FavList = (props) => {
  const BookCtx = useContext(BookContext);
  const favItems = BookCtx.items.filter((book) => {
    return book.isFav;
  });
  return (
    <Fragment>
      {favItems.map((item) => {
        return (
          <BookItem
            display="none"
            key={item.id}
            id={item.id}
            name={item.BookName}
            author={item.author}
            price={item.price}
            imgURL={item.imgURL}
          />
        );
      })}
    </Fragment>
  );
};
export default FavList;
