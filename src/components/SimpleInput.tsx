import React, { SyntheticEvent, useState } from 'react';

const SimpleInput = () => {
  const [name, setName] = useState('');
  // const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);

  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);

  let formIsValid = false;

  const nameIsValid = name.trim() !== '';
  const emailIsValid = email.trim() !== '' && email.includes('@');

  if (nameIsValid && emailIsValid) {
    formIsValid = true;
  }

  const nameInputChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  };

  const nameOnBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    setNameTouched(true);
  };

  const emailInputChangeHandler = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    setEmail(event.currentTarget.value);
  };

  const emailOnBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    setEmailTouched(true);
  };
  const formSubmissionHandler = (event: SyntheticEvent) => {
    event.preventDefault();

    setNameTouched(true);
    setEmailTouched(true);

    if (!nameIsValid) {
      return;
    } else if (!emailIsValid) {
      return;
    }

    setName('');
    setNameTouched(false);

    setEmail('');
    setEmailTouched(false);
  };

  const nameInputIsInvalid = !nameIsValid && nameTouched;
  const emailInputIsInvalid = !emailIsValid && emailTouched;

  const nameInputClasses = nameInputIsInvalid
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          value={name}
          onBlur={nameOnBlurHandler}
        />
        {nameInputIsInvalid && (
          <p className="error-text">Provide some valid Name</p>
        )}
      </div>
      <div className={nameInputClasses}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="text"
          id="email"
          onChange={emailInputChangeHandler}
          value={email}
          onBlur={emailOnBlurHandler}
        />
        {emailInputIsInvalid && (
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
