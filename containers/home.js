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
				<Link to="/showtab">showTab</Link>
			</div>
		);
	}
}





