import { Component, PropTypes } from 'react';
import { connect, Provider } from 'react-redux';
import { Router, Route, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import store from './store';

import App from './modules';

const routes = {
	path: '/',
	component: App,
	onEnter: (nextState, replace, callback) => {
		// console.info('onEnter', nextState, replace)
		callback();
	},
	onLeave: (prevState) => {
		// console.info('onLeave', prevState)
	},
	onChange: (prevState, nextState, replace, callback) => {
		// console.info('onChange', prevState, nextState, replace)
		callback();
	},
	getIndexRoute(nextState, cb) {
		require.ensure([], require => {
			cb(null, require('modules/home'))
		}, 'indexRoute')
	},
	getChildRoutes(nextState, cb) {
		require.ensure([], require => {
			cb(null, [
				require('modules/scrollTo'),
				require('modules/showloader'),
				require('modules/showswiper'),
				require('modules/showtab'),
				require('modules/surroundAbsolute'),
				require('modules/reactLazy'),
				require('modules/reactLazy/lazy-img-router'),
				require('modules/reactLazy/lazy-component-router'),
				require('modules/reactPlayer'),
			])
		}, 'dynamicRoutes')
	}
}

// remove _k in url
const history = useRouterHistory(createHashHistory)({
	queryKey: false
});

function onenter(nextState, transition) {
	// console.log(nextState);
	// TODO 如果后续有要登录的需求可以拿回来了这里先注释掉了,应为cdm要在onenter之后才调用
}

function onleave() {
	// store.dispatch(bindActions.hideAll());
}


export default class Root extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router history={history} routes={routes}></Router>
			</Provider>
		);
	}
}
