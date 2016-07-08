import React, {Component} from 'react';
import { connect } from 'react-redux';

export default class Loader extends Component{
	render(){
		if(!this.props.isShow) return null;
		return (
			<div className="common-loader">
				<div className="loader"></div>
			</div>
		);
	}
}

function mapStateToProps(state) {
  const { show } = state.global.load;
  return {
    isShow: show
  };
}

export default connect(mapStateToProps)(Loader);