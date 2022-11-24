import { SyntheticEvent } from 'react';
import useInput from '../hooks/use-input';

const BasicForm = () => {
  const {
    value: first,
    valueIsValid: firstIsValid,
    hasError: firstHasError,
    valueChangeHandler: firstChangeHandler,
    onBlurHandler: firstBlurHandler,
    reset: firstReset,
  } = useInput((first) => {
    return first.trim().length > 2;
  });

  const {
    value: second,
    valueIsValid: secondIsValid,
    hasError: secondHasError,
    valueChangeHandler: secondChangeHandler,
    onBlurHandler: secondBlurHandler,
    reset: secondReset,
  } = useInput((second) => {
    return second.trim().length > 3;
  });

  const {
    value: email,
    valueIsValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    onBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput((email) => {
    return email.trim().length > 6;
  });

  let formIsValid;

  if (firstIsValid && secondIsValid && emailIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event: SyntheticEvent) => {
    event.preventDefault();

    if (!firstIsValid) {
      return;
    } else if (!secondIsValid) {
      return;
    } else if (!emailIsValid) {
      return;
    }

    firstReset();
    secondReset();
    emailReset();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="control-group">
        <div className="form-control">
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            onChange={firstChangeHandler}
            value={first}
            onBlur={firstBlurHandler}
          />
          {firstHasError && <p>Provide some valid first name</p>}
        </div>
        <div className="form-control">
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            onChange={secondChangeHandler}
            value={second}
            onBlur={secondBlurHandler}
          />
          {secondHasError && <p>Provide some valid last name</p>}
        </div>
      </div>
      <div className="form-control">
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
          id="name"
          onChange={emailChangeHandler}
          value={email}
          onBlur={emailBlurHandler}
        />
        {emailHasError && <p>Provide some valid E-Mail address</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
