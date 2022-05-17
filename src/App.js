import React, { createContext, useContext, useReducer } from "react";
import Timer from "./pages/Timer/Timer";
import Test from "./pages/Test";
import { reducer, initialState } from "./data/reducer";
import Nav from "./pages/Nav/Nav";
import Setting from "./pages/Setting/Setting";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createStore } from 'redux'

const TimerContext = createContext();
export { TimerContext };

function App() {
  const reducers = useReducer(reducer, initialState);

  return (
    <div className="app">
      <TimerContext.Provider value={reducers}>
        <BrowserRouter>
          <Routes>
            <Route path="/Timer" element={<Test />} />
            <Route path="/Status" element={<Nav />} />
            <Route path="/Setting" element={<Setting />} />
          </Routes>
        </BrowserRouter>
      </TimerContext.Provider>
    </div>
  );
}

export default App;
