import React, { useState, useEffect, useRef } from "react";

const useInterval: (callback: any, delay: number, start: boolean) => void = (
  callback,
  delay,
  start
) => {
  const savedCallback = useRef<any>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null && start) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay, start]);
};

export default useInterval;
