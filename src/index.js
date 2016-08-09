import React from 'react';
import {render} from 'react-dom';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import undoable, {excludeAction} from 'redux-undo';

import {board} from './redux/reducers/board';
import {flags} from './redux/reducers/flags';
import {Board} from './redux/container';
import {start, HAS_WON, HAS_LOST, UPDATE_UNDO} from './redux/actions';

import './index.css';
import './main.css';
// import './style.scss';

const isBrowser = typeof window !== 'undefined';
const devToolsExtension = isBrowser && window.devToolsExtension ? window.devToolsExtension() : f => f;

const store = createStore(
  combineReducers({board: undoable(board, {
    debug: true,
    filter: excludeAction([HAS_WON, HAS_LOST, UPDATE_UNDO])
  }), flags}),
  compose(
    applyMiddleware(thunk),
    devToolsExtension
  )
);

store.dispatch(start());

render(
  <Provider store={store}>
    <Board/>
  </Provider>,
  document.getElementById('root')
);
