import './App.css';
import plane from './images/plane.png';
import home from './images/home.png';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <div class="columns">
          <div class="column is-half">
            <div class="box">
              <article class="media">
                  <figure class="image is-64x64">
                    <img src={home} alt="Image" />
                  </figure>
                <div class="media-content">
                  <div class="content">
                      <button class="button is-white is-large is-fullwidth">Continue as Host</button>
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
                      <button class="button is-white is-large is-fullwidth">Continue as Guest</button>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Home;
