import { Component } from 'react';
import { Router, Route, Link, IndexRoute, Redirect, useRouterHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createHashHistory } from 'history'

import Loader from 'common/components/loader';
import Toast from 'common/components/toast';

import Home from './home';
import ShowLoader from './ShowLoader';
import ShowTab from './ShowTab';
import ShowSwiper from './ShowSwiper';

import ScrollTo from 'common/components/scrollTo';

import store from '../store';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

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
				<Router history={appHistory}>
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