import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Lists from "../components/Lists";
import List from "../components/List";
import NewList from "../components/NewList";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/lists" exact component={Lists} />
      <Route path="/lists/new" exact component={NewList} />
      <Route path="/lists/:id" exact component={List} />
    </Switch>
  </Router>
);
