import React, {
  useState,
  useEffect,
  useContext,
  useReducer,
  useRef,
} from "react";
import Nav from "./Nav/Nav";
import { TimerContext } from "../App";

// import { situation ,initialState, reducer } from "../data/reducer"

function Timer() {
  const [state, dispatch] = useContext(TimerContext);

  useEffect(() => {
    console.log(state);
    const interval = setInterval(() => {
      state.isOn ? dispatch({ type: "timerRun" }) : clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [state]);

  useEffect(() => {}, [state]);

  function timerRun() {
    state.isOn = !state.isOn;
    dispatch({
      type: "timerRun",
    });
  }

  function timerNext() {
    // state.situation="shortBreak"
    dispatch({
      type: "timerNext",
    });
  }

  function timerReset() {
    dispatch({
      type: "timerReset",
    });
  }

  function setTimeLeft(e) {
    dispatch({
      type: "setTimeLeft",
      payload: e.target.value,
    });
  }

  return (
    <>
      <Nav />
      <div className="pomodoro">
        <div className="timer">
          {/* {timerMinutes}:{timerSeconds} */}
          {new Date(state.timeLeft * 60 * 1000).toISOString().substr(14, 5)}
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
