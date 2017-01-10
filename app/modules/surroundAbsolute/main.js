import {Component} from 'react';

import styles from './style.scss';

export default class surroundAbsolute extends Component{

	componentDidMount(){
		const surround = ReactDOM.findDOMNode(this.refs.surround);
	  const holder = ReactDOM.findDOMNode(this.refs.holder);
	  surround.addEventListener("scroll", function () {
		  console.log(this);
		  holder.style.height = this.scrollTop + "px";
	  })
	}

	render(){
		return (
			<div ref="surround" className={styles['surround-container']}>
				<div ref="holder" className={styles['holder']}></div>
				<div className={styles['pic']}></div>
				asdsadasdasdasouoi啊实打实大师大师的撒uiyiuyouyoiyuiouoi啊实打实大师大师的撒uiyiuyouyoiyuiouoi
	  asdsadasdasdasouoi啊实打实大师大师的撒uiyiuyouyoiyuiouoi啊实打实大师大师的撒uiyiuyouyoiyuiouoi
	  asdsadasdasdasouoi啊实打实大师大师的撒uiyiuyouyoiyuiouoi啊实打实大师大师的撒uiyiuyouyoiyuiouoi
	  asdsadasdasdasouoi啊实打实大师大师的撒uiyiuyouyoiyuiouoi啊实打实大师大师的撒uiyiuyouyoiyuiouoi
	  asdsadasdasdasouoi啊实打实大师大师的撒uiyiuyouyoiyuiouoi啊实打实大师大师的撒uiyiuyouyoiyuiouoi
	  asdsadasdasdasouoi啊实打实大师大师的撒uiyiuyouyoiyuiouoi啊实打实大师大师的撒uiyiuyouyoiyuiouoi
	  asdsadasdasdasouoi啊实打实大师大师的撒uiyiuyouyoiyuiouoi啊实打实大师大师的撒uiyiuyouyoiyuiouoi
	  asdsadasdasdasouoi啊实打实大师大师的撒uiyiuyouyoiyuiouoi啊实打实大师大师的撒uiyiuyouyoiyuiouoi
	  uiyiuyouyoiyuiouoi啊实打实大师大师的撒uiyiuyouyoiyuiouoi啊实打实大师大师的撒uiyiuyouyoiyuiouoi啊实打实大师大师的撒uiyiuyouyoiyuiouoi啊实打实大师大师的撒uiyiuyouyoiyuiouoi啊实打实大师大师的撒uiyiuyouyoiyuiouoi啊实打实大师大师的撒
	  asdsadasdasdas
			</div>
		);
	}
}