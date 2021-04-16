import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import PinGalleryHome from "./PinGalleryPortal/home";
import PinsHome from "./HostPinsPortal/home";
import Signin from "./SignIn/signin"
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Signin} />
                    <Route path="/yourPins/home" component={PinsHome} />
                    <Route path="/galleryPins/home" component={PinGalleryHome} />
                </Switch>
            </Router>
        )
    }
}