import React, { useState , useEffect } from 'react';
import './insuranceProviderForm.css';
      
function InsuranceForm(props) {
    const defaultState = {
        Value : '',
        IsValid : true,
        IsTouched : false,
    }
    const [currentProvider, setCurrentProvider] = useState(defaultState);
    const [policyPeriod, setPolicyPeriod] = useState(defaultState);
    const [policyLimit, setPolicyLimit] = useState(defaultState);
    const [policyExpiryDate, setPolicyExpiryDate] = useState(defaultState);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setFormValidity();
       }, [currentProvider,policyPeriod,policyLimit,policyExpiryDate]);

    function handleCurrentProviderChange(e)  {
        var isvalid = e.target.value !== '';
        setCurrentProvider({
            Value : e.target.value,
            IsValid : isvalid,
            IsTouched : true
        });
        // setFormValidity();
    };
    function handleCurrentPolicyLimit(e)  {
        var isvalid = e.target.value !== '';
        setPolicyLimit({
            Value : e.target.value,
            IsValid : isvalid,
            IsTouched : true
        });
        // setFormValidity();
    };

    function handleExpiryDate(e)  {
        var isvalid = e.target.value !== '';
        setPolicyExpiryDate({
            Value : e.target.value,
            IsValid : isvalid,
            IsTouched : true
        });
        // setFormValidity();
    };
        
    function handlePolicyPeriod(e)  {
        var isvalid = e.target.value !== '';
        setPolicyPeriod({
            Value : e.target.value,
            IsValid : isvalid,
            IsTouched : true
        });
        // setFormValidity();
    };

    function setFormValidity()
    {
        if((currentProvider.IsValid && currentProvider.IsTouched) && (policyPeriod.IsValid && policyPeriod.IsTouched) && (policyLimit.IsValid && policyLimit.IsTouched ) && (policyExpiryDate.IsValid && policyExpiryDate.IsTouched ))
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
       props.enableInputHandler(true);
       setIsFormValid(false);
       let currentInsuranceData = {
            uniqueId : props.uniqueId,
            currentProvider : currentProvider.Value,
            policyPeriod : policyPeriod.Value,
            policyLimit : policyLimit.Value,
            policyExpiryDate : policyExpiryDate.Value,
       };
     props.socketClient.emit('saveCurrentInsurance',{
        data:currentInsuranceData,
        context:props.context
     });
   }

  return (
     <div id="InsuranceForm">
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label>Current Insurance Provider</label>
            <input type='text' value={currentProvider.Value} onChange={handleCurrentProviderChange} />
            <div>
                {!currentProvider.IsValid && <span> Please enter your current provider</span>}
            </div>
        </div>
          <div>  
         <div className="form-group">
         <label>Policy period</label>
            <input type='text' value={policyPeriod.Value} onChange={handlePolicyPeriod} />
            <div>
                {!policyPeriod.IsValid && <span> Please enter your policy period</span>}
            </div>
        </div>
        <div className="form-group">
            <label>Policy Limit</label>
            <input type='number' value={policyLimit.Value} onChange={handleCurrentPolicyLimit} />
            <div>
                {!policyLimit.IsValid && <span> Please enter your current policy limit </span>}
            </div>
        </div>
        </div>
        <div className="form-group">
            <label>Policy Expiry Date </label>
            <input type ="date" value={policyExpiryDate.Value} onChange={handleExpiryDate} />
            <div>
                {!policyExpiryDate.IsValid && <span> Please enter your expiry date</span>}
            </div>
        </div>
        <input disabled={!isFormValid} type="submit" value="Submit" />
        </form>
    </div>
  );
}
export default InsuranceForm;