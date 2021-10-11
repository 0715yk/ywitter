import "./App.css";
import { useState } from "react";
import Main from "./pages/Main";
import Landing from "./pages/Landing";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [color, setColor] = useState("black");
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
          <Main workouts={workouts} color={color} setWorkouts={setWorkouts} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
