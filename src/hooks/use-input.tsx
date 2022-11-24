import { useState } from 'react';

type validateFn = (value: string) => boolean

const useInput = (validateValue: validateFn) => {
  const [value, setValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  // callback fn for individualized validating
  const valueIsValid = validateValue(value)

  // hasError when the value is invalid (i.e. empty) and there were changes/focus on the element 
  const hasError = !valueIsValid && isTouched;

  // setting the value state on the current entry
  const valueChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  // when focus is lost, the field was touched (helps to identify fo errors)
  const onBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsTouched(true);
  };

  // empties the input-fields
  const reset = () => {
    setValue('')
    setIsTouched(false)
  }

  return {
    value, valueIsValid, hasError, valueChangeHandler, onBlurHandler, reset
  }
};

export default useInput;
