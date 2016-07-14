/**
 * 返回最顶
 */
import styles from './style.scss';
import React, { Component } from 'react';
import { getRAF } from '../../libs/util';

export default class extends Component {
  constructor(props) {
    super(props);
    this.handleGotoTop = this.handleGotoTop.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.toggleShowChild = this.toggleShowChild.bind(this);
    this.ticking = false;
    this.state = {
      opacity: 0
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.toggleShow);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.toggleShow);
  }

  handleGotoTop() {
    let startTime;
    const startPos = window.scrollY;
    const duration = 900;
    const scroll = (timestamp) => {
      startTime = startTime || timestamp;
      const elapsed = timestamp - startTime;
      const progress = this.easeInOutCubic(elapsed, startPos, duration);
      window.scrollTo(0, progress);
      elapsed < duration && getRAF(scroll);
    };
    getRAF(scroll);
  }

  easeInOutCubic(t, b, d) {
    let time = t;
    if ((time /= d / 2) < 1) return b - b / 2 * time * time * time;
    return b - b / 2 * (( time -= 2 ) * time * time + 2);
  }

  toggleShow() {
    if (!this.ticking) {
      getRAF(this.toggleShowChild);
    }
    this.ticking = true;
  }

  toggleShowChild() {
    this.ticking = false;
    let opacity = 0;
    // TODO android机器上screen.height 计算不准
    if (window.screen.height < window.scrollY) {
      opacity = 1;
    }
    this.setState({ opacity });
  }

  render() {
    let myStyle = {
      opacity: this.state.opacity
    };
    return (
      <section style={myStyle} className={styles.zlBtt} onClick={this.handleGotoTop}>↑</section>
    );
  }
}
