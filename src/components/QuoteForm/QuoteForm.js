import React, { useState } from 'react';
import './QuoteForm.css';
      
function QuoteForm(props) {
    const defaultState = {
        Value : '',
        IsValid : true,
        IsTouched : false,
    }
  const [name, setName] = useState(defaultState);
  const [streetAddress, setstreetAddress] = useState(defaultState);
  const [city, setcity] = useState(defaultState);
  const [DOB, setDOB] = useState(defaultState);
  const [email, setemail] = useState(defaultState);
  const [number, setnumber] = useState(defaultState);
  const [annualIncome, setannualIncome] = useState(defaultState);
  const [isFormValid, setIsFormValid] = useState(false);
  
  const handleNameChange = (e) =>  {
    console.log("asga");
    var isvalid = e.target.value !== '';
    setName({
        Value : e.target.value,
        IsValid : isvalid,
        IsTouched : true
    });
    setFormValidity();
  };

  function handleAddressChange(e)  {
    var isvalid = e.target.value !== '';
    setstreetAddress({
        Value : e.target.value,
        IsValid : isvalid,
        IsTouched : true
    });
      setFormValidity();
  };

  function handleCityChange(e)  {
    var isvalid = e.target.value !== '';
    setcity({
        Value : e.target.value,
        IsValid : isvalid,
        IsTouched : true
    });
      setFormValidity();
  };
      
  function handleDOBChange(e)  {
    var isvalid = e.target.value !== '';
    setDOB({
        Value : e.target.value,
        IsValid : isvalid,
        IsTouched : true
    });
      setFormValidity();
  };

  function handleEmailChange(e)  {
    var isvalid = e.target.value !== '' && validateEmail(e.target.value);
    setemail({
        Value : e.target.value,
        IsValid : isvalid,
        IsTouched : true
    });
      setFormValidity();
  };

  function handleNumberChange(e)  {
    var isvalid = e.target.value !== '';
    setnumber({
        Value : e.target.value,
        IsValid : isvalid,
        IsTouched : true
    });
      setFormValidity();
  };

  function handleAnnualIncomeChanges(e)  {
    var isvalid = e.target.value !== '';
    setannualIncome({
        Value : e.target.value,
        IsValid : isvalid,
        IsTouched : true
    });
      setFormValidity();
  };

  function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

   function setFormValidity()
   {
       var isAnnualValid = props.quoteType == 'Auto'? (annualIncome.IsValid && annualIncome.IsTouched) : true;
       if((name.IsValid && name.IsTouched) && (streetAddress.IsValid && streetAddress.IsTouched) && (city.IsValid && city.IsTouched ) && (DOB.IsValid && DOB.IsTouched )&& (email.IsValid && email.IsTouched )&& (number.IsValid && number.IsTouched) && isAnnualValid)
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
       let currentUserDetails = {
           name : name.Value,
           streetAddress : streetAddress.Value,
           city : city.Value,
           dob : DOB.Value,
           email : email.Value,
           phone : number.Value,
           annualIncome : annualIncome.Value, 
           quoteType : props.quoteType,
           zip : props.zipCode,
       };
       props.socketClient.emit('SaveContactDetails',{
            data:currentUserDetails,
            context:props.context
       });
   }

  return (
     <div id="QuoteForm">
         <form onSubmit={handleSubmit}>
         <div className="form-group">
            <label> Name </label>
            <input type='text' value={name.Value} onChange={handleNameChange} />
            <div>
                {!name.IsValid && <span> Please enter a name </span>}
            </div>
        </div>
        <div className="form-group">
            <label>Street Addresss </label>
            <input type='text' value={streetAddress.Value} onChange={handleAddressChange} />
            <div>
                {!streetAddress.IsValid && <span> Please enter your Street Address </span>}
            </div>
        </div>
        <div className="form-group">
            <label>City </label>
            <input type='text' value={city.Value} onChange={handleCityChange} />
            <div>
                {!city.IsValid && <span> Please enter a City </span>}
            </div>
        </div>
        <div className="form-group">
            <label>DOB</label>
            <input type='date' value={DOB.Value} onChange={handleDOBChange} />
            <div>
                {!DOB.IsValid && <span> Please enter a DOB </span>}
            </div>
        </div>
        <div className="form-group">
            <label>Email</label>
            <input type='text' value={email.Value} onChange={handleEmailChange} />
            <div>
                {!email.IsValid && <span> Please enter a valid email </span>}
            </div>
        </div>
        <div className="form-group">
            <label>Phone Number</label>
            <input type='text' value={number.Value} onChange={handleNumberChange} />
            <div>
                {!number.IsValid && <span> Please enter a Phone Number </span>}
            </div>
        </div>
        {
            props.quoteType == 'Auto' &&
            <div className="form-group">
                <label>Annual Income </label>
                <input type='number' value={annualIncome.Value} onChange={handleAnnualIncomeChanges} />
                <div>
                    {!annualIncome.IsValid && <span> Please enter a valid Annual Income </span>}
                </div>
            </div>
        }
        <input disabled={!isFormValid} type="submit" value="Submit" />
        </form>
    </div>
  );
}
export default QuoteForm;