import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./HomePage";
import GamePage from "./GamePage";

export default function App() {
    return (
        <main>
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/game" component={GamePage} />
                </Switch>
            </Router>
        </main>
    );
}
