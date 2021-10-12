import React, { useEffect, useState } from "react";
import styles from "./Record.module.css";
import { useHistory } from "react-router-dom";

const Record = ({ checkList, setWorkouts, setCheckList }) => {
  const [totalRecord, setTotalRecord] = useState({});
  const history = useHistory();

  useEffect(() => {
    const copyObj = { ...checkList };
    const totalWorkOuts = Object.keys(copyObj).length;
    const record = {};
    record["totalCnt"] = totalWorkOuts;
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
            <li>{`total workouts: ${totalRecord["totalCnt"]}`}</li>
            {/* <li>총 운동종목 : 12시간</li> */}
            {/* <li>
              기록 갱신 목록:
              <ol>
                <li>벤치 프레스 40kg 달성</li>
                <li>턱걸이 13개 달성</li>
              </ol>
            </li>
            <li>연속 운동 일수 : 12시간</li> */}
          </ul>
        </article>
        <article id={styles.tablePart}>
          {Object.keys(checkList).map((workoutName) => {
            console.log();
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
