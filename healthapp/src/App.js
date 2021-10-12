import "./App.css";
import { useState } from "react";
import Main from "./pages/Main";
import Landing from "./pages/Landing";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Record from "./pages/Record";

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [color, setColor] = useState("black");
  const [checkList, setCheckList] = useState({});

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Landing
            workouts={workouts}
            setWorkouts={setWorkouts}
            color={color}
            setColor={setColor}
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
            checkList={checkList}
            setWorkouts={setWorkouts}
            setCheckList={setCheckList}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
