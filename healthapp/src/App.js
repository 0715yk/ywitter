import "./App.css";
import { useState } from "react";
import Main from "./pages/Main";
import Landing from "./pages/Landing";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Record from "./pages/Record";
import Records from "./pages/Records";

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [color, setColor] = useState("black");
  const [checkList, setCheckList] = useState({});
  const [startTime, setStartTime] = useState("");

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Landing
            workouts={workouts}
            setWorkouts={setWorkouts}
            color={color}
            setColor={setColor}
            setStartTime={setStartTime}
          />
        </Route>
        <Route path="/main">
          <Main
            workouts={workouts}
            color={color}
            setWorkouts={setWorkouts}
            setCheckList={setCheckList}
            checkList={checkList}
          />
        </Route>
        <Route path="/record">
          <Record
            startTime={startTime}
            checkList={checkList}
            setWorkouts={setWorkouts}
            setCheckList={setCheckList}
          />
        </Route>
        <Route path="/records">
          <Records color={color} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
