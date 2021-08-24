import React, { useEffect, useRef } from 'react';
import './messages.css';
import QuoteForm from '../QuoteForm/QuoteForm';
import AccidentForm from '../AccidentForm/Accident';
import InsuranceForm from '../InsuranceProviderForm/insuranceProviderForm';
import MakeModelYearForm from '../MakeModelYearForm/MakeModelYearForm';
import PrimaryUseForm from '../PrimaryUsageForm/PrimaryUsageForm';

function Messages ( props ) {

  const bottomDiv = useRef();

  useEffect(() => {
    scrollToBottom();
    console.log("props.chatHistory");
    console.log(props.chatHistory);
   }, [props.chatHistory]);
   
  const scrollToBottom = () => {
    if(bottomDiv)
    {
      bottomDiv?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }
    return (
      <div>
        {
          props.chatHistory.map(function(currentMessage,index)
          {
           return <div key={index+1} className= { !currentMessage.fromClient ?'ChatItem ChatItem--customer' : 'ChatItem ChatItem--expert'}>
              <div className="ChatItem-meta">
                {!currentMessage.fromClient && <div className="ChatItem-avatar">
                  <img className="ChatItem-avatarImage" src={`${ process.env.PUBLIC_URL }/assets/images/robot.png`}></img>
                </div> }
              </div>
              <div className="ChatItem-chatContent">
                <div className="ChatItem-chatText">
                  {(!currentMessage.fromClient && currentMessage.showContactForm) && <QuoteForm enableInputHandler={props.enableInputHandler} zipCode={props.zip} quoteType={currentMessage.quoteType} context= {props.context} socketClient={props.socketClient}></QuoteForm>}
                  {(!currentMessage.fromClient && currentMessage.showAccidentForm) && <AccidentForm enableInputHandler={props.enableInputHandler} uniqueId={currentMessage.uniqueId} context= {props.context} accidentForm = {currentMessage.IsAccidentForm} socketClient={props.socketClient}></AccidentForm>}
                  {(!currentMessage.fromClient && currentMessage.showInsuranceProviderForm) && <InsuranceForm enableInputHandler={props.enableInputHandler} uniqueId={currentMessage.uniqueId} context= {props.context} socketClient={props.socketClient}/>}
                  {(!currentMessage.fromClient && currentMessage.showVehicleDetailsForm) && <MakeModelYearForm uniqueId={currentMessage.uniqueId} enableInputHandler={props.enableInputHandler} quoteType={currentMessage.quoteType} context= {props.context} socketClient={props.socketClient}/>}
                  {(!currentMessage.fromClient && currentMessage.showPrimaryUseForm) && <PrimaryUseForm enableInputHandler={props.enableInputHandler} uniqueId={currentMessage.uniqueId} type={currentMessage.primaryUseType} context= {props.context} socketClient={props.socketClient}/>}
                  
                  {/* If the message are options */}
                  { (!currentMessage.fromClient && currentMessage.isOption) && currentMessage.options.map((currentOption,i) => <p onClick={()=>{props.selectOptionHandler(currentOption)}} key={i+currentOption} className="Chat-options">{currentOption}</p> ) }
                  <p dangerouslySetInnerHTML={{__html: currentMessage.text}} />
                  </div>
                <div className="ChatItem-timeStamp">
                  <strong>{currentMessage.time}</strong>
                  <span className="message-time">{currentMessage.date} </span> 
                </div>
              </div>
          </div>
          })
        }
        <div ref={bottomDiv}> </div>
      </div>
    );
}
export default Messages;