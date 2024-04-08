
import { useState } from "react";
import './updateprofile.css'
import { ToastContainer,toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../redux/clics/authslics";
const user={
      username:"omar",
      bio:"this post belong me"
}

const UpdateProfile = ({setupdateprofile}) => {
      let dispatch= useDispatch()
      let userreducer =useSelector(state=> state.auth)
      let {id} =useParams()
    let[loading,setloading]= useState('')
      const[username,setusername]=useState(userreducer.userinfo.name)
      const[bio,setbio]=useState(user.bio)
      const[password,setpassword]=useState("")

      const formupdateprofile= async(e)=>{
            e.preventDefault()
            const userupdate={
                name:  username
                  ,bio
            }
           
                if(password.trim()!==""){
                  userupdate.password=password
                }
                console.log(userupdate);
                
            try{
                  
                let {data} = await axios.put(`http://localhost:4000/api/users/profile/${id}`,userupdate,{
                        headers:{
                              authorization: `Bearer ` + userreducer.user.token,
                        }
                   }) 
                   console.log(data);
                   dispatch(authAction.updatauser(data.user))
                   dispatch(authAction.updatauser(data.user))
                   
                   setupdateprofile(false)


            } catch(err){
                  setupdateprofile(false)
                  console.log(err)
            }

      }

      return ( 

            <div className="update-post">
                  <ToastContainer theme="color" />
                  <form onSubmit={formupdateprofile}  className="update-post-form">

                        <abbr title="close">
                              <i onClick={()=>setupdateprofile(false)} className="bi bi-x-circle-fill update-form-colse"></i>
                        </abbr>
                        <h1 className="update-post-title">update profile</h1>
                        <input 
                        value={username}
                        onChange={(e)=>{
                              setusername(e.target.value)
                        }} type="text"  className="update-post-input"/>
                        
                        <p>password</p>
                        <input 
                        value={password}
                        onChange={(e)=>{
                              setpassword(e.target.value)
                        }} type="text"  className="update-post-input"/>
                        
                        <textarea
                         value={bio}
                         onChange={(e)=>{
                               setbio(e.target.value)
                         }} className="update-text-area" rows={5}></textarea>
                        <button  className="btn-update-post" type="submit">submit</button>
                  </form>
            </div>
       );
}
 
export default UpdateProfile;