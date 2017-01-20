import {Component} from 'react';
import LazyImage from 'common/components/LazyImage';
import styles from './style.scss';

let dataList = [];

for(let i=100;i>0;i--){
	dataList.push('http://ww1.sinaimg.cn/mw690/62aad664jw1f2nxw0e1mlj20u01hcgvs.jpg')
}

class PlaceHolder extends Component{
	render(){
		let height = this.props.height || 300;
		return (
			<div className={styles['place-holder']} style={{height: height}}>
			</div>
		)
	}
}

export default class LazyImagePage extends Component{
	render(){
		return (
			<div className={styles['lazy-img-page-container']}>
			{
				dataList.map((item, index)=>{
					return (
						<div key={index} className={styles['img-container']}>
							<LazyImage src={item} placeholder={<PlaceHolder height={600}/>}/>
						</div>
					)
				})
			}
			</div>
		);
	}
}