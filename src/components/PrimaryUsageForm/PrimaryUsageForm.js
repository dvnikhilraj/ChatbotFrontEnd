import React, { useState , useEffect } from 'react';
import './PrimaryUsageForm.css';
      
function PrimaryUsageForm(props) {
    const defaultState = {
        Value : '',
        IsValid : true,
        IsTouched : false,
    }
    const [milesTravelled, setMilesTravelled] = useState(defaultState);
    const [annualMileage, setAnnualMileage] = useState(defaultState);
    const [businessType, setBusinessType] = useState(defaultState);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setFormValidity();
       }, [milesTravelled,annualMileage,businessType]);

    function handleEstimatedMileageInput(e)  {
        var isvalid = e.target.value !== '';
        setAnnualMileage({
            Value : e.target.value,
            IsValid : isvalid,
            IsTouched : true
        });
        // setFormValidity();
    };

    function handleBussinessTypeInput(e)  {
        var isvalid = e.target.value !== '';
        setBusinessType({
            Value : e.target.value,
            IsValid : isvalid,
            IsTouched : true
        });
        // setFormValidity();
    };
        
    function handleMilesTravelledInput(e)  {
        var isvalid = e.target.value !== '';
        setMilesTravelled({
            Value : e.target.value,
            IsValid : isvalid,
            IsTouched : true
        });
        // setFormValidity();
    };

    function setFormValidity()
    {
        var isMilesTravelledValid = props.type == 'Commute' ? (milesTravelled.IsValid && milesTravelled.IsTouched) : true;
        var isBusinessTypeValid = props.type == 'Business' ? (businessType.IsValid && businessType.IsTouched ) : true;
        if(isMilesTravelledValid && (annualMileage.IsValid && annualMileage.IsTouched ) && isBusinessTypeValid)
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
    //    console.log(props primaryUseType
       window.event.preventDefault();
       setIsFormValid(false);
       props.enableInputHandler(true);
       let currentAccidentDetails = {
        uniqueId : props.uniqueId,   
        milesTravelled : milesTravelled.Value,
        annualMileage : annualMileage.Value,
        businessType : businessType.Value,
       };
       props.socketClient.emit('savePrimaryUseForm',{
        data:currentAccidentDetails,
        context:props.context
       });
   }

  return (
     <div id="PrimaryUsageForm">
        <form onSubmit={handleSubmit}>
        { props.type == 'Commute' && <div className="form-group">
            <label>Estimated Daily Miles Travelled</label>
            <input type='number' value={milesTravelled.Value} onChange={handleMilesTravelledInput} />
            <div>
                {!milesTravelled.IsValid && <span> Please enter your daily miles travelled </span>}
            </div>
        </div>}
        <div className="form-group">
            <label>Estimated annual mileage </label>
            <input type='number' value={annualMileage.Value} onChange={handleEstimatedMileageInput} />
            <div>
                {!annualMileage.IsValid && <span> Please enter your Estimated Annual mileage</span>}
            </div>
        </div>
        { props.type == 'Business' &&
        <div className="form-group">
            <label>Bussiness type </label>
            <textarea value={businessType.Value} onChange={handleBussinessTypeInput} />
            <div>
                {!businessType.IsValid && <span>Please enter your Business type </span>}
            </div>
        </div>
        }
        <input disabled={!isFormValid} type="submit" value="Submit" />
        </form>
    </div>
  );
}
export default PrimaryUsageForm;