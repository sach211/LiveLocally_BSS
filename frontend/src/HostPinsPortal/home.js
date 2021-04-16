import './../App.css';
import map from './../images/pinsHomeMap.png';

import React, { Component } from 'react';

export default class Home extends Component {
  burgerTransform() {
    var navActive = document.getElementById("menu");
    
    if (navActive.style.visibility == "hidden") {
      navActive.style.visibility = "visible";
    }
    else {
      navActive.style.visibility = "hidden";
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
                <li><a>Location</a></li>
                <li><a>Category</a></li>
              </ul>
              <p class="menu-label">
                View
              </p>
              <ul class="menu-list">
                <li><a>Categories</a></li>
                <li><a>Locations</a></li>
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
