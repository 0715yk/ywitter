import React, { useEffect, useState } from "react";
import styles from "./Records.module.css";
import { useHistory } from "react-router-dom";

const Records = ({ color }) => {
  const [checkLists, setCheckLists] = useState([]);
  const [empty, setEmpty] = useState(true);
  const history = useHistory();

  useEffect(() => {
    let records = JSON.parse(localStorage.getItem("records"));
    if (!records) return;
    setCheckLists(records);
    setEmpty(false);
  }, []);

  const back = () => {
    history.push("/");
  };

  return (
    <div className={styles.recordPage}>
      <button style={{ backgroundColor: color }} onClick={back}>
        back
      </button>
      <header>🖊 ProgressiveDiary</header>
      <main>
        {empty ? (
          <div className={styles.emptySign}>❌ empty records ❌</div>
        ) : (
          checkLists.map((el) => {
            return (
              <section>
                <article id={styles.datePart}>📅 {el["date"]}</article>
                <article id={styles.tablePart}>
                  {Object.keys(el).map((workoutName) => {
                    return (
                      workoutName !== "date" && (
                        <section>
                          <h3>{workoutName}</h3>
                          <table>
                            <thead>
                              <th>set</th>
                              {el[workoutName].map((_, key) => {
                                return <th key={key}>{key + 1}</th>;
                              })}
                            </thead>
                            <tbody>
                              <tr>
                                <th>weight</th>
                                {el[workoutName].map((el, key) => {
                                  return <td key={key}>{el[0]}</td>;
                                })}
                              </tr>
                              <tr>
                                <th>reps</th>
                                {el[workoutName].map((el, key) => {
                                  return <td key={key}>{el[1]}</td>;
                                })}
                              </tr>
                            </tbody>
                            <tfoot></tfoot>
                          </table>
                        </section>
                      )
                    );
                  })}
                </article>
              </section>
            );
          })
        )}
      </main>
    </div>
  );
};

export default Records;
