import { INCREMENT, DECREMENT } from '../action-types';
import { ActionInterface } from '../index';

export function counter(state: number = 0, action: ActionInterface) {
    switch(action.type) {
        case INCREMENT:
            return state + action.step;
        case DECREMENT:
            return state - action.step;
        default:
            return state;
    }
}