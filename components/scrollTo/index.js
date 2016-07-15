import React, {Component} from 'react';
import BackToTop from '../backToTop';
import styles from './style.scss';

import cityData from './data';

export default class ScrollTo extends Component{
	
	constructor(props){
		super(props);

		this.scrollToLetter = this.scrollToLetter.bind(this);
	}

	scrollToLetter(e){
		let e_innerText = e.target.innerText;
		let letters = document.querySelectorAll('article header.' + styles.letter);
		for(let i=0;i<letters.length;i++){
			if(letters[i].innerText === e_innerText){
				window.scrollTo(0, letters[i].offsetTop);
			}
		}
	}

	clickCityListItem(initial, index){
		console.log('------>>>>click city ',cityData[initial][index]);
	}

	render(){
		console.log(cityData);
		let A_Z = Object.keys(cityData).sort();

		let alphabet = A_Z.map((v, i) => {
			return <div key={i} className={'clickable ' + styles.letter} onClick={this.scrollToLetter}>{v}</div>
		});

		let showCities = A_Z.map((v, i) => {
			if(!cityData[v]) return;
			let letterCities = cityData[v].map((city, i) => {
				return (
					<aside className={"clickable " + styles.showCity} key={i} index={i} onClick={this.clickCityListItem.bind(this, v, i)}>{city.cityName}</aside>
				);
			});

			return (
				<article key={v}>
					<header className={styles.letter}>{v}</header>
					<div>
						{letterCities}
					</div>
				</article>
			);
		});

		return (
			<div className={styles.scrollToContainer}>
				<div className={styles.alphabet}>
					{alphabet}
				</div>
				<section className={styles.showCities}>
					{showCities}
				</section>
				<BackToTop/>
			</div>
		);
	}
}