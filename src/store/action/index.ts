import { INCREMENT, DECREMENT, MESSAGE_DATA } from '../action-types';
import { MessageDataInterface } from '../../types';

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

export function setMessageData(messageData: MessageDataInterface) {
    return {
        type: MESSAGE_DATA,
        messageData
    }
}