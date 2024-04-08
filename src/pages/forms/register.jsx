import { Link, useNavigate } from "react-router-dom";
import{useState} from 'react'
import {toast} from 'react-toastify'

import "./form.css";
import axios from "axios";

const Register = () => {
  
    let navigate= useNavigate()
    const [name,setusername]=useState("")
    const [confirmPassword,setconfirmPassword]=useState("")
    const [loading,setloading]=useState(false)
    const [err,seterr]=useState(null)
    const [email,setemail]=useState("")
    const [password,setuspassword]=useState("")
    async function registerFormapi(body){
      console.log(body)
      try{
        console.log('register')
        setloading(true)
        let res=await axios.post('http://localhost:4000/api/auth/register',body )
        setloading(false)
        console.log(res)
        
        if(res.status==201){
          navigate('/login')

        }


      }catch(err){
        setloading(false)
        console.log(err)
        seterr(err?.response?.data?.error)
       
      }


    }


    const formsregister=(e)=>{
        e.preventDefault()
        if(name.trim()==="") return   toast.warning("enter name")
        if(email.trim()==="") return   toast.warning("enter email")
        if(password.trim()==="") return   toast.warning("enter name")
      registerFormapi({name,email,password,confirmPassword})  
      } 
   
  return (
    <section className="form-container">
      <h1 className="form-title">create form</h1>
      
      
                {err? <div className="bg-error"><h1 className=" bg-error "> error is: {err}</h1></div>:""
   }

     
      
      
      <form className="form" onSubmit={formsregister}>
        <div className="form-group">
          <label htmlFor="userName" className="form-label">
            username
          </label>
          <input
            type="text"
            id="userName"
            className="input-form"
            placeholder="enter name"
           
            onChange={(e)=>{
                setusername(e.target.value)
            }}
            value={name}
          />
        </div>
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

        <div className="form-group">
          <label htmlFor="password" className="form-label">
          password
          </label>
          <input
            type="password"
            id="password"
            className="input-form"
            placeholder="enter password"
            value={password}
            onChange={(e)=>{
                setuspassword(e.target.value)
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
          CONFIRM password
          </label>
          <input
            type="password"
            id="confirm"
            className="input-form"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e)=>{
                setconfirmPassword(e.target.value)
            }}
          />
        </div>
        <button

         className="form-btn" type="submit">
          Register
        </button>
      </form>
      <div className="form-footer">
        already i have account <Link to={"/login"}> LOGIN</Link>
      </div>
    </section>
  );
};

export default Register;
