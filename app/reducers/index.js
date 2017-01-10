import { combineReducers } from 'redux';

import * as common from './common.reducer';

let reducers = Object.assign(
        {},
        common,
);

// 如果有重复key就抛出错误
if(
    !Util.keysDupliCheck(
        reducers,
        common,
    )
){

    throw new Error("Reducers Keys Duplicated!");
}

const rootReducer = combineReducers(reducers);

export default rootReducer;