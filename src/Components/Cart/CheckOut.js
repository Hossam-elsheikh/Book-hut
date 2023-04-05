import { useRef } from "react";
import classes from "./CheckOut.module.css";
import useInput from "./use-input";

const isEmpty = (value) => value.trim() !== "";
const invalidPostal = (value) => value.trim().length === 5;

const CheckOut = (props) => {
  const {
    enteredValue: name,
    valueIsValid: nameIsValid,
    hasError: nameError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName
  } = useInput(isEmpty);
  const {
    enteredValue: street,
    valueIsValid: streetIsValid,
    hasError: streetError,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreet
  } = useInput(isEmpty);
  const {
    enteredValue: city,
    valueIsValid: cityIsValid,
    hasError: cityError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCity
  } = useInput(isEmpty);
  const {
    enteredValue: postal,
    valueIsValid: postalIsValid,
    hasError: postalError,
    valueChangeHandler: postalChangeHandler,
    inputBlurHandler: postalBlurHandler,
    reset: resetPostal
  } = useInput(invalidPostal);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const formIsValid =
      nameIsValid && streetIsValid && cityIsValid && postalIsValid;

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name,
      street,
      postal,
      city
    });
    resetName();
    resetCity();
    resetPostal();
    resetStreet();
  };

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <div className={`${classes.control} ${nameError && classes.invalid}`}>
        <label htmlFor="name">your name</label>
        <input
          value={name}
          type="text"
          id="name"
          onBlur={nameBlurHandler}
          onChange={nameChangeHandler}
        />
        {nameError && <p style={{ color: "red" }}>please enter a valid name</p>}
      </div>
      <div className={`${classes.control} ${streetError && classes.invalid}`}>
        <label htmlFor="street">Street</label>
        <input
          value={street}
          type="text"
          id="street"
          onBlur={streetBlurHandler}
          onChange={streetChangeHandler}
        />
        {streetError && (
          <p style={{ color: "red" }}>please enter a valid street</p>
        )}
      </div>
      <div className={`${classes.control} ${cityError && classes.invalid}`}>
        <label htmlFor="city">City</label>
        <input
          value={city}
          type="text"
          id="city"
          onBlur={cityBlurHandler}
          onChange={cityChangeHandler}
        />
        {cityError && <p style={{ color: "red" }}>please enter a valid City</p>}
      </div>
      <div className={`${classes.control} ${postalError && classes.invalid}`}>
        <label htmlFor="postal">Postal Code</label>
        <input
          value={postal}
          type="text"
          id="postal"
          onBlur={postalBlurHandler}
          onChange={postalChangeHandler}
        />
        {postalError && (
          <p style={{ color: "red" }}>
            please enter a valid Postal Code (5 digits)
          </p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};
export default CheckOut;
