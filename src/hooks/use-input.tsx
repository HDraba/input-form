import { useState } from 'react';

type validateFn = (value: string) => boolean

const useInput = (validateValue: validateFn) => {
  const [value, setValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(value)
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const onBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsTouched(true);
  };

  const reset = () => {
    setValue('')
    setIsTouched(false)
  }

  return {
    value, valueIsValid, hasError, valueChangeHandler, onBlurHandler, reset
  }
};

export default useInput;
