import './../App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import history from "./../history";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import plane from './../images/plane.png';
import home from './../images/home.png';

const config = {
  apiKey: "AIzaSyBIZcIL4XLJdPNfYet_8Bg13eR3T5b3vPg",
  authDomain: "ll-auth-61b58.firebaseapp.com",
  projectId: "ll-auth-61b58",
  storageBucket: "ll-auth-61b58.appspot.com",
  messagingSenderId: "11109129263",
  appId: "1:11109129263:web:772a1073688437105e3ada",
  measurementId: "G-HDW789R2WE"
};
firebase.initializeApp(config);

export default class Signin extends Component {
  state = {
    isSignedIn: false 
  };

  uiConfig = {
    
    signInFlow: 'popup',
    
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      
      signInSuccessWithAuthResult: () => false
    }
  };
 
  
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({isSignedIn: !!user})
    );
  }
  
  componentWillUnmount() {
    this.unregisterAuthObserver();
  } 
  
  render() {
    if (!this.state.isSignedIn) {
      return (
        <div className="AppSignIn">
          <header className="App-header">
          </header>
          <div className="App-content Min-content">
          <form class="box">
              <p class="title is-1 is-spaced">live locally</p>
              <p class="subtitle is-5">sign up to connect with a local at your destination</p>
              <StyledFirebaseAuth uiCallback={ui => ui.disableAutoSignIn()} uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
            </form>
            </div>
        </div>
      );
    }
    return (
      <div className="AppSignIn">
        <header className="App-header">
        </header>
        <div className="Min-content App-content">
          <div class="columns">
            <div class="column is-half">
              <div class="box">
                <article class="media">
                    <figure class="image is-64x64">
                      <img src={home} alt="Image" />
                    </figure>
                  <div class="media-content">
                    <div class="content">
                        <button class="button is-white is-large is-fullwidth" onClick={() => history.push('/yourPins/home')}>Continue as Host</button>
                    </div>
                  </div>
                </article>
              </div>
            </div>
            <div class="column is-half">
              <div class="box">
              <article class="media">
                    <figure class="image is-64x64">
                      <img src={plane} alt="Image" />
                    </figure>
                  <div class="media-content">
                    <div class="content">
                        <button class="button is-white is-large is-fullwidth" onClick={() => history.push('/galleryPins/home')}>Continue as Guest</button>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
          <button class="button is-white" onClick={() => firebase.auth().signOut()}>Sign Out</button>
        </div>
      </div>
    );
  }
}