import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import styled, { css } from "styled-components";

import { combineReducers, createStore } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Pie, Doughnut } from "react-chartjs-2";

/* ==================== [chart]Data ==================== */
const TimeData = [
  {
    id: 1,
    day: "one",
    total: 16,
  },
  {
    id: 2,
    day: "two",
    total: 5,
  },
  {
    id: 3,
    day: "three",
    total: 10,
  },
  {
    id: 4,
    day: "four",
    total: 14,
  },
  {
    id: 5,
    day: "five",
    total: 7,
  },
];

/* ==================== [Redux]Setting ==================== */
const initialSetting = {
  workTime: 25,
  shortBreak: 5,
  longBreak: 20,
  rounds: 4,
  // showTimerInTitle: true,
  // showNotifications: true,
  darkMode: false,
  autostart: false,
  // firstDayOfTheWeek: "Monday",
};

/* ========== [Redux]Setting reducer ========== */
function settingReducer(state = initialSetting, action) {
  switch (action.type) {
    case "set_workTime":
      console.log("設定狀態: workTime");
      return {
        ...state,
        workTime: Number(action.payload),
      };
    case "set_shortBreak":
      console.log("設定狀態: shortBreak");
      return {
        ...state,
        shortBreak: Number(action.payload),
      };
    case "set_longBreak":
      console.log("設定狀態: longBreak");
      return {
        ...state,
        longBreak: Number(action.payload),
      };
    case "set_rounds":
      console.log("設定狀態: rounds");
      return {
        ...state,
        rounds: Number(action.payload),
      };
    case "set_theme":
      console.log(state);
      return {
        ...state,
        darkMode: !state.darkMode,
      };

    default:
      return state;
  }
}

/* ==================== [Redux]Timer ==================== */
// const STATUSES = {
//   onHold: "ON_HOLD",
//   running: "RUNNING",
//   paused: "PAUSED",
// };

const TYPES = {
  work: "WORK",
  shortBreak: "SHORT_BREAK",
  longBreak: "LONG_BREAK",
};

const initialTimer = {
  isOn: false,
  scene: TYPES.work,
  // progress: 100,
  timeLeft: null,
  currentRound: 1,
  // interval: null,
  // saveSessionAlert: false,
};

/* ========== [Redux]Timer reducer ========== */
function timerReducer(state = initialTimer, action) {
  switch (action.type) {
    case "set_timeLeft":
      return {
        ...state,
        isOn: false,
        timeLeft: getTimeLeft(),
      };
    case "set_next_timeLeft":
      return setNextTimer();
    case "timer_status":
      return {
        ...state,
        isOn: !state.isOn,
      };
    case "timer_run":
      let newMinutes = state.timeLeft.minutes;
      let newSeconds = state.timeLeft.seconds;

      if (newSeconds === 0) {
        if (newMinutes === 0) {
          console.log("時間到");
          return setNextTimer();
        } else {
          newMinutes -= 1;
          newSeconds = 59;
        }
      } else {
        if (newMinutes === 0) {
          newSeconds -= 1;
        } else {
          newSeconds -= 1;
        }
      }
      return {
        ...state,
        timeLeft: {
          minutes: newMinutes,
          seconds: newSeconds,
        },
      };
    case "timer_reset":
      return {
        ...initialTimer,
        timeLeft: {
          minutes: action.workTime,
          seconds: 0,
        },
      };
    default:
      return state;
  }

  // [更改狀態]取得當前timeLeft
  function getTimeLeft() {
    if (state.scene === "WORK") {
      console.log("當前狀態: 工作");
      return {
        minutes: action.workTime,
        seconds: 0,
      };
    }
    if (state.scene === "SHORT_BREAK") {
      console.log("當前狀態: 短休");
      return {
        minutes: action.shortBreak,
        seconds: 0,
      };
    }
    if (state.scene === "LONG_BREAK") {
      console.log("當始狀態: 長休");
      return {
        minutes: action.longBreak,
        seconds: 0,
      };
    }
  }

  // [更改狀態]取得下一個計時器數據
  function setNextTimer() {
    let newType = "";
    let newTimeLeft = "";
    let newCurrentRound = state.currentRound;
    if (state.currentRound < action.rounds) {
      // console.log("目前Round < 總共Round");
      if (state.scene === "WORK") {
        console.log("更改狀態: 工作 --> 短休");
        newType = "SHORT_BREAK";
        newTimeLeft = {
          minutes: action.shortBreak,
          seconds: 0,
        };
      } else {
        console.log("更改狀態: 短休 --> 工作 ");
        newType = "WORK";
        newTimeLeft = {
          minutes: action.workTime,
          seconds: 0,
        };
        newCurrentRound = state.currentRound + 1;
      }
    } else {
      // console.log("目前Round >= 總共Round");
      if (state.scene === "WORK") {
        console.log("更改狀態: 工作 --> 長休");
        newType = "LONG_BREAK";
        newTimeLeft = {
          minutes: action.longBreak,
          seconds: 0,
        };
      } else {
        console.log("更改狀態: 長休 --> 工作 ");
        newType = "WORK";
        newTimeLeft = {
          minutes: action.workTime,
          seconds: 0,
        };
        newCurrentRound = 1;
      }
    }
    return {
      ...state,
      isOn: false,
      scene: newType,
      timeLeft: newTimeLeft,
      currentRound: newCurrentRound,
    };
  }
}

/* ==================== [Redux]User ==================== */
const initialUser = {
  isLoading: false,
  user: [],
};

/* ==================== [Redux]User reducer ==================== */
function userReducer(state = initialUser, action) {
  switch (action.type) {
    case "":
      return {
        ...state,
        isLoading: !isLoading,
      };
    default:
      return state;
  }
}

/* ==================== [Redux]combine ==================== */
const rootReducer = combineReducers({
  settingReducer,
  timerReducer,
  userReducer,
});

/* ==================== [Redux]store ==================== */
let store = createStore(rootReducer, composeWithDevTools());

/* ==================== [App組件] ==================== */
function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Timer />} />
            <Route path="/Status" element={<Status />} />
            <Route path="/Setting" element={<Setting />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

/* ==================== [Nav組件] ==================== */
function Nav() {
  return (
    <ul>
      <li>
        <Link to="/" className="btn">
          Timer
        </Link>
      </li>
      <li>
        <Link to="/Status" className="btn">
          Status
        </Link>
      </li>
      <li>
        <Link to="/Setting" className="btn">
          Setting
        </Link>
      </li>
    </ul>
  );
}

/* ==================== [Timer組件] ==================== */
function Timer() {
  const settings = useSelector((state) => state.settingReducer);
  const timer = useSelector((state) => state.timerReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "set_timeLeft",
      ...settings,
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      timer.isOn
        ? dispatch({ type: "timer_run", ...settings })
        : clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer.isOn]);

  function timerReset() {
    dispatch({
      type: "timer_reset",
      ...settings,
    });
  }
  function timerRun() {
    dispatch({
      type: "timer_status",
    });
  }
  function timerNext() {
    dispatch({
      type: "set_next_timeLeft",
      ...settings,
    });
  }
  return (
    <>
      <Nav />
      <div className="container">
        <span className="scene">{timer.scene}</span>
        {timer.timeLeft && ( // 條件渲染
          <div className="timer">
            {timer.timeLeft.minutes < 10
              ? `0${timer.timeLeft.minutes}`
              : timer.timeLeft.minutes}
            :
            {timer.timeLeft.seconds < 10
              ? `0${timer.timeLeft.seconds}`
              : timer.timeLeft.seconds}
            {/* {new Date(workTime*60*1000).toISOString().substr(14, 5)} */}
          </div>
        )}
        <div>
          {timer.currentRound}/{settings.rounds}
        </div>
        <div>
          <button onClick={timerReset}>reset</button>
          <button onClick={timerRun}>{timer.isOn ? "stop" : "run"}</button>
          <button onClick={timerNext}>next</button>
        </div>
      </div>
    </>
  );
}

/* ==================== [Status組件] ==================== */
function Status() {
  const [timeData, setTimeData] = useState({
    labels: TimeData.map((data) => data.day),
    datasets: [
      {
        label: "total timer",
        data: TimeData.map((data) => data.total),
        backgroundColor: ["#111", "#666", "#333", "#999", "#777"],
      },
    ],
  });

  return (
    <>
      <Nav />
      <div className="container">
        <div className="bar">
          <DoughnutChart chartData={timeData} />
        </div>
      </div>
    </>
  );
}

/* ========== [BarChart組件] ========== */
function DoughnutChart({ chartData }) {
  return <Doughnut data={chartData} />;
}

/* ==================== [Setting組件] ==================== */
function Setting() {
  const settings = useSelector((state) => state.settingReducer);
  return (
    <>
      <Nav />
      <div className="container">
        <Sliders />
        <Switches
          className={settings.darkMode ? "normal" : "darkMode"}
          content={settings.darkMode ? "普通模式" : "黑暗模式"}
        />
      </div>
    </>
  );
}

/* ========== [Redux]Setting action ========== */
function setWorkTime(payload) {
  return {
    type: "set_workTime",
    payload,
  };
}
function setShortBreak(payload) {
  return {
    type: "set_shortBreak",
    payload,
  };
}
function setLongBreak(payload) {
  return {
    type: "set_longBreak",
    payload,
  };
}
function setRounds(payload) {
  return {
    type: "set_rounds",
    payload,
  };
}

/* ========== [Sliders組件] ========== */
function Sliders() {
  // 解構賦值
  // console.log(useSelector(state => state.settingReducer));
  const { workTime, shortBreak, longBreak, rounds } = useSelector(
    (state) => state.settingReducer
  );
  // console.log(workTime);
  return (
    <>
      <Slider content={"workTime"} value={workTime} min={5} max={60} step={5}/>
      <Slider content={"shortBreak"} value={shortBreak} min={1} max={30} step={1} />
      <Slider content={"longBreak"} value={longBreak} min={5} max={60} step={5} />
      <Slider content={"Rounds"} value={rounds} min={2} max={20} step={1} />
    </>
  );
}

/* ========== [Slider組件] ========== */
function Slider({ content, min, max, step, value }) {
  const dispatch = useDispatch();

  function handleChange(e) {
    switch (e.target.name) {
      case "workTime":
        return dispatch(setWorkTime(e.target.value));
      case "shortBreak":
        return dispatch(setShortBreak(e.target.value));
      case "longBreak":
        return dispatch(setLongBreak(e.target.value));
      case "Rounds":
        return dispatch(setRounds(e.target.value));
    }
  }

  // const [sliderValue, setSliderValue] = useState(value);
  // useEffect(() => {
  //   setSliderValue(value)
  // }, [value]);

  return (
    <>
      <label htmlFor="">{content} : {value}</label>
      <input
        onChange={handleChange}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        className="slider"
        name={content}
      />
    </>
  );
}

/* ========== [Switches組件] ========== */
function Switches({ content }) {
  const settings = useSelector((state) => state.settingReducer);
  const dispatch = useDispatch();

  function handleClick() {
    dispatch({
      type: "set_theme",
    });
  }
  return (
    <>
      <button onClick={handleClick}>{content}</button>
    </>
  );
}

export default App;
