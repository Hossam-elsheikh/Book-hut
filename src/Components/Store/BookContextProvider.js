import React, { useReducer, useState, useEffect } from "react";
import BookDic from "../Books/BookDic";
import BookContext from "./BookContext";

const cartDetails = {
  cart: [],
  totalPrice: 0,
  totalAmount: 0
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const UpdateTotalPrice = state.totalPrice + action.item.price;
    const itemAddedIndex = state.cart.findIndex(
      (book) => book.id === action.item.id
    );
    const itemAdded = state.cart[itemAddedIndex];
    let UpdateCart;
    if (itemAdded) {
      const UpdatedBook = {
        ...itemAdded,
        amount: itemAdded.amount + 1
      };
      UpdateCart = [...state.cart];
      UpdateCart[itemAddedIndex] = UpdatedBook;
    } else {
      UpdateCart = state.cart.concat(action.item);
    }

    return {
      cart: UpdateCart,
      totalPrice: UpdateTotalPrice,
      totalAmount: state.totalAmount + 1
    };
  }
  if (action.type === "REMOVE") {
    const UpdateTotalPrice = state.totalPrice - action.item.price;
    const itemAddedIndex = state.cart.findIndex(
      (book) => book.id === action.item.id
    );
    const itemAdded = state.cart[itemAddedIndex];
    let UpdateCart;
    if (itemAdded.amount === 1) {
      UpdateCart = state.cart.filter((book) => book.id !== action.item.id);
    } else {
      const UpdateBook = {
        ...itemAdded,
        amount: itemAdded.amount - 1
      };
      UpdateCart = [...state.cart];
      UpdateCart[itemAddedIndex] = UpdateBook;
    }
    return {
      cart: UpdateCart,
      totalPrice: UpdateTotalPrice,
      totalAmount: state.totalAmount - 1
    };
  }
  if (action.type === "CLEAR") {
    return {
      cart: [],
      totalPrice: 0,
      totalAmount: 0
    };
  }
  return cartDetails;
};

const BookContextProvider = (props) => {
  const [Books, setBooks] = useState(BookDic);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(false);
  const [cartItems, dispatchCartItems] = useReducer(cartReducer, cartDetails);
  const [isFav, setFav] = useState(false)

  // useEffect(() => {
  //   const fetchBooks = async () => {
  //     const response = await fetch(
  //       "https://tasks-8066c-default-rtdb.firebaseio.com/Books.json"
  //     );
  //     if (!response.ok) {
  //       throw new Error("Something went wrong");
  //     }
  //     const responseData = await response.json();
  //     const BookList = [];
  //     for (const id in responseData) {
  //       BookList.push({
  //         id,
  //         BookName: responseData[id].BookName,
  //         author: responseData[id].author,
  //         imgURL: responseData[id].imgURL,
  //         isFav: responseData[id].isFav,
  //         price: responseData[id].price,
  //         amount: responseData[id].amount
  //       });
  //     }
  //     setBooks(BookList);
  //     setIsLoading(false);
  //     setHttpError("");
  //   };
  //   // fetchBooks();

  //   fetchBooks().catch((error) => {
  //     setIsLoading(false);
  //     setHttpError(error.message);
  //   });
  // }, []);
  const onAddBook = (item) => {
    dispatchCartItems({ type: "ADD", item: item });
  };
  const onRemoveBook = (item) => {
    dispatchCartItems({ type: "REMOVE", item: item });
  };
  const clearCart = () => {
    dispatchCartItems({ type: "CLEAR" });
   
  };
  const favHandler = ()=>{
      setFav(!isFav)
  }
  const Bookcontext = {
    items: Books,
    isFav,
    showfav: favHandler,
    cart: cartItems.cart,
    totalPrice: cartItems.totalPrice,
    totalAmount: cartItems.totalAmount,
    addBook: onAddBook,
    removeBook: onRemoveBook,
    // isLoading,
    // httpError,
    onClearCart: clearCart
  };
  return (
    <BookContext.Provider value={Bookcontext}>
      {props.children}
    </BookContext.Provider>
  );
};
export default BookContextProvider;
