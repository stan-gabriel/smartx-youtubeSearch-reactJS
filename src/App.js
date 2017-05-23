import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import {Provider} from 'react-redux';

import AsyncRoute from './AsyncRoute';
import store from './redux/store';

import './App.scss';

function App () {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className='app'>
          <AsyncRoute loadingPromise={System.import('./Header.js')} />
          <Route
            exact
            path='/'
            component={(props) => <AsyncRoute props={props} loadingPromise={System.import('./SearchVideos.js')} />}
          />
          <Route
            exact
            path='/my-videos'
            component={(props) => <AsyncRoute props={props} loadingPromise={System.import('./MyVideos.js')} />}
          />
        </div>
      </Provider>
    </BrowserRouter>
  );
}

render(
  <App />,
  document.getElementById('app')
);
