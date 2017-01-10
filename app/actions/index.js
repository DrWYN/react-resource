import * as common from './common.action';

let actions = Object.assign(
        {},
        common,
);


// 如果有重复key就抛出错误
if(
    !Util.keysDupliCheck(
        actions,
        common,
    )
){
    throw new Error("Actions Keys Duplicated!");
}

export default actions;
