import React, { useEffect } from "react";
import moment from "moment";
import styles from "./TimeLapse.module.css";

const TimeLapse = ({ color, setTimeLapse, timeLapse }) => {
  useEffect(() => {
    const now = moment();
    var timer = setInterval(() => {
      var s = moment.duration(
        moment().diff(moment(now, "DD/MM/YYYY HH:mm:ss"))
      );
      const time = {
        hr: s.hours(),
        min: s.minutes(),
        sec: s.seconds(),
      };

      setTimeLapse(`${time.hr}:${time.min}:${time.sec}`);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={styles.timeLapse} style={{ backgroundColor: color }}>
      <div className={styles.timeImage}>⏳</div>
      <div className={styles.timeText}>timelapse :</div>
      <div className={styles.time}>{timeLapse}</div>
    </div>
  );
};

export default TimeLapse;
