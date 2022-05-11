import React, { useState, useEffect, useReducer, useRef } from "react";

const initialState = {
  minutes: 25,
  seconds: 0,
  count: 0,
  isOn: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "timerRun":
      if (state.seconds === 0 && state.minutes === 0) {
        return {
          ...state,
          count: state.count + 1,
          minutes: 25,
          seconds: 0,
          isOn: !state.isOn,
        };
      }
      if (state.seconds === 0 && state.minutes !== 0) {
        return {
          ...state,
          seconds: 59,
          minutes: state.minutes - 1,
        };
      }
      if (state.seconds !== 0 && state.minutes !== 0) {
        return {
          ...state,
          seconds: state.seconds - 1,
          minutes: state.minutes,
        };
      }
      if (state.seconds !== 0 && state.minutes === 0) {
        return {
          ...state,
          seconds: state.seconds - 1,
          minutes: state.minutes,
        };
      }
    case "timerNext":
      console.log(state);
      return {
        ...state,
        count: state.count + 1,
      };
    case "timerReset":
      return {
        ...state,
        minutes: 25,
        seconds: 0,
        count: 0,
        isOn: false,
      };

    default:
      throw new Error();
  }
}

function Timer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const timerMinutes = state.minutes < 10 ? `0${state.minutes}` : state.minutes;
  const timerSeconds = state.seconds < 10 ? `0${state.seconds}` : state.seconds;

  useEffect(() => {
    console.log(state);
    const interval = setInterval(() => {
      if (state.isOn) {
        dispatch({ type: "timerRun" });
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [state]);

  function timerRun() {
    state.isOn = !state.isOn;
    dispatch({
      type: "timerRun",
    });
  }

  function timerNext() {
    dispatch({
      type: "timerNext",
    });
  }

  function timerReset() {
    dispatch({
      type: "timerReset",
    });
  }

  return (
    <div className="pomodoro">
      <div className="timer">
        {timerMinutes}:{timerSeconds}
      </div>
      <div>{state.count}/4</div>
      <div>
        <button onClick={timerReset}>reset</button>
        <button onClick={timerRun}>go / stop</button>
        <button onClick={timerNext}>next</button>
      </div>
    </div>
  );
}

export default Timer;
