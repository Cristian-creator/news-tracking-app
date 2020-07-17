import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { BrowserRouter as Router} from 'react-router-dom';

// REDUX
import { Provider } from 'react-redux';
import store from './store/store';

ReactDOM.render(
  <Provider store={store}>
    <Router>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Router>
    </Provider>,
  document.getElementById('root')
);

