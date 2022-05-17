import React, { useState, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import Nav from "../Nav/Nav";
import "../../scss/Setting.scss";

import { initTimerLeft, initialState, reducer } from "../../data/reducer";

function Setting() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [minutes, setMinutes] = useState(state.minutes);

  useEffect(() => {
    console.log(state);
  }, [state]);

  function setTimeLeft(e) {
    dispatch({
      type: "setTimeLeft",
      payload: e.target.value,
    });
  }

  return (
    <>
      <Nav />
      <div className="slidecontainer">
        <span>setTimeLeft</span>
        <input
          onChange={setTimeLeft}
          type="range"
          min={1}
          max={50}
          value={state.timeLeft}
          className="slider"
          id="myRange"
        />
      </div>
    </>
  );
}
export default Setting;
