import "./App.css";
import { useState } from "react";
import Main from "./pages/Main";
import Landing from "./pages/Landing";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [workouts, setWorkouts] = useState([]);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Landing workouts={workouts} setWorkouts={setWorkouts} />
        </Route>
        <Route path="/main">
          <Main workouts={workouts} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
