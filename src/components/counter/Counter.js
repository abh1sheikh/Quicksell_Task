import React, { useState, useEffect } from "react";
import axios from "axios";
import Display from "./Display";
import "./Counter.css";
require("dotenv").config();

const Counter = () => {
  const MAX = process.env.REACT_APP_MAX_VALUE ?? 1000;
  console.log("env", process.env.REACT_APP_MAX_VALUE);
  const [counter, setCounter] = useState(1);
  const [showLoader, setshowLoader] = useState(false);
  const inputRef = React.useRef();
  useEffect(() => {
    axios
      .get(
        "https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/counter1.json"
      )
      .then((response) => {
        if (response.data) setCounter(response.data);
      });
  }, []);

  useEffect(() => {
    setshowLoader(true);
    const value = { abhishek: counter };
    axios
      .put(
        "https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json",
        value
      )
      .then((response) => {
        setshowLoader(false);
      });
    handleWidth();
  }, [counter]);

  const incrementCount = () => {
    if (isNaN(counter)) setCounter(1);
    else {
      if (counter >= MAX) return;
      setCounter(counter + 1);
      handleWidth();
    }
  };

  const decrementCount = () => {
    if (isNaN(counter)) setCounter(0);
    else {
      if (counter >= MAX) return;
      setCounter(counter - 1);
      handleWidth();
    }
  };

  const handleChange = (event) => {
    if (event.target.value) {
      if (parseInt(event.target.value) > MAX) return;
      else setCounter(parseInt(event.target.value));
    } else {
      setCounter(event.target.value);
    }
  };

  const returnWidth = () => {
    if (isNaN(counter)) return 1 + "ch";
    else return counter.toString().length + 1 + "ch";
  };
  const handleWidth = () => {
    inputRef.current.style.width = `${returnWidth()}`;
  };

  return (
    <div className="container">
      <div className="loader">
        {showLoader ? (
          <div>
            <div className="spinner"></div>
            <span>Saving counter value</span>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="buttons">
        <div className="box box-left">
          <button onClick={decrementCount}>-</button>
        </div>
        <div className="box box-right">
          <input
            ref={inputRef}
            className="input-number"
            onKeyDown={handleWidth}
            type="number"
            max={MAX}
            value={counter}
            onChange={handleChange}
          />
        </div>
        <div className="box box-centre">
          <button onClick={incrementCount}>+</button>
        </div>
      </div>
      <Display counter={counter} />
    </div>
  );
};

export default Counter;
