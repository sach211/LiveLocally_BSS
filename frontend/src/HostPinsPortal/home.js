import './../App.css';
import map from './../images/pinsHomeMap.png';
import history from "./../history";
import React, { Component } from 'react';

export default class Home extends Component {
  burgerTransform() {
    var navActive = document.getElementById("menu");
    
    if (navActive.style.visibility == "visible") {
      navActive.style.visibility = "hidden";
    }
    else {
      navActive.style.visibility = "visible";
    }

  }
  render() {
    return (
      <div className="AppBg">
        <header className="App-header">
        </header>
        <div className="App-content">
          <div id="burger" class="burger" onClick={() => this.burgerTransform()}>
              <div id="b1" class="bar1"></div>
              <div id="b2" class="bar2"></div>
              <div id="b3" class="bar3"></div>
          </div>
          <div id="menu" class="navBlock navActive">
            <aside class="menu">
              <p class="menu-label">
                New
              </p>
              <ul class="menu-list">
                <li><a onClick={() => history.push('/yourPins/addPin')}>Location</a></li>
                <li><a onClick={() => history.push('/yourPins/addCategory')}>Category</a></li>
              </ul>
              <p class="menu-label">
                View
              </p>
              <ul class="menu-list">
                <li><a onClick={() => history.push('/yourPins/pinsList')}>Locations</a></li>
                <li><a onClick={() => history.push('/yourPins/categories')}>Categories</a></li>
              </ul>
            </aside>
          </div>
          <figure class="image">
            <img src={map} alt="Image" />
          </figure>
        </div>
      </div>
    );
  }
}
