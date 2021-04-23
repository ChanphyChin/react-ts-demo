import { INCREMENT, DECREMENT } from '../action-types';

export function addCounter(step: number) {
    return {
        type: INCREMENT,
        step
    }
}

export function minusCounter(step: number) {
    return {
        type: DECREMENT,
        step
    }
}