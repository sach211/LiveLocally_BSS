import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import PinGalleryHome from "./PinGalleryPortal/home";
import PinsHome from "./HostPinsPortal/home";
import Signin from "./SignIn/signin"
import history from './history';
import ViewPins from "./HostPinsPortal/viewPins";
import ViewCategories from "./HostPinsPortal/viewCategories";
import AddPin from "./HostPinsPortal/addPin";
import AddCategory from "./HostPinsPortal/addCategory";

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Signin} />
                    <Route path="/yourPins/home" component={PinsHome} />
                    <Route path="/galleryPins/home" component={PinGalleryHome} />
                    <Route path="/yourPins/pinsList" component={ViewPins} />
                    <Route path="/yourPins/categories" component={ViewCategories} />
                    <Route path="/yourPins/addPin" component={AddPin} />
                    <Route path="/yourPins/addCategory" component={AddCategory} />
                </Switch>
            </Router>
        )
    }
}