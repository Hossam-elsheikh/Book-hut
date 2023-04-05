import React, { useContext } from "react";
import BookContext from "../Store/BookContext";
import classes from "./CartItem.module.css";
const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  const BookCtx = useContext(BookContext);
  const addBook = () => {
    const BookIndex = BookCtx.items.findIndex((Book) => Book.id === props.id);
    const BookAdded = BookCtx.items[BookIndex];
    BookCtx.addBook({ ...BookAdded, amount: BookAdded.amount + 1 });
  };
  const removeBook = () => {
    const BookIndex = BookCtx.items.findIndex((Book) => Book.id === props.id);
    const Book = BookCtx.items[BookIndex];
    BookCtx.removeBook(Book);
  };

  return (
    <div className={classes.book}>
      <div className={classes.details}>
        <img
          className={classes.img}
          style={{ width: "3rem" }}
          src={props.imgURL}
          alt="book-img"
        />
        <div>
          <h4>{props.title}</h4>
          <h6>{props.author}</h6>
        </div>
      </div>
      <div>
        <div>
          <button onClick={addBook} className={classes.button}>
            +
          </button>
          <h4 style={{ textAlign: "center" }}>x {props.amount}</h4>
          <button onClick={removeBook} className={classes.button}>
            -
          </button>
        </div>
      </div>
      <div>
        <h3>{price}</h3>
      </div>
    </div>
  );
};
export default CartItem;
