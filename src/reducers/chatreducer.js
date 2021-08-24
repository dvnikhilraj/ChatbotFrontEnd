import {
    SEND_MESSAGE,
    GET_CHAT_HISTORY,
    RESET_CHAT,
    SET_CONTEXT
} from '../constants/action-types';
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

let initialState = {
    messages: [],
    context : [],
}

const chatReducer = ( state = initialState, action ) => {
    console.log("context")
    console.log(action)
    switch ( action.type ) {
        case GET_CHAT_HISTORY:
            return state;

        case SET_CONTEXT : 
            return {
                ...state,
                context : [ ...action.context],
            }
        
        case SEND_MESSAGE:
            return {
                ...state,
                messages:[
                    ...state.messages,
                    {
                        fromClient : action.message.fromClient,
                        text : action.message.text,
                        time : action.message.time,
                        date: action.message.date,
                        isOption :action.message.isOption,
                        options : action.message.options,
                        showContactForm : action.message.showContactForm,
                        showAccidentForm : action.message.showAccidentForm,
                        IsAccidentForm : action.message.IsAccidentForm,
                        showInsuranceProviderForm : action.message.showInsuranceProviderForm,
                        showVehicleDetailsForm : action.message.showVehicleDetailsForm,
                        quoteType: action.message.quoteType,
                        showPrimaryUseForm : action.message.showPrimaryUseForm,
                        primaryUseType : action.message.primaryUseType,
                        uniqueId : action.message.uniqueId,
                        zipCode : action.message.zipCode
                    }
                ],
            };
        case RESET_CHAT:
            return initialState;

        default:
            return state;
    }
}

const persistConfig = {
    keyPrefix: "insurance-",
    key: "chathistory",
    storage
}

export default persistReducer( persistConfig, chatReducer );