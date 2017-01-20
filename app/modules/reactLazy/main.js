import React, {Component} from 'react';


import {Link} from 'react-router';


export default class Home extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div>
				<Link to="/lazy-img">lazy-img</Link>	<br/>
				<Link to="/lazy-component">lazy-component</Link> <br/>
			</div>
		);
	}
}





