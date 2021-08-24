import React, { useState , useEffect } from 'react';
import './Accident.css';
      
function AccidentForm(props) {
    const defaultState = {
        Value : '',
        IsValid : true,
        IsTouched : false,
    }
    const [incidentDate, setIncidentDate] = useState(defaultState);
    const [faultType, setFaultType] = useState(defaultState);
    const [prevClaimAmount, setPrevClaimAmount] = useState(defaultState);
    const [Description, setDescription] = useState(defaultState);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setFormValidity();
       }, [incidentDate,faultType,prevClaimAmount,Description]);

    const radioButtonHandler = (e) =>  {
        console.log("asga");
        console.log(e.target.value);
        var isvalid = e.target.value !== '';
        setFaultType({
            Value : e.target.value,
            IsValid : isvalid,
            IsTouched : true
        });
        // setFormValidity();
    };

    function handlePreviousClaimAmount(e)  {
        var isvalid = e.target.value !== '';
        setPrevClaimAmount({
            Value : e.target.value,
            IsValid : isvalid,
            IsTouched : true
        });
        // setFormValidity();
    };

    function handleDescriptionChange(e)  {
        var isvalid = e.target.value !== '';
        setDescription({
            Value : e.target.value,
            IsValid : isvalid,
            IsTouched : true
        });
        // setFormValidity();
    };
        
    function handleIncidentDate(e)  {
        var isvalid = e.target.value !== '';
        setIncidentDate({
            Value : e.target.value,
            IsValid : isvalid,
            IsTouched : true
        });
        // setFormValidity();
    };

    function setFormValidity()
    {
        var isFalutTypeValid = props.accidentForm ? (faultType.IsValid && faultType.IsTouched) : true;
        var isPreviousClaimAmountValid = props.accidentForm ? (prevClaimAmount.IsValid && prevClaimAmount.IsTouched ) : true;

        if((incidentDate.IsValid && incidentDate.IsTouched) && isFalutTypeValid && isPreviousClaimAmountValid && (Description.IsValid && Description.IsTouched ))
        {
            setIsFormValid(true);
        }
        else
        {
            setIsFormValid(false);
        }
    } 

   function handleSubmit()
   {
       window.event.preventDefault();
       setIsFormValid(false);
       props.enableInputHandler(true);
       let currentAccidentDetails = {
        uniqueId : props.uniqueId,
        incidentDate : incidentDate.Value,
        faultType : faultType.Value,
        prevClaimAmount : prevClaimAmount.Value,
        Description : Description.Value,
        accidentType : props.accidentForm ? "Accident" : "Violation",
       };
       props.socketClient.emit('saveAccidentDetails',{
        data:currentAccidentDetails,
        context:props.context
       });
   }

  return (
     <div id="AccidentForm">
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label>{props.accidentForm ? "Accident Date" : "Violation Date"}</label>
            <input type='date' value={incidentDate.Value} onChange={handleIncidentDate} />
            <div>
                {!incidentDate.IsValid && <span> Please enter a date </span>}
            </div>
        </div>
        {
          props.accidentForm &&
          <div>  
         <div className="form-group">
            <label> Were you at fault? </label>
            <span>Yes</span>
                <input type='radio' value="Yes" name="atFault" onChange={radioButtonHandler} />
            <span>No</span>
                <input type='radio' value="No" name="atFault" onChange={radioButtonHandler} />
            <div>
                {!faultType.IsValid && <span> Please select an option </span>}
            </div>
        </div>
        <div className="form-group">
            <label>Previous Claim amount </label>
            <input type='number' value={prevClaimAmount.Value} onChange={handlePreviousClaimAmount} />
            <div>
                {!prevClaimAmount.IsValid && <span> Please enter your previous claim amount </span>}
            </div>
        </div>
        </div>
        }
        <div className="form-group">
            <label>Description </label>
            <textarea value={Description.Value} onChange={handleDescriptionChange} />
            <div>
                {!Description.IsValid && <span> Please enter a Description </span>}
            </div>
        </div>
        <input disabled={!isFormValid} type="submit" value="Submit" />
        </form>
    </div>
  );
}
export default AccidentForm;