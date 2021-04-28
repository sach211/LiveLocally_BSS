import './../App.css';
import history from "./../history";
import React, { Component } from 'react';
import pinImg from './../images/pinImg.png';
import firebase from 'firebase';

export default class viewCategories extends Component {
  burgerTransform() {
    var navActive = document.getElementById("menu");
    
    if (navActive.style.visibility == "visible") {
      navActive.style.visibility = "hidden";
    }
    else {
      navActive.style.visibility = "visible";
    }
  }

  state = {
      categories: null
  }

  async componentDidMount() {
    let backendUrl = "https://45qc94uz85.execute-api.us-east-1.amazonaws.com/dev/"

    if (window.location.href.includes('localhost')) {
      backendUrl = "http://localhost:4000/dev/"
    }

    const idToken = await firebase.auth().currentUser?.getIdToken()
    const uuid = firebase.auth().currentUser.email
    const response = await fetch(backendUrl + "yourPins/categories", {
      headers: {
        'Authorization': idToken,
        'uuid': uuid
      }
    })

    if (response.status === 401) {
      return console.log('unauthorized')
    }
    
    const categories = await response.json()
    // save it to your components state so you can use it during render
    this.setState({categories: categories})
    console.log(categories)
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
          <div class="card">
            <div class="card-content">
                <div class="media">
                    <div class="media-left">
                        <figure class="image is-48x48">
                            <img src={pinImg} alt="Placeholder image"/>
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-4">Your Categories</p>
                    </div>
                </div>
                <div class="content">
                {
                    this.state.categories && this.state.categories.map(categories => {
                    return (
                        <li>
                        <div>{categories.category_name}</div>
                        <div>Followers: {categories.followers}</div>
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
