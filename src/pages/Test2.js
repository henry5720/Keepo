import React, { useState, useEffect, useReducer, useRef } from "react";
import Nav from "./Nav/Nav";

import { situation, initialState, reducer } from "../data/reducer";

function Timer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const timerMinutes = state.minutes < 10 ? `0${state.minutes}` : state.minutes;
  const timerSeconds = state.seconds < 10 ? `0${state.seconds}` : state.seconds;

  useEffect(() => {
    console.log(state);
    const interval = setInterval(() => {
      state.isOn ? dispatch({ type: "timerRun" }) : clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [state.isOn]);

  function timerRun() {
    state.isOn = !state.isOn;
    dispatch({
      type: "timerRun",
    });
  }

  function timerNext() {
    console.log("Next");
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
    <>
      <Nav />
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
    </>
  );
}

export default Timer;
