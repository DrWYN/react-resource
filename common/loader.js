import React, {Component} from 'react';
import { connect } from 'react-redux';

import styles from './common.scss'

export default class Loader extends Component{
	render(){
		if(!this.props.isShow) return null;
		return (
			<div className={styles.commonLoader}>
				<div className={styles.loader}></div>
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