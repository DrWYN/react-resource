import React, {Component} from 'react';


import {Link} from 'react-router';


export default class Home extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div>
				<div>Home</div>
				<Link to="/showloader">showLoader</Link>	<br/>
				<Link to="/showtab">showTab</Link>	<br/>
				<Link to="/showswiper">showSwiper</Link>	<br/>
				<Link to="/scrollto">scrollTo</Link> <br/>
				<Link to="/surroundAbsolute">surroundAbsolute</Link> <br/>
				<Link to="/lazy-load">reactLazy</Link> <br/>
				<Link to="/react-player">reactPlayer</Link> <br/>
			</div>
		);
	}
}





