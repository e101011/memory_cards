import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import './main.scss';

import Application from './components/Application';
import LevelSelection from './components/LevelSelection';
import Creator from './components/Creator';
import Playground from './components/Playground';
import UserCards from './components/UserCards';
import Result from './components/Result';

const path = process.env.PUBLIC_URL;

const MemoryCardsApp = (
	<Provider store={store}>
		<BrowserRouter>
			<Switch>
				<Route path={`${path}/`} exact component={Application} />
				<Route path={`${path}/level`} component={LevelSelection} />
				<Route path={`${path}/create`} component={Creator} />
				<Route path={`${path}/playground`} component={Playground} />
				<Route path={`${path}/user_cards`} component={UserCards} />
				<Route path={`${path}/result`} component={Result} />
				<Redirect to={`${path}/`} />
			</Switch>
		</BrowserRouter>
	</Provider>
);


ReactDOM.render( MemoryCardsApp, document.querySelector('.memory-game') );