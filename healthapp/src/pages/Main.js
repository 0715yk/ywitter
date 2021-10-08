import React, { useEffect, useState } from "react";
import styles from "./Main.module.css";
import List from "./List";

const Main = ({ workouts, color }) => {
  const [checkList, setCheckList] = useState([]);
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    const obj = [];
    for (let i = 0; i < workouts.length; i++) {
      obj[i] = [];
    }
    setCheckList(obj);
  }, []);

  const addWorkoutSet = (key) => {
    const copyArr = Object.assign(checkList);
    copyArr.push("h;lll");
    console.log(copyArr);
    setCheckList(copyArr);
  };

  useEffect(() => {}, [checkList]);

  return (
    <div className={styles.mainPage}>
      <header style={{ backgroundColor: color }}>
        <i className="fas fa-running"></i> Progressive Overload
      </header>
      <main>
        <section>
          <div className={styles.workoutPart}>
            {flag &&
              checkList.map((list, key) => {
                return (
                  <>
                    <div
                      className={styles.workoutName}
                      style={{ backgroundColor: color }}
                    >
                      {workouts[key]}
                    </div>
                    <div
                      onClick={() => {
                        addWorkoutSet(key);
                        setFlag(false);
                        setFlag(true);
                      }}
                      className={styles.plusBtn}
                      style={{
                        color: color,
                      }}
                    >
                      +
                    </div>
                    <List list={list} />
                  </>
                );
              })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Main;
