import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, Redirect } from 'react-router';
import {hashHistory} from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from '../reducers';

import Loader from '../common/loader';
import Toast from '../common/toast';

import Home from './home';
import ShowLoader from './ShowLoader';
import ShowTab from './ShowTab';
import ShowSwiper from './ShowSwiper';

import ScrollTo from '../components/scrollTo';


let store = createStore(reducers);

class App extends Component{
	constructor(props){
		super(props);
	}	
	render(){
		return (
			<div>
				{this.props.children}
				<Loader/>
				<Toast/>
			</div>
		);
	}
}

export default class Root extends Component {
	constructor(props){
		super(props);
	}
	render(){
		return (
			<Provider store={store}>
				<Router history={hashHistory}>
					<Route component={App}>
						<Route path="/" component={Home} />
						<Route path="showloader" component={ShowLoader}/>
						<Route path="showtab" component={ShowTab}/>
						<Route path="showswiper" component={ShowSwiper}/>
						<Route path="scrollto" component={ScrollTo}/>
					</Route>
				</Router>
			</Provider>
		);
	}
}