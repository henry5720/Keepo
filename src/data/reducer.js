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

const initialState = {
  situation: situation.work.type,
  timeLeft: situation.work.timeLeft,
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

    case "setTimeLeft":
      return {
        ...initialState,
        timeLeft: action.payload,
      };

    default:
      throw new Error();
  }
}
export { initialState, reducer };

// const situation = {
//     work: "work",
//     shortBreak: "shortBreak",
//     longBreak: "longBreak",
//   };
// const initialState = {
//     situation: situation.work,
//     minutes: 1,
//     seconds: 0,
//     timeLeft: new Date(25*60*1000).toISOString().substr(13, 6),
//     count: 1,
//     isOn: false,
//   };

// function reducer(state, action) {
//   switch (action.type) {
//     case "timerRun":
//       if (state.minutes === 0 && state.seconds === 0) {
//         return {
//           ...initialState,
//           isOn:
//             state.minutes === 0 && state.seconds === 0
//               ? !state.isOn
//               : state.isOn,
//         };
//       } else {
//         return {
//           ...state,
//           minutes:
//             state.minutes !== 0 && state.seconds === 0
//               ? state.minutes - 1
//               : state.minutes,
//           seconds:
//             state.minutes === 0 && state.seconds <= 0
//               ? 0
//               : state.seconds !== 0
//               ? state.seconds - 1
//               : 1,
//         };
//       }

//     case "timerNext":
//       console.log(state);
//       if (state.situation === "work") {
//         return {
//           ...initialState,
//           count:
//             state.count < 4 && state.situation == "work" ? state.count + 1 : 1,
//           isOn: false,
//           minutes: 25,
//           situation: (state.count + 1) % 4 === 0 ? "longBreak" : "shortBreak",
//         };
//       }
//       if (state.situation === "shortBreak") {
//         return {
//           ...initialState,
//           count:
//             state.count < 4 && state.situation == "work"
//               ? state.count + 1
//               : state.count,
//           isOn: false,
//           minutes: 5,
//         };
//       }
//       if (state.situation === "longBreak") {
//         return {
//           ...initialState,
//           count:
//             state.count < 4 && state.situation == "work"
//               ? state.count + 1
//               : state.count,
//           isOn: false,
//           minutes: 15,
//         };
//       }

//     case "timerReset":
//       return {
//         ...initialState,
//         isOn: false,
//       };

//       case "timerSet":
//           return {
//             ...initialState,
//             minutes:state.minutes,
//             isOn: false,
//           };
//     default:
//       throw new Error();
//   }
// }
