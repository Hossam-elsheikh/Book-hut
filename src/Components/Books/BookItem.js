import React, { useState, useContext } from "react";
import BookContext from "../Store/BookContext";
import "./BookItem.css";
const BookItem = (props) => {
  const [isFav, setIsFav] = useState(true);
  const price = `$${props.price.toFixed(2)}`;
  const [favClass, setFavClass] = useState("fa-regular fa-star");
  const BookCtx = useContext(BookContext);
  const favHandler = () => {
    const BookIndex = BookCtx.items.findIndex((Book) => Book.id === props.id);
    const favBook = BookCtx.items[BookIndex];
    setIsFav(!isFav);
    favBook.isFav = isFav;
    if (isFav) {
      setFavClass("fa-solid fa-star");
    } else {
      setFavClass("fa-regular fa-star");
    }
  };

  const addBookToCart = () => {
    const BookIndex = BookCtx.items.findIndex((Book) => Book.id === props.id);
    const BookAdded = BookCtx.items[BookIndex];
    BookCtx.addBook({
      id: BookAdded.id,
      title: BookAdded.BookName,
      amount: 1,
      author: BookAdded.author,
      price: BookAdded.price,
      imgURL: BookAdded.imgURL
    });
  };
  return (
    <div className="book">
      <div className="img">
        <img src={props.imgURL} alt="book" />
      </div>
      <div className="details">
        <h4>{props.name}</h4>
        <p>{props.author}</p>
        <p className="price">{price}</p>
      </div>
      <button
        style={{ display: props.display }}
        className="fav"
        onClick={favHandler}
      >
        <i className={favClass}></i>
      </button>
      <button className="add" onClick={addBookToCart}>
        Add
        <i className="fa-solid fa-cart-shopping"></i>
      </button>
    </div>
  );
};
export default BookItem;
