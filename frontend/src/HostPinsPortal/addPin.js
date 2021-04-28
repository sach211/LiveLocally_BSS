import './../App.css';
import pinImg from './../images/pinImg.png';
import history from "./../history";
import React, { Component } from 'react';
import firebase from 'firebase';

export default class addPin extends Component {
  burgerTransform() {
    var navActive = document.getElementById("menu");
    
    if (navActive.style.visibility == "visible") {
      navActive.style.visibility = "hidden";
    }
    else {
      navActive.style.visibility = "visible";
    }
  }

  async newLocation(){
    let backendUrl = "https://45qc94uz85.execute-api.us-east-1.amazonaws.com/dev/"

    if (window.location.href.includes('localhost')) {
      backendUrl = "http://localhost:4000/dev/"
    }

    const idToken = await firebase.auth().currentUser?.getIdToken()

    let locName = document.getElementById("locName").value
    let categoryName = document.getElementById("categoryName").value

    const response = await fetch(backendUrl + "/yourPins/addPin", {
        method: 'POST',
        headers: {
            'Authorization': idToken
        },
        body: JSON.stringify({
            loc_id: 4,
            uu_id: firebase.auth().currentUser.email,
            category_name: categoryName,
            loc_name: locName
        })
    }).then(response => response.json())
    
    console.log("POST")

    if (response.status === 401) {
        return console.log("Unauthorized")
    }else if (response.status === 400) {
        return console.log(response.body.message)
    }

    history.push('/yourPins/pinsList')
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
          <div class="card-content">
                <div class="media">
                    <div class="media-left">
                        <figure class="image is-48x48">
                            <img src={pinImg} alt="Placeholder image"/>
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-4">Add Pin</p>
                    </div>
                </div>
                <div class="content">
                    <div class="field">
                        <label class="label">Name</label>
                        <div class="control">
                            <input id="locName" class="input" type="text" placeholder="Text input"/>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Category</label>
                        <div class="control">
                            <input id="categoryName" class="input" type="text" placeholder="Text input"/>
                        </div>
                    </div>
                </div>
                <div class="field is-grouped">
                    <div class="control">
                        <button class="button is-link" onClick={() => this.newLocation()}>Submit</button>
                    </div>
                    <div class="control">
                        <button class="button is-link is-light" onClick={() => history.push('/yourPins/pinsList')}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
}
