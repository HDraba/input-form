import { Reducer, useReducer, useState } from 'react';

type validateFn = (value: string) => boolean;

type State = {
  value: string | undefined;
  isTouched: boolean;
};

type Action = {
    type: string,
    value?: string
};

const initialState = {
  value: '',
  isTouched: false,
};

const inputStateReducer = (state: State, action: Action) => {
  if (action.type === 'INPUT') {
    return { value: action.value, isTouched: state.isTouched}
  }
  if (action.type === 'BLUR') {
    return { value: state.value, isTouched: true}
  }
  if (action.type === 'RESET') {
    return {value: '', isTouched: false}
  }

  return initialState;
};

const useInput = (validateValue: validateFn) => {
  const [inputState, dispatch] = useReducer<Reducer<State, Action>>(
    inputStateReducer,
    initialState
  );

//   const [value, setValue] = useState('');
//   const [isTouched, setIsTouched] = useState(false);

  // callback fn for individualized validating
  const valueIsValid = validateValue(inputState.value);

  // hasError when the value is invalid (i.e. empty) and there were changes/focus on the element
  const hasError = !valueIsValid && inputState.isTouched;

  // setting the value state on the current entry
  const valueChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    dispatch({type: 'INPUT', value: event.currentTarget.value})
    // setValue(event.currentTarget.value);
  };

  // when focus is lost, the field was touched (helps to identify fo errors)
  const onBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    dispatch({type: 'BLUR'})
    // setIsTouched(true);
  };

  // empties the input-fields
  const reset = () => {
    dispatch({type: 'RESET'})
    // setValue('');
    // setIsTouched(false);
  };

  return {
    value: inputState.value,
    valueIsValid,
    hasError,
    valueChangeHandler,
    onBlurHandler,
    reset,
  };
};

export default useInput;
