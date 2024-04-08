import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authAction } from "../../redux/clics/authslics";

const HeaderRight = () => {
  let navigate=useNavigate()
  let [x,setx]=useState('')
  let dispatch= useDispatch()


  let {user}=useSelector((state)=>state.auth)


    return (
      <>
       <div className="header-right">
      {user?.token ?
      
      <div>
         <Link  
     
     to="/login" className="header-right-links">
     
  <i className="bi bi-box-arrow-in-right"></i>
  <span 
   onClick =
  {()=>{
    
    localStorage.removeItem('token')
    dispatch(authAction.logout())

    
}}> logout</span>
</Link>
<Link to={`/profile/${user.user.id}`}><span className="username-nav">{user.user.name}</span>
</Link>
      </div>
     
   
    
     : 
      <>
       <Link to="/register" className="header-right-links">
          <i className="bi bi-box-arrow-in-right"></i>
          <span>register</span>
        </Link>
        <Link to={"/login"} className="header-right-links">
          <i className="bi bi-person"></i>

          <span>Login</span>
        </Link>
      </>
       
      
      }
      </div>
      </>
      
     );
}
 
export default HeaderRight;