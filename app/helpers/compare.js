import {helper} from '@ember/component/helper'

export function compare([value1, value2]){
    return value1===value2;
}

export default helper(compare);