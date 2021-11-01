import React, { useEffect, useState } from "react";
import styles from "./Main.module.css";
import { useHistory } from "react-router-dom";
import List from "../components/List";
import TimeLapse from "../components/TimeLapse";
import moment from "moment";

const Main = ({ workouts, color, checkList, setCheckList }) => {
  const [timeLapse, setTimeLapse] = useState("");
  const history = useHistory();
  useEffect(() => {
    const obj = Object.assign({}, checkList);
    for (let el of workouts) {
      obj[el] = [];
    }
    setCheckList(obj);
  }, []);

  const addWorkoutSet = (name) => {
    const copyObj = Object.assign({}, checkList);
    const copyArr = copyObj[name];

    if (copyArr.length !== 0 && copyArr[copyArr.length - 1].length === 0) {
      alert("cannot add set before clearing prev set!");
      return;
    }
    copyArr.push([]);
    copyObj[name] = copyArr;
    setCheckList(copyObj);
  };

  const done = () => {
    let records = localStorage.getItem("records");
    if (!records) {
      const obj = { ...checkList };
      obj["date"] = moment().format("YYYY년 MM월 D일(ddd)");
      localStorage.setItem("records", JSON.stringify([obj]));
    } else {
      records = JSON.parse(records);
      const obj = { ...checkList };
      obj["date"] = moment().format("YYYY년 MM월 D일(ddd)");
      records.push(obj);
      localStorage.setItem("records", JSON.stringify(records));
    }

    history.push(`/record?timelapse=${timeLapse}`);
  };

  return (
    <div className={styles.mainPage}>
      <header style={{ backgroundColor: color }}>
        <i className="fas fa-running"></i> Progressive Overload
      </header>
      <article>
        <TimeLapse
          color={color}
          setTimeLapse={setTimeLapse}
          timeLapse={timeLapse}
        />
      </article>
      <main>
        <section>
          <div className={styles.workoutPart}>
            {Object.keys(checkList).map((workoutName, key) => {
              return (
                <>
                  <div
                    className={styles.workoutName}
                    style={{ backgroundColor: color }}
                  >
                    {workoutName}
                  </div>
                  <div
                    onClick={() => {
                      addWorkoutSet(workoutName);
                    }}
                    className={styles.plusBtn}
                    style={{
                      color: color,
                    }}
                  >
                    +
                  </div>
                  <List
                    workoutName={workoutName}
                    list={checkList[workoutName]}
                    setCheckList={setCheckList}
                    checkList={checkList}
                    color={color}
                  />
                </>
              );
            })}
          </div>
        </section>
      </main>
      <section className={styles.doneBtnPart}>
        <button
          className={styles.doneBtn}
          style={{ backgroundColor: color }}
          onClick={done}
        >
          👏 DONE 👏
        </button>
      </section>
    </div>
  );
};

export default Main;
