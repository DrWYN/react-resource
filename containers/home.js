import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/commonActions'

import {Link} from 'react-router';


class Home extends Component{
	constructor(props){
		super(props);
		this.state = {
			isShow: false
		}
	}

	handleLoaderClick(){
		console.log(this.state.isShow);
		
		this.props.dispatch(Actions.showLoad(!this.state.isShow));
		this.setState({isShow: !this.state.isShow});
	}

	render(){
		return (
			<div>
				<div>Home</div>
				<button onClick={this.handleLoaderClick.bind(this)}>loader showing: {this.state.isShow + ''}</button>
				<Link to="/self">Self</Link>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
			showLoader: bindActionCreators(Actions.showLoad, dispatch)
		}
	}

export default connect(mapDispatchToProps)(Home)



