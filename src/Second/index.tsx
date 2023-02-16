import React from "react";
import Third from "../Third";
import useSubjectState, { store } from "./useSubject";

type Props = {};
var globalNumber = 1;

const Second = (props: Props) => {
  let number = 1;
  const [number2, setNumber2] = React.useState(1);
  const { subjectState, setSubjectState } = useSubjectState();

  return (
    <>
      <div>{number}</div>
      <button
        onClick={() => {
          number += 1;
        }}
      >
        number + 1
      </button>
      <div>{number2}</div>
      <button
        onClick={() => {
          setNumber2((prev) => prev + 1);
        }}
      >
        number2 + 1
      </button>
      <div>{globalNumber}</div>
      <button
        onClick={() => {
          globalNumber += 1;
        }}
      >
        globalNumber + 1
      </button>
      <div>{subjectState.number}</div>
      <button
        onClick={() => {
          setSubjectState((prev: any) => ({
            ...prev,
            number: prev.number + 1,
          }));
        }}
      >
        subjectNumber + 1
      </button>
      <div>{/* {store.subject} */}</div>
      <button
        onClick={() => {
          store.setData({ number: subjectState.number + 1 });
        }}
      >
        subjectSetData
      </button>
      <div></div>
      <button
        onClick={() => {
          store.setNumber(1);
        }}
      >
        subjectSetNumber
      </button>
      <Third />
    </>
  );
};

export default Second;
