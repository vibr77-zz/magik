import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware,compose } from 'redux';
import { Provider } from 'react-redux';

import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import App from './components/App';
import reducer from './_reducers';

import './css/index.css';

import { SnackbarProvider } from 'notistack';

import i18n from "./_helpers/i18n";
import { I18nextProvider } from "react-i18next";

import Sse from './sse'

const loggerMiddleware = createLogger();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,
	composeEnhancers(applyMiddleware(
		thunkMiddleware,
		loggerMiddleware)))

render(
  <Provider store={store} >
    <SnackbarProvider maxSnack={3}
    anchorOrigin={{
          vertical: 'bottom',
         horizontal: 'right',
     }}>

  	 <I18nextProvider i18n={i18n}>
    	<App />
      <Sse />
  	</I18nextProvider>
  	</SnackbarProvider>
  </Provider>,
  document.getElementById('app')
)

