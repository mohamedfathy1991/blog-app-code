 import{useState} from 'react'
import {toast} from 'react-toastify'

import "./form.css";

const ForgetPassword = () => {
    

   


    const [email,setemail]=useState("")


    const formsregister=(e)=>{
        e.preventDefault()
        if(email.trim()==="") return   toast.warning("enter email")
      console.log(email)   
      } 
   
  return (
    <section className="form-container">
      <h1 className="form-title">ForgetPassword</h1>
      <form className="form" onSubmit={formsregister}>
       
        <div className="form-group">
          <label htmlFor="email" className="form-label">
           email
          </label>
          <input
            type="email"
            id="email"
            className="input-form"
            placeholder="enter email"
            value={email}
            onChange={(e)=>{
                setemail(e.target.value)
            }}
          />
        </div>

     
        <button

         className="form-btn" type="submit">
          ForgetPassword
        </button>
      </form>
      <div className="form-footer">
      </div>
    </section>
  );
};



       
    

 
export default ForgetPassword;