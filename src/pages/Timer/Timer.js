import React, { useState, useEffect, useCallback, useRef } from "react";

function useTimer(callback, delay, isOn) {
  const [remainSecond, setRemainSecond] = useState(0);
  const savedCallback = useRef();
  const savedDelay = useRef();

  // 保存到期回呼方法
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // 建立計數器並執行倒數
  useEffect(() => {
    // 刷新延遲秒數
    savedDelay.current = delay;
    setRemainSecond(delay);
    console.log(delay);
    // 每秒執行
    const tick = (id) => {
      // 計算剩餘時間
      if (isOn) {
        if (savedDelay.current > 0) {
          savedDelay.current -= 1;
        } else {
          savedDelay.current = 0;
        }
      }

      // 更新輸出的剩餘秒數
      setRemainSecond(savedDelay.current);

      // 停止條件
      if (savedDelay.current <= 0) {
        savedCallback.current();
        clearInterval(id);
      }
    };
    if (delay !== null) {
      // 產生計數器
      const id = setInterval(() => tick(id), 1000);

      // 清除計數器 (cleanup)
      return () => clearInterval(id);
    }
  }, [isOn]);

  // 輸出剩餘秒數
  return remainSecond;
}

const Timer = () => {
  const [isOn, setIsOn] = useState(false);
  const [delay, setDelay] = useState(10);

  // useCallback 會回傳該 callback 的 memoized 版本，它僅在依賴改變時才會更新
  const handleTimeup = useCallback(() => console.log("time up!!"), []);

  function countdown() {
    setIsOn(!isOn);
  }
  // 使用 useTimer 倒數
  const remainSecond = useTimer(handleTimeup, delay, isOn);

  useEffect(() => {
    console.log(new Date().toISOString());
    console.log(isOn);
  }, [isOn]);

  return (
    <>
      請輸入倒數秒數
      <input
        value={delay}
        type="number"
        onChange={(e) => setDelay(Number(e.target.value) || 0)}
      />
      {/* 顯示剩餘秒數 */}
      <div className="tp-count-down-timer">
        <div className="tp-count-down-timer__time">
          {new Date(remainSecond * 1000).toISOString().substr(11, 8)}
        </div>
        <button onClick={countdown}>click</button>
      </div>
    </>
  );
};

export default Timer;
