import React, { useState , useEffect } from 'react';
import './MakeModelYear.css';
      
function MakeModelYearForm(props) {
    const defaultState = {
        Value : '',
        IsValid : true,
        IsTouched : false,
    }
    const [makeYear, setMakeYear] = useState(defaultState);
    const [model, setModel] = useState(defaultState);
    const [cubicCapacity, setCubicCapacity] = useState(defaultState);
    const [fuelType, setFuelType] = useState(defaultState);
    const [inBuiltTheftSecurity, setInBuiltTheftSecurity] = useState(defaultState);
    const [securityDetails, setSecurityDetails] = useState(defaultState);
    const [customPartsCost, setCustomPartsCost] = useState(defaultState);
    const [recoverSystemValue, setRecoverSystemValue] = useState(defaultState);
    const [licensedValue, setLicensedValue] = useState(defaultState);
    
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setFormValidity();
       }, [makeYear,model,cubicCapacity,fuelType,inBuiltTheftSecurity,securityDetails,customPartsCost,recoverSystemValue,licensedValue]);

    const radioButtonHandler = (e) =>  {
        console.log("asga");
        console.log(e.target.value);
        var isvalid = e.target.value !== '';
        setFuelType({
            Value : e.target.value,
            IsValid : isvalid,
            IsTouched : true
        });
       
    };
    
    const recoverSystemHandler = (e) =>  {
        var isvalid = e.target.value !== '';
        console.log(e.target.value);
        console.log("e.target.value");
        setRecoverSystemValue({
            Value : e.target.value,
            IsValid : isvalid,
            IsTouched : true
        });
        // setFormValidity();
    };

    const licensedRadioButtonHandler = (e) =>  {
        var isvalid = e.target.value !== '';
        setLicensedValue({
            Value : e.target.value,
            IsValid : isvalid,
            IsTouched : true
        });
        // setFormValidity();
    };

    const theftSecurityHandler = (e) =>  {
        var isvalid = e.target.value !== '';
        setInBuiltTheftSecurity({
            Value : e.target.value,
            IsValid : isvalid,
            IsTouched : true
        });
        // setFormValidity();
    };
    
    function customPartsCostHandler(e)  {
        var isvalid = e.target.value !== '';
        setCustomPartsCost({
            Value : e.target.value,
            IsValid : isvalid,
            IsTouched : true
        });
        // setFormValidity();
    };

    function cubicCapacityHandler(e)  {
        var isvalid = e.target.value !== '';
        setCubicCapacity({
            Value : e.target.value,
            IsValid : isvalid,
            IsTouched : true
        });
        // setFormValidity();
    };

    function securityDetailsHandler(e)  {
        var isvalid = e.target.value !== '';
        setSecurityDetails({
            Value : e.target.value,
            IsValid : isvalid,
            IsTouched : true
        });
        // setFormValidity();
    };

    function handleModelInputChange(e)  {
        var isvalid = e.target.value !== '';
        setModel({
            Value : e.target.value,
            IsValid : isvalid,
            IsTouched : true
        });
        // setFormValidity();
    };
        
    function handleMakeInput(e)  {
        var isvalid = e.target.value !== '';
        setMakeYear({
            Value : e.target.value,
            IsValid : isvalid,
            IsTouched : true
        });
        // setFormValidity();
    };

    function setFormValidity()
    {
        var isFuelTypeValid = props.quoteType == 'Auto' ? (fuelType.IsValid && fuelType.IsTouched) : true;
        var isTheftSecurityValid = props.quoteType == 'Auto' ? (inBuiltTheftSecurity.IsTouched && inBuiltTheftSecurity.IsValid) : true;
        var securityDetailsValid = inBuiltTheftSecurity == 'Yes' ? (securityDetails.IsTouched && securityDetails.IsValid) : true;
        var isCubicCapacityValid = (props.quoteType == 'Auto' || props.quoteType == 'Motorbike') ?(cubicCapacity.IsValid && cubicCapacity.IsTouched ) : true;
        var isCustomPartsValid = (props.quoteType == 'Motorbike' || props.quoteType == 'OffRoad') ? (customPartsCost.IsTouched && customPartsCost.IsValid) : true;
        var isRecoverSystemValid = props.quoteType == 'Motorbike' ? (recoverSystemValue.IsTouched && recoverSystemValue.IsValid) : true;
        var isLicenseValid = props.quoteType == 'OffRoad' ? (licensedValue.IsTouched && licensedValue.IsValid) : true;
        if((makeYear.IsValid && makeYear.IsTouched) && (model.IsValid && model.IsTouched) && isCubicCapacityValid && isFuelTypeValid
        && isTheftSecurityValid
        && securityDetailsValid
        && isCustomPartsValid
        && isRecoverSystemValid
        && isLicenseValid
        )
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
        makeYear : makeYear.Value,
        model : model.Value,
        cubicCapacity : cubicCapacity.Value,
        fuelType : fuelType.Value,
        inBuiltTheftSecurity : inBuiltTheftSecurity.Value,
        securityDetails : securityDetails.Value,
        customPartsCost : customPartsCost.Value,
        recoverSystemValue : recoverSystemValue.Value,
        licensedValue : licensedValue.Value
       };
       props.socketClient.emit('saveVehicleDetails',{
        data:currentAccidentDetails,
        context:props.context
       });
   }

  return (
     <div id="MakeModelYearForm">
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label>Make Year</label>
            <input type='text' value={makeYear.Value} onChange={handleMakeInput} />
            <div>
                {!makeYear.IsValid && <span> Please enter your Vehicle Make </span>}
            </div>
        </div>
        <div className="form-group">
                <label>Model </label>
                <input type="text" value={model.Value} onChange={handleModelInputChange} />
                <div>
                    {!model.IsValid && <span>Please enter your Vehicle Model </span>}
                </div>
        </div>    
        { props.quoteType == 'Auto' && <div className="form-group">
            <label> Fuel Type </label>
            <span>Petrol</span>
                <input type='radio' value="Petrol" name="fuelType" onChange={radioButtonHandler} />
            <span>Diesel</span>
                <input type='radio' value="Diesel" name="fuelType" onChange={radioButtonHandler} />
            <span>Others</span>
                <input type='radio' value="Others" name="fuelType" onChange={radioButtonHandler} />
            <div>
                {!model.IsValid && <span> Please select an option </span>}
            </div>
        </div>
        }
        {
        (props.quoteType == 'Auto') &&
        <div className="form-group">
            <label>Do you have inbuilt theft security </label>
            <input type='radio' value="Yes" name="theftSecurity" onChange={theftSecurityHandler} />
            <span>Yes</span>
            <input type='radio' value="No" name="theftSecurity" onChange={theftSecurityHandler} />
            <span>No</span>
            <div>
                {!inBuiltTheftSecurity.IsValid && <span> Please select an option </span>}
            </div>
        </div>
        }
        {
            inBuiltTheftSecurity == 'Yes' &&
            <div className="form-group">
                <label> Provide the security Details </label>
                <input type="text" value={securityDetails.Value} onChange={securityDetailsHandler} />
                <div>
                    {!securityDetails.IsValid && <span> Please provide the security details </span>}
                </div>
            </div>
        }
       
        { (props.quoteType == 'Auto' || props.quoteType == 'Motorbike') &&
        <div className="form-group">
            <label>Cubic Capacity </label>
            <input type='number' value={cubicCapacity.Value} onChange={cubicCapacityHandler} />
            <div>
                {!cubicCapacity.IsValid && <span> Please enter your Vehicle's Cubic capacity</span>}
            </div>
        </div>
        }
        {
            (props.quoteType == 'Motorbike' || props.quoteType == 'OffRoad') &&
            <div className="form-group">
                <label> Estimated cost of Custom parts and safety gear </label>
                <input type="number" value={customPartsCost.Value} onChange={customPartsCostHandler} />
                <div>
                    {!customPartsCost.IsValid && <span> Please provide your custom parts cost </span>}
                </div>
            </div>
        }
        {
            props.quoteType == 'Motorbike' &&
            <div className="form-group">
                <label>Does the motorcycle have a recover system?</label>
                
                    <input type='radio' value="Yes" name="recoverSystem" onChange={recoverSystemHandler} />
                    <span>Yes</span>
                
                    <input type='radio' value="No" name="recoverSystem" onChange={recoverSystemHandler} />
                    <span>No</span>
                <div>
                    {!recoverSystemValue.IsValid && <span> Please select an option </span>}
                </div>
            </div>
        }
        {
             props.quoteType == 'OffRoad' &&
             <div className="form-group">
                 <label>Is it licensed or registered for public roads</label>
                 <span>Yes</span>
                     <input type='radio' value="Yes" name="licensed" onChange={licensedRadioButtonHandler} />
                 <span>No</span>
                     <input type='radio' value="No" name="licensed" onChange={licensedRadioButtonHandler} />
                 <div>
                     {!licensedValue.IsValid && <span> Please select an option </span>}
                 </div>
             </div>
        }      
        <input disabled={!isFormValid} type="submit" value="Submit" />
        </form>
    </div>
  );
}
export default MakeModelYearForm;