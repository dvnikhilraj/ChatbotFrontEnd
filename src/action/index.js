import * as types from '../constants/action-types';

export const sendMessage = (message) => ({
    type : types.SEND_MESSAGE,
    message,
});

export const setContext = (context) => ({
    type : types.SET_CONTEXT,
    context,
});

export const resetChat = ( current ) => ( {
    type: types.RESET_CHAT,
    current
});

export const getChatHistory = ( current ) => ( {
    type: types.GET_CHAT_HISTORY,
    current
});