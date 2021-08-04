// Core
import React from "react";
import {Switch, Redirect, Route} from 'react-router-dom';

// Components
import EditTaskFrom from "./components/EditTaskFrom/EditTaskFrom";
import TaskList from "./components/TaskList/TaskList";

const App: React.FC = () => {
  return (
    <div className="container pt-5" style={{width: 800}}>
      <Switch>
        <Route path="/" exact><Redirect to="/services"/></Route>
        <Route path="/services/:id" component={EditTaskFrom}/>
        <Route path="/services" component={TaskList}/>
      </Switch>
    </div>
  );
}

export default App;
