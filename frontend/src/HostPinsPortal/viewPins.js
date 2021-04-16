import './../App.css';
import history from "./../history";
import React, { Component } from 'react';
import pinImg from './../images/pinImg.png';

export default class viewPins extends Component {
  burgerTransform() {
    var navActive = document.getElementById("menu");
    
    if (navActive.style.visibility == "hidden") {
      navActive.style.visibility = "visible";
    }
    else {
      navActive.style.visibility = "hidden";
    }
  }

  state = {
      pins: null
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:4000/dev/yourPins/pinsList')
    const pins = await response.json()
    // save it to your components state so you can use it during render
    this.setState({pins: pins})
    console.log(pins)
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
                <li><a onClick={() => history.push('/yourPins/categories')}>Categories</a></li>
                <li><a onClick={() => history.push('/yourPins/pinsList')}>Locations</a></li>
              </ul>
            </aside>
          </div>
          <div class="card">
            <div class="card-content">
                <div class="media">
                    <div class="media-left">
                        <figure class="image is-48x48">
                            <img src={pinImg} alt="Placeholder image"/>
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-4">Your Pins</p>
                    </div>
                </div>
                <div class="content">
                {
                    this.state.pins && this.state.pins.map(pins => {
                    return (
                        <li>
                        <div>{pins.name}</div>
                        <div>Category: {pins.category}</div>
                        <div>Likes: {pins.likes}</div>
                        </li>
                    )
                    })
                }
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
