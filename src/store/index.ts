import { createStore } from 'redux';
import { reducer } from './reducer';
export * from './action';
export * from './action-types';

export interface StateInterface {
    count: number;
}
export interface ActionInterface {
    type: string;
    [key: string]: any;
}
export const initialState: StateInterface = {
    count: 0
};


export const store = createStore(reducer);