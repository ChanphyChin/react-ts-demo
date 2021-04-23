import { StateInterface, initialState, ActionInterface } from '../index';
import { counter } from './counter';

// 每个 reducer 只负责管理全局 state 中它负责的一部分。每个 reducer 的 state 参数都不同，分别对应它管理的那部分 state 数据
export function reducer(state: StateInterface = initialState, action: ActionInterface) {
    return {
        count: counter(state.count, action)
    }
}
