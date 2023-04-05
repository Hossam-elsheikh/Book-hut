import React, { Fragment, useContext, useState } from "react";
import CartItem from "./CartItem";
import Modal from "./Modal";
import classes from "./Cart.module.css";
import BookContext from "../Store/BookContext";
import CheckOut from "./CheckOut";
const Cart = (props) => {
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const BookCtx = useContext(BookContext);
  const order = () => {
    setIsCheckedOut(true);
  };
  const totalPrice = BookCtx.totalPrice.toFixed(2);

  const confirmOrder = async (userData) => {
    await fetch("https://tasks-8066c-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      body: JSON.stringify({
        userData,
        items: BookCtx.cart,
        totalPrice: totalPrice
      })
    });
    setIsSubmited(true);
    BookCtx.onClearCart();
  };

  const ModalBeforeSubmit = (
    <Fragment>
      <h1>your Cart</h1>
      <div>
        {!isCheckedOut && (
          <div className={classes.booksCart}>
            {BookCtx.cart.map((book) => {
              return (
                <CartItem
                  id={book.id}
                  amount={book.amount}
                  title={book.title}
                  author={book.author}
                  price={book.price}
                  imgURL={book.imgURL}
                />
              );
            })}
          </div>
        )}
      </div>
      <h3 style={{ textAlign: "center" }}>Total Price {totalPrice}</h3>
      {isCheckedOut && (
        <CheckOut onConfirm={confirmOrder} onCancel={props.onClose} />
      )}
      {!isCheckedOut && (
        <div className={classes.btns}>
          <button className={classes.close} onClick={props.onClose}>
            Close
          </button>

          <button className={classes.order} onClick={order}>
            Order
          </button>
        </div>
      )}
    </Fragment>
  );

  const succesfullySubmited = (
    <Fragment>
      <p>Your Order submited Succesfully, you'll be contacted soon!</p>
      <button className={classes.alt} onClick={props.onClose}>
        Close
      </button>
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmited ? ModalBeforeSubmit : succesfullySubmited}
    </Modal>
  );
};

export default Cart;
