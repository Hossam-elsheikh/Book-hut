import React, { useContext, useState } from "react";
import Header from "./Components/Layout/Header";
import "./styles.css";
import BookContextProvider from "../src/Components/Store/BookContextProvider";
import BookList from "./Components/Books/BookList";
import FavList from "./Components/Books/FavList";
import Cart from "./Components/Cart/Cart";
import BookContext from "./Components/Store/BookContext";
export default function App() {
  const [favList, showFavList] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [BookListClasses, setBookClasses] = useState("books");
  const [FavListClasses, setFavClasses] = useState("books displayNone");
  const showFavHandler = () => {
  
    showFavList(!favList);
    if (favList) {
      setBookClasses("books displayNone");
      setFavClasses("books");
    } else {
      setBookClasses("books");
      setFavClasses("books displayNone");

    }

  };
  const showCartHandler = () => {
    setShowCart(true);
  };
  const hideCartHandler = () => {
    setShowCart(false);
  };
  return (
    <BookContextProvider className="App">
      <Header onCart={showCartHandler} onClick={showFavHandler} />
      <div className={BookListClasses}>
        <BookList />
      </div>
      <div className={FavListClasses}>
        <FavList />
      </div>
      {showCart && <Cart onClose={hideCartHandler} />}
    </BookContextProvider>
  );
}
