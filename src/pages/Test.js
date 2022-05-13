import React, { useState, useEffect, useReducer, useRef } from "react";

const initialState = {
  minutes: 25,
  seconds: 0,
  count: 1,
  isOn: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "timerRun":
        return {
          ...state,
          minutes: (state.minutes!==0&&state.seconds===0)?state.minutes-1:state.minutes,
          seconds: (state.minutes===0&&state.seconds<=0)?0:(state.seconds!==0)?state.seconds-1:59,
          isOn: (state.minutes===0&&state.seconds===0)?!state.isOn:state.isOn
        };
        
    case "timerNext":
      console.log(state);
      return {
        ...initialState,
        count: state.count<4?state.count+1:1,        
        isOn: false,
      };

    case "timerReset":
      return {
        ...initialState
      };

    default:
      throw new Error();
  }
}

function Timer() {
  const [state, dispatch] = useReducer(reducer, initialState);
    const initRef=useRef(initialState)

  const timerMinutes = state.minutes < 10 ? `0${state.minutes}` : state.minutes;
  const timerSeconds = state.seconds < 10 ? `0${state.seconds}` : state.seconds;

  useEffect(() => {
    const interval = setInterval(() => {
        state.isOn?
        dispatch({ type: "timerRun" }):
        clearInterval(interval);
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
