import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Vocabulary from './data/thing.json'

import Trainer from './pages/Trainer'
import Lesson from './pages/Lesson'
import Nav from './components/Nav'

const App = () => {
    return (
        <div className="page">
            <Router>
                <Nav/>
                <Switch>
                    <Route path="/" exact>
                        <Trainer vocabularyList={Vocabulary} />
                    </Route>
                    <Route path="/lesson/:lessonId">
                        <Lesson vocabularyList={Vocabulary} />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App;