import React from 'react';
import { Subject } from 'rxjs';
const subject = new Subject<any>()

const initialState = {
  number: 0
}

let state = initialState

export const store = {
  init: subject.next(state),
  setData: (data: any) => {
    return subject.next((state: any) => {
      return {
        ...state,
        ...data
      }
    })
  },
  setNumber: (num:number) =>  subject.next((state: any) => ({
    ...state,
    number : state.number + num
  })),
  subscribe: (setState: any) =>subject.subscribe(setState) ,
  initialState
}

const useSubjectState = () => {
  const [subjectState, setSubjectState] = React.useState(
    store.initialState,
  )

  React.useEffect(() => {
    const subscription = store.subscribe(setSubjectState);
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    subjectState,
    setSubjectState,
  };
};

export default useSubjectState;
