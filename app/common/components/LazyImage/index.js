//使用第三方Lazyload 的图片懒加载
import React, {Component, PropTypes} from 'react';
import ReactLazyLoad from 'common/components/reactLazyLoad';
import styles from './style.scss';

/*
 *src: 图片url
 *placeholder: 默认图片
 *height: 默认占位高度
 *throttle: 延时加载（默认false,可以是true或者毫秒数，但是每个组件的数字必须一致）
 *offset: 在什么位置加载（默认是100）
 *onClick: 图片点击事件
 */
export default class LazyImage extends Component{

  constructor(props){
    super(props);
  }

  render(){
    const {src, placeholder, height, throttle, offset, onClick} = this.props;
    return (
      <ReactLazyLoad
        offset={offset}
        throttle={throttle}
        placeholder={placeholder}>
        <img className={styles['img-lazyload']} src={src} onClick={onClick && onClick.bind(this)}/>
      </ReactLazyLoad>
    );
  }
}
LazyImage.defaultProps = {
  placeholder: <img src={require('app/testImgs/product-placeholder.png')}/>,
  offset: 100,
  throttle: false,
};

LazyImage.propTypes = {
  src: PropTypes.string,
  placeholder: PropTypes.node,
  height: PropTypes.number,
  throttle: PropTypes.bool,
  offset: PropTypes.number,
  onClick: PropTypes.func,
};
