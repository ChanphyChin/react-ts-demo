import { createStore, applyMiddleware } from 'redux';
import { reducer } from './reducer';
import logger from 'redux-logger'
export * from './action';
export * from './action-types';

export interface StateInterface {
    [key: string]: any;
}
export interface ActionInterface {
    type: string;
    [key: string]: any;
}
export const initialState: StateInterface = {
    count: 0,
    messageData: {}
};


export const store = createStore(reducer, applyMiddleware(logger));