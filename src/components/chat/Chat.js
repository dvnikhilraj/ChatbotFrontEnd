import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Messages from '../messages/Messages';
import { sendMessage ,resetChat, setContext } from '../../action/index'
import store from '../../store/index'
import socketClient from "socket.io-client";
import './chat.css';

const SERVER = "http://127.0.0.1:3002";

function Chat ( props ) {
    const [socket, setSocket] = useState({});
    const[disableInput, setDisableInput] = useState(false);
    const [currentInput, setCurrentInput ] = useState("");
    useEffect(() => {
       configureSocket();
      }, []);

    const sendText = (event) =>{
        if(currentInput.trim() !== '')
        {
            setCurrentInput(event.target.value);
            var currentDate = new Date();
            store.dispatch(sendMessage( 
                { 
                    fromClient : true, 
                    text : currentInput , 
                    time : currentDate.toLocaleTimeString() , 
                    date : currentDate.toDateString(),
                    options : null
                 }
            ));
            // socket.emit('sendMessageToServer', { fromClient : false, text : event.target.value });
            socket.emit('sendMessageToServer',  { text : currentInput,context : props.context, }, ack => {
            });
        }
        setCurrentInput('');
    }

    const handleChange = (event) => {
        setCurrentInput(event.target.value);
      }
    
    const configureSocket = () => {
        var socket = socketClient(SERVER);
        socket.on('responseFromServer', data => {
            if(data != null)
            {
                var currentDate = new Date();
                store.dispatch(sendMessage( 
                    { 
                        fromClient : false, 
                        text : data.text, 
                        time : currentDate.toLocaleTimeString() , 
                        date : currentDate.toDateString(),
                        isOption : false,
                        options : null,
                    }
                ));
                console.log(data.context);
                console.log("data.context");
                if(data.context != null)
                {
                    store.dispatch(setContext(data.context));
                }
            }
        });

        socket.on('displayOptions', options => {
            if(options !== null)
            {
                var currentDate = new Date();
                store.dispatch(sendMessage( 
                    { 
                        fromClient : false, 
                        options : options, 
                        time : currentDate.toLocaleTimeString() , 
                        date : currentDate.toDateString(),
                        isOption : true,
                    }
                ));
            }
            setDisableInput(true);
        });

        socket.on('showContactForm', data => {
            store.dispatch(sendMessage( 
                { 
                    showContactForm : true,
                    quoteType : data.quoteType,
                    zipCode : data.zip,
                }
            ));
            setDisableInput(true);
        });

        socket.on('showPrimaryUseForm',data => {
            store.dispatch(sendMessage( 
                { 
                    showPrimaryUseForm : true,
                    primaryUseType : data.primaryUseType,
                    uniqueId : data.uniqueId,
                }
            ));
            setDisableInput(true);
        });

        socket.on('showInsuranceProviderForm', data => {
            store.dispatch(sendMessage( 
                { 
                    showInsuranceProviderForm : true,
                    uniqueId : data,
                }
            ));
            setDisableInput(true);
        });
        
        socket.on('triggerCurrentPolicyEvent',options => {
            // store.dispatch(sendMessage( 
            //     { 
            //         showVehicleDetailsForm : true,
            //         quoteType : options,
            //     }
            // ));
            // setDisableInput(true);
            socket.emit('saveAccidentDetails',{
                // data:currentAccidentDetails,
                context:props.context
               });
        });
        socket.on('showVehicleDetailsForm',data => {
            store.dispatch(sendMessage( 
                { 
                    showVehicleDetailsForm : true,
                    quoteType : data.QuoteType,
                    uniqueId : data.uniqueId,
                }
            ));
            setDisableInput(true);
        });
        socket.on('showAccidentForm', data => {
            store.dispatch(sendMessage( 
                { 
                    showAccidentForm : true,
                    IsAccidentForm : data.IsAccidentForm,
                    showInsuranceProviderForm : false,
                    uniqueId : data.uniqueId

                }
            ));
            setDisableInput(true);
        });
        setSocket(socket);
    }

    const clearChat = () => {
        store.dispatch(resetChat());
        setDisableInput(false);
    }

    const enableInput = (isEnabled) =>
    {
        setDisableInput(!isEnabled);
    }

    const sendSelectedText = (selectedOption) => 
    {
        setDisableInput(false);
        var currentDate = new Date();
        store.dispatch(sendMessage( 
            { 
                fromClient : true, 
                text : selectedOption , 
                time : currentDate.toLocaleTimeString() , 
                date : currentDate.toDateString(),
                options : null
             }
        ));
        console.log("props.context");
        console.log(props);
        socket.emit('sendMessageToServer',  { 
            text : selectedOption,
            context : props.context,
        });
    }
    return (
        <div className ="ChatWindow">
            <Messages enableInputHandler={enableInput} context= {props.context} socketClient={socket} selectOptionHandler={sendSelectedText} chatHistory = {props.messages}/>
            <div className="ChatInput is-hidey">
                 <input 
                    id="ChatbotInput"
                    type="text" 
                    disabled = {disableInput}
                    value={currentInput}
                    className="ChatInput-input" 
                    placeholder="Type your message here..."
                    onChange={event => handleChange(event)}
                    onKeyPress={event => {
                        if (event.key === "Enter") {
                        sendText(event);
                        }
                    }}>
                    </input>
                    <div className ="resetIcon">
                        <button title="Clear Chat"  onClick= {clearChat}> 
                            <span> <i className="fas fa-sync-alt"></i> </span>
                        </button>
                        <button disabled = {disableInput} title="Send" onClick= {sendText}> 
                            <span> <i className="fas fa-paper-plane"></i></span>
                        </button>
                    </div>
            </div>
        </div>
    )
}

const mapStateToProps = ( state, props ) => {
    return {
        messages : state.messages ? state.messages : [],
        context : state.context ? state.context : [],
    }
}

export default connect( mapStateToProps ,{ sendMessage } )( Chat );
