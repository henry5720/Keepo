function init(initialState) {
  return {
    situation: situation.work.type,
    timeLeft: situation.work.timeLeft,
    count: 1,
    isOn: false,
  };
}

let situation = {
  work: {
    type: "work",
    timeLeft: 25,
  },
  shortBreak: {
    type: "shortBreak",
    timeLeft: 5,
  },
  longBreak: {
    type: "longBreak",
    timeLeft: 15,
  },
};

// let timerLeft={
//   work: 25,
//   shortBreak: 5,
//   longBreak: 15,
// }

function setTimeLeft(timeLeft) {
  return timeLeft;
}

const initialState = {
  situation: situation.work.type,
  timeLeft: 25,
  count: 1,
  isOn: false,
};

function timerSituation(state) {
  if (state.count % 4 === 0 && state.situation === "work") {
    return situation.longBreak;
  } else if (state.count % 4 !== 0 && state.situation === "work") {
    return situation.shortBreak;
  } else {
    return situation.work;
  }
}

function timerCount(state) {
  if (state.count <= 4 && state.situation === "work") {
    return state.count;
  } else if (state.count < 4 && state.situation !== "work") {
    return state.count + 1;
  } else {
    return 1;
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "setTimeLeft":
      const timeLeft = action.payload;

    case "timerRun":
      if (state.timeLeft === 0) {
        return {
          ...state,
          situation: timerSituation(state),
          count: timerCount(state),
          isOn: action.payload,
        };
      } else {
        return {
          ...state,
          timeLeft: (state.timeLeft * 60 * 1000 - 1000) / 1000 / 60,
        };
      }

    case "timerNext":
      return {
        ...initialState,
        situation: timerSituation(state).type,
        timeLeft: timerSituation(state).timeLeft,
        count: timerCount(state),
      };

    case "timerReset":
      return {
        ...initialState,
        isOn: false,
      };

    default:
      throw new Error();
  }
}
export { initialState, reducer, init };
