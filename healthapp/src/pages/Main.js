import React, { useEffect, useState } from "react";
import styles from "./Main.module.css";
import { useHistory } from "react-router-dom";
import List from "./List";

const Main = ({ workouts, color, setWorkouts }) => {
  const [checkList, setCheckList] = useState({});
  const [nowTime, setNowTime] = useState(0);
  const [timeLapse, setTimeLapse] = useState("");
  const history = useHistory();
  useEffect(() => {
    const obj = Object.assign({}, checkList);
    for (let el of workouts) {
      obj[el] = [];
    }
    setCheckList(obj);
  }, []);

  // setInterval(() => {
  //   let time = nowTime + 1;
  //   setNowTime(time);
  // }, 1000);

  // useEffect(() => {
  //   let hr = Math.floor(nowTime / 3600);
  //   let rest = nowTime % 3600;
  //   let min = Math.floor(rest / 60);
  //   rest = nowTime % 60;
  //   let sec = rest;

  //   setTimeLapse(`${hr}:${min}:${sec}`);
  // }, [nowTime]);

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
    setWorkouts([]);
    history.push("/");
  };

  return (
    <div className={styles.mainPage}>
      <header style={{ backgroundColor: color }}>
        <i className="fas fa-running"></i> Progressive Overload
      </header>
      {/* <section>{`timelapse : ${timeLapse}`}</section> */}
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
