// 公用的包含了dispatch方法的 actions

import { bindActionCreators} from 'redux';
import store from '../store';
import actions from './';

let allActions = Object.assign({}, actions);

// 如果有重复key就抛出错误
if(
    !Util.keysDupliCheck(
      allActions,
      actions,
    )
){
    throw new Error("Actions Keys Duplicated!");
}

export default bindActionCreators(allActions, store.dispatch);