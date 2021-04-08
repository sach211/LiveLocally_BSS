import './../App.css';

import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <div className="App-content">
          <div class="columns">
            <div class="column is-half">
              <article class="media">
                <div class="media-content">
                  <div class="content">
                      <button class="button is-white is-large is-fullwidth">Guest Home</button>
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
