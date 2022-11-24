import React, { SyntheticEvent, useState } from 'react';
import useInput from '../hooks/use-input';

const SimpleInput = () => {
  const {
    value: name,
    valueIsValid: nameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    onBlurHandler: nameBlurHandler,
    reset: resetNameInput
  } = useInput((value: string) => value.trim() !== '');

  const {    value: email,
    valueIsValid: emailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    onBlurHandler: emailBlurHandler,
    reset: resetEmailInput} = useInput((value: string) => value.trim() !== '')


  let formIsValid = false;

  if (nameIsValid && emailIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event: SyntheticEvent) => {
    event.preventDefault();

        if (!nameIsValid) {
      return;
    } else if (!emailIsValid) {
      return;
    }

    resetNameInput()
    resetEmailInput()
  };

  // const emailInputIsInvalid = !emailIsValid && emailTouched;

  const nameInputClasses = nameInputHasError
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          value={name}
          onBlur={nameBlurHandler}
        />
        {nameInputHasError && (
          <p className="error-text">Provide some valid Name</p>
        )}
      </div>
      <div className={nameInputClasses}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="email"
          id="email"
          onChange={emailChangeHandler}
          value={email}
          onBlur={emailBlurHandler}
        />
        { emailInputHasError && (
          <p className="error-text">
            Provide some valid E-mail (test@test.com)
          </p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
