import React, { useContext, useEffect, useState } from "react";
import BookContext from "../Store/BookContext";
import "./Header.css";
const Header = (props) => {
  const [bump, setBump] = useState(false);

  const cartClasses = `cart ${bump ? "bump" : ""}`;
  const BookCtx = useContext(BookContext);
  const CartItems = BookCtx.cart;
  useEffect(() => {
    if (CartItems === 0) {
      return;
    }

    setBump(true);
    const bumpTimer = setTimeout(() => {
      setBump(false);
    }, 300);
    return () => {
      clearTimeout(bumpTimer); // here we must clear the timer to make it run again
    };
  }, [CartItems]);

  
  return (
    <header>
      <div>
        <h1>
          <i class="fa-solid fa-bookmark"></i>
          Book Hut
        </h1>
      </div>
      <div className="btns">
        <button className="wish" onClick={props.onClick}>
          <p className="hide">My wish List</p>
          <p className="vis show">
            <i class="fa-solid fa-star"></i>
          </p>
        </button>
        <button onClick={props.onCart} className={cartClasses}>
          <h2 className="hide">My Cart</h2>
          <i className="fa-solid fa-cart-shopping"></i>
          <div className="badge">{BookCtx.totalAmount}</div>
        </button>
      </div>
    </header>
  );
};
export default Header;
