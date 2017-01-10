import { Component } from 'react';

import Loader from 'common/components/loader';
import Toast from 'common/components/toast';

export default class App extends Component{
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