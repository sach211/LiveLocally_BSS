import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <form class="box">
          <p class="title is-1 is-spaced">live locally</p>
          <p class="subtitle is-5">sign in to connect with a local at your destination</p>
          <div class="field">
            <div class="control">
              <input class="input" type="email" placeholder="e.g. sachi@example.com"/>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <input class="input" type="password" placeholder="********"/>
            </div>
          </div>
          <button class="button is-dark">Log in</button>
          <button class="button is-light">Sign up</button>
        </form>
      </header>
    </div>
  );
}

export default App;