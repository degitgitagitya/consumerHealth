import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Drug from "./Pages/Drug";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home></Home>
        </Route>
        <Route path="/drug" exact>
          <Drug></Drug>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
