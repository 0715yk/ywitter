import React, { useState, useRef } from "react";
import styles from "./Landing.module.css";
import { useHistory } from "react-router-dom";

const Landing = ({ workouts, setWorkouts }) => {
  const history = useHistory();
  const [workout, setWorkout] = useState("");
  const selectRef = useRef(null);
  const inputRef = useRef(null);
  const [color, setColor] = useState("black");
  const [colorPopup, setColorPopup] = useState(false);
  const colors = [
    "black",
    "teal",
    "goldenrod",
    "red",
    "orange",
    "darkturquoise",
    "peachpuff",
    "darkslategray",
    "dodgerblue",
    "midnightblue",
    "deeppink",
    "olivedrab",
    "gold",
    "coral",
    "limegreen",
    "mediumspringgreen",
  ];

  const getNormalInput = (e) => {
    setWorkout(e.target.value);
    selectRef.current.value = null;
    if (e.keyCode === 13) {
      registerWorkout();
    }
  };

  const getSelectInput = (e) => {
    const workout = e.target.value;
    setWorkout(workout);
    inputRef.current.value = null;
  };

  const registerWorkout = () => {
    const copy_arr = workouts.slice();

    let workoutName = workout;
    workoutName = workoutName.replace(/ /g, "");
    if (workoutName.length === 0) {
      alert("Please enter more than a word");
      return;
    }
    if (workouts.indexOf(workout) === -1) {
      copy_arr.push(workout);
      setWorkouts(copy_arr);
      setWorkout("");
      inputRef.current.value = null;
      selectRef.current.value = null;
    } else {
      alert("Already choosen");
    }
  };

  const setThemaColor = (color) => {
    setColor(color);
  };

  const deleteWorkout = (word) => {
    const copy_arr = workouts.slice();
    setWorkouts(copy_arr.filter((el) => el !== word));
  };

  const startWorkout = () => {
    if (workouts.length === 0) {
      alert("must select more than a workout");
      return;
    }
    history.push("/main");
  };
  return (
    <div className={styles.landingPage}>
      <header style={{ backgroundColor: color }}>
        <i className="fas fa-running"></i> Progressive Overload
      </header>
      <main>
        <section>
          <div className={styles.subtitle} style={{ color: color }}>
            select today's workout{" "}
          </div>
          <div className={styles.registerArea}>
            <div className={styles.inputArea}>
              <input
                placeholder="direct input"
                style={{ outlineColor: color }}
                onKeyDown={getNormalInput}
                ref={inputRef}
                className={styles.directInput}
                onChange={getNormalInput}
              />
              <select
                style={{ outlineColor: color }}
                ref={selectRef}
                className={styles.indirectInput}
                onChange={getSelectInput}
              >
                <option selected disabled>
                  choose basic workout
                </option>
                <option>pull up</option>
                <option>lat pulldown</option>
                <option>deadlift</option>
                <option>seated row</option>
                <option>back extension</option>
                <option>push up</option>
                <option>bench press</option>
                <option>incline press</option>
                <option>decline press</option>
                <option>dumbbell chest press</option>
                <option>dips</option>
                <option>squat</option>
                <option>leg extension</option>
                <option>leg curl</option>
                <option>lunge</option>
                <option>dumbbell curl</option>
                <option>shoulder press</option>
                <option>military press</option>
                <option>Side Lateral Raise</option>
                <option>front Raise</option>
              </select>
            </div>
            <button
              className={styles.btnArea}
              style={{ backgroundColor: color }}
              onClick={registerWorkout}
            >
              +
            </button>
          </div>
        </section>
        <section>
          <div className={styles.subtitle} style={{ color: color }}>
            today's workouts{" "}
          </div>
          <div className={styles.workouts}>
            {workouts.map((workout, key) => {
              return (
                <div
                  key={key}
                  className={styles.workoutList}
                  style={
                    key % 2 === 0
                      ? { backgroundColor: color }
                      : { backgroundColor: null }
                  }
                >
                  <div
                    className={styles.workoutName}
                    style={
                      key % 2 === 0 ? { color: "white" } : { color: color }
                    }
                  >
                    {workout}
                  </div>
                  <span
                    onClick={() => {
                      deleteWorkout(workout);
                    }}
                    className={styles.deleteBtn}
                    style={
                      key % 2 === 0 ? { color: "white" } : { color: color }
                    }
                  >
                    X
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      {colorPopup ? (
        <div className={styles.fixedOpenedBtn}>
          <div className={styles.colorPart}>
            {colors.map((color) => {
              return (
                <div
                  onClick={() => {
                    setThemaColor(color);
                  }}
                  style={{
                    marginLeft: "1rem",
                    backgroundColor: color,
                    minWidth: "20px",
                    minHeight: "20px",
                    borderRadius: "3px",
                  }}
                ></div>
              );
            })}
          </div>
          <div
            className={styles.closeBtn}
            onClick={() => {
              setColorPopup(false);
            }}
          >
            X
          </div>
        </div>
      ) : (
        <span
          className={styles.fixedBtn}
          style={{ color: color }}
          onClick={() => {
            setColorPopup(true);
          }}
        >
          change color
        </span>
      )}
      <button
        onClick={startWorkout}
        className={styles.strtBtn}
        style={{ backgroundColor: color, color: "white" }}
      >
        🔥 burning 🔥
      </button>
    </div>
  );
};

export default Landing;
