import React, { useEffect, useState } from "react";
import styles from "./Record.module.css";
import { useHistory } from "react-router-dom";
import moment from "moment";

const Record = ({ checkList, setWorkouts, setCheckList, startTime }) => {
  const [totalRecord, setTotalRecord] = useState({});
  const history = useHistory();
  const [bestSet, setBestSet] = useState({});
  const getQueryVariable = (variable) => {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] === variable) {
        return pair[1];
      }
    }
    return false;
  };

  useEffect(() => {
    const copyObj = { ...checkList };
    const copySet = { ...bestSet };
    for (let [key, value] of Object.entries(copyObj)) {
      if (value.length === 0) continue;
      var best = [-1, -1];
      for (let el of value) {
        if (parseInt(best[0]) <= parseInt(el[0])) {
          if (parseInt(best[0]) === parseInt(el[0])) {
            if (parseInt(best[1]) < parseInt(el[1])) {
              best = el;
            }
            continue;
          }
          best = el;
        }
      }
      copySet[key] = best;
    }
    setBestSet(copySet);
    const record = {};
    const timeLapse = getQueryVariable("timelapse");

    record["timeLapse"] = `${timeLapse.split(":")[0]}h ${
      timeLapse.split(":")[1]
    }m`;
    record["startTime"] = startTime;
    record["finishedTime"] = moment().format("HH:mm");
    setTotalRecord(record);
  }, []);

  const completeWorkout = () => {
    setWorkouts([]);
    setCheckList({});
    history.push("/");
  };

  return (
    <div className={styles.recordPage}>
      <header className={styles.recordHeader}>
        <h2>Records</h2>
      </header>
      <main>
        <article id={styles.totalRecordPart}>
          <h3>Total</h3>
          <ul>
            <li>{moment().format("h:mm A, ddd MMM D일 YYYY")}</li>
            <li
              className={styles.timeLapsePart}
            >{`⏱ ${totalRecord["timeLapse"]} [${totalRecord["startTime"]} ~ ${totalRecord["finishedTime"]}]`}</li>
            <li>
              <span>Best set</span>
              <ul list-style="none">
                {Object.keys(bestSet).map((el) => {
                  return (
                    <li>{`${el} : ${bestSet[el][0]} kg x ${bestSet[el][1]}`}</li>
                  );
                })}
              </ul>
            </li>
            {/* <li>연속 운동 일수 : 12시간</li> */}
          </ul>
        </article>
        <article id={styles.tablePart}>
          {Object.keys(checkList).map((workoutName) => {
            return (
              <section>
                <h3>{workoutName}</h3>
                <table>
                  <thead>
                    <th>set</th>
                    {checkList[workoutName].map((_, key) => {
                      return <th key={key}>{key + 1}</th>;
                    })}
                  </thead>
                  <tbody>
                    <tr>
                      <th>weight</th>
                      {checkList[workoutName].map((el, key) => {
                        return <td key={key}>{el[0]}</td>;
                      })}
                    </tr>
                    <tr>
                      <th>reps</th>
                      {checkList[workoutName].map((el, key) => {
                        return <td key={key}>{el[1]}</td>;
                      })}
                    </tr>
                  </tbody>
                  <tfoot></tfoot>
                </table>
              </section>
            );
          })}
        </article>
      </main>
      <footer>
        <nav>
          <button onClick={completeWorkout}>GO BACK</button>
        </nav>
      </footer>
    </div>
  );
};

export default Record;
