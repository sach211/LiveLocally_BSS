import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import GuestHome from "./GuestPortal/home";
import HostHome from "./HostPortal/home";
import Signin from "./SignIn/signin"
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Signin} />
                    <Route path="/host/home" component={HostHome} />
                    <Route path="/guest/home" component={GuestHome} />
                </Switch>
            </Router>
        )
    }
}