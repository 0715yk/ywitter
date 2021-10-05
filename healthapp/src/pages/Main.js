import React, { useEffect, useState } from "react";
import styles from "./Main.module.css";

const Main = ({ workouts }) => {
  const [checkList, setCheckList] = useState({});

  useEffect(() => {
    const obj = {};
    for (let workout of workouts) {
      obj[workout] = {
        sets: [],
      };
    }
    setCheckList(obj);
  }, []);

  const startWorkOut = (workout) => {
    const copyObj = Object.assign(checkList);
    copyObj[workout]["sets"].push({
      startTime: "0405",
    });
    setCheckList(copyObj);
  };
  return (
    <div className={styles.mainPage}>
      <header> </header>
      <main>
        <ul>
          {Object.entries(checkList).map((workout, key) => {
            return (
              <li key={key}>
                {workout[0]}
                <button
                  onClick={() => {
                    startWorkOut(workout[0]);
                  }}
                >
                  start
                </button>
                <ul>
                  {checkList[workout[0]]["sets"].map((set) => {
                    return <li>{set["startTime"]}</li>;
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
};

export default Main;
