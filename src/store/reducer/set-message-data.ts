import { MESSAGE_DATA } from '../action-types';
import { ActionInterface } from '../index';
import { MessageDataInterface } from '../../types';

export function setMessageData(state: MessageDataInterface, action: ActionInterface) {
    switch(action.type) {
        case MESSAGE_DATA:
            return action.messageData;
        default:
            return state;
    }
}