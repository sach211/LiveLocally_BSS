import './../App.css';

import React, { Component } from 'react';

export default class Home extends Component {
  burgerTransform() {
    var button = document.getElementById("bt1");
    button.innerHTML = "ho";

    document.getElementById("b1").classList.add("change");
    document.getElementById("b2").classList.add("change");
    document.getElementById("b3").classList.add("change");
  }
  render() {
    return (
      <div className="AppBg">
        <header className="App-header">
        </header>
        <div className="App-content">
          <div class="burger" onClick={() => this.burgerTransform()}>
            <div id="b1" class="bar1"></div>
            <div id="b2" class="bar2"></div>
            <div id="b3" class="bar3"></div>
          </div>
          <div class="columns">
            <div class="column is-half">
              <article class="media">
                <div class="media-content">
                  <div class="content">
                      <button id="bt1" class="button is-white is-large is-fullwidth">Host Home</button>
                  </div>
                </div>
              </article>
            </div>
            <div class="column is-half">
              <article class="media">
                <div class="media-content">
                  <div class="content">
                      <button class="button is-white is-large is-fullwidth">Host Home</button>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
