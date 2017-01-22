import {Component} from 'react';
import LazyLoad from 'common/components/reactLazyLoad';
import styles from './style.scss';

let dataList = [];

for(let i=100;i>0;i--){
	dataList.push('http://ww1.sinaimg.cn/mw690/62aad664jw1f2nxw0e1mlj20u01hcgvs.jpg')
}

class Placeholder extends Component {
	render(){
		  return (
		    <div className={styles['placeholder']}>
		      <div className={styles['spinner']}>
		        <div className={styles['react1']}></div>
		        <div className={styles['react2']}></div>
		        <div className={styles['react3']}></div>
		        <div className={styles['react4']}></div>
		        <div className={styles['react5']}></div>
		      </div>
		    </div>
		  );
	}
}

class Widget extends Component{
	componentDidMount(){
		console.log('Widget componentDidMount');
	}
	render(){
		return (
			<div className={styles['widget-container']}>Widget</div>
		);
	}
}

export default class LazyComponentPage extends Component{
	render(){
		return (
			<div className={styles['lazy-component-page-container']}>
			{
				dataList.map((item, index)=>{
					return (
						<LazyLoad once={true} key={index} offset={[-200, 0]}
			                        placeholder={<Placeholder />} debounce={100}>
			                <Widget />
			            </LazyLoad>
					)
				})
			}
			</div>
		);
	}
}