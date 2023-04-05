import React from "react";

const BookContext = React.createContext({
  items: [],
  favItems: [],
  isFav: false
});

export default BookContext;
