

import { Link } from "react-router-dom";
import{useState} from 'react'

import "./form.css";
import { useDispatch, useSelector } from "react-redux";
import { loginuser } from "../../redux/apicalls/authapicall";
import { gituserapi } from "../../redux/clics/authslics";
import { ToastContainer, toast } from "react-toastify";


const Login = () => {
    

  const dispatch= useDispatch()

   
  let error =useSelector(state=> state.auth)

    const [email,setemail]=useState("")
    const [password,setuspassword]=useState("")


    const formsregister=(e)=>{
        e.preventDefault()
        if(email.trim()==="") return   toast.warning("enter email")
        if(password.trim()==="") return   toast.warning("enter password")
      
         dispatch(gituserapi({email:email,password:password}))
         setemail('')
         setuspassword('')


          
        
         



      } 
     
   
  return (
    <section className="form-container">
      {error?.error?   <h1>{error.error}</h1>:""
}

      <h1 className="form-title">login</h1>
      <form className="form" onSubmit={formsregister}>
       
        <div className="form-group">
          <label htmlFor="email" className="form-label">
           email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="input-form"
            placeholder="enter email"
            value={email}
            onChange={(e)=>{
                setemail(e.target.value)
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
          password
          </label>
          <input
            type="password"
            id="password"
            className="input-form"
            placeholder="enter password"
            name="password"
            value={password}
            onChange={(e)=>{
                setuspassword(e.target.value)
            }}
          />
        </div>
        <button

         className="form-btn" type="submit">
          login
        </button>
      </form>
      <div className="form-footer">
        did uforget password <Link to={"/forgetmypassword"}> forget my password</Link>
      </div>
    </section>
  );
};



       
    

 
export default Login;