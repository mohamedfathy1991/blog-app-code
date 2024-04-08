import { useEffect, useState } from "react";
import "./profile.css";
import PostList from "../../components/posts/post";
import { posts } from "../../dummyData";
import { ToastContainer, toast } from "react-toastify";
import UpdateProfile from "./updateprofile";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authAction } from "../../redux/clics/authslics";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { Userpost } from "../../context/userpostcontext";

const Profile = () => {
//  console.log((new Date().getTime())/1000)
//   console.log(parseInt('60'))
  let{userpost, setUserpost}= useContext(Userpost)
  let navigate=useNavigate()
     
  const {id}= useParams()
  let dispatch = useDispatch();
  let { userinfo } = useSelector((state) => state.auth);
  let { user } = useSelector((state) => state.auth);
  const [file, setfile] = useState(null);
  const [updateprofile, setupdateprofile] = useState(false);
 
  
   async function deletprofile(id){
    try{
      let data= await axios.delete(`http://localhost:4000/api/users/profile/delet/${id}`,
    
      {
        headers: {
          authorization: `Bearer ` + user.token,
          "Content-Type": "multipart/form-data",
        },
      }) 
      console.log(data);
      if(data.status==200){
        localStorage.removeItem('token')
        dispatch(authAction.logout())
        
        navigate('/login')
        
      }
      

    }catch(err){
      console.log(err);
      
    }
  
  ;
    
   
   }

  const form_upload_profile = async (e) => {
    
    e.preventDefault();
    if (!file) {
      toast.warning("error ocuur");
    }

    try {
     
      let data = await axios.post(
        "http://localhost:4000/api/users/profile/upload-profile-photo",
        {
          image: file,
        },
        {
          headers: {
            authorization: `Bearer ` + user.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(authAction.updatauser(data.data.user));
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
    // this is for expire of token remove token after 10min and make log out
    let  tokenExpire=setTimeout(()=>{
      localStorage.removeItem('token')
      dispatch(authAction.logout())
      
      navigate('/login')
  
    },1000*10*5)
   
   
    return ()=>{
      clearTimeout(tokenExpire)
    }


  }, []);
  console.log('params');
  

    return (
      <section className="profile">
        <ToastContainer />
        <div className="profile-header">
          <div className="profile-image-wrapper">
            <img
              alt=""
              src={
                file
                  ? URL.createObjectURL(file)
                  : (id==userinfo.id)
                  ? userinfo?.profilephoto?.url
                  : userpost?.profilephoto?.url

              }
              className="profile-image"
            />
            {
              (id==userinfo.id)?<form onSubmit={form_upload_profile}>
              <abbr title="chose profile">
                <label
                  htmlFor="file"
                  className="bi bi-camera-fill upload-profile-photo-icon"
                ></label>
              </abbr>
              <input
                onChange={(e) => {
                  setfile(e.target.files[0]);
                }}
                style={{ display: "none" }}
                type="file"
                name="file"
                id="file"
              />
              <button className="upload-photo-btn" type="sybmit">
                change photo
              </button>
            </form>:''
            }
  
            
          </div>
          <h1 className="username"> {
            (id==userinfo?.id)? userinfo?.name:userpost?.name}
            </h1>
         
          <p className="profile-bio">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae,
            rerum!
          </p>
          <div className="user-jouin">
            <strong> Date joined</strong>
            <span>{new Date( (id==userinfo.id)? userinfo?.createdAt:'').toDateString()}</span>
          </div>
          {
            id==userinfo.id?<button
            onClick={() => {
              setupdateprofile(true);
            }}
            className="update-profile-btn"
          >
            <i className="bi bi-file-person-fill"></i>
            update profile
          </button>:""
          }
          
        </div>
  
        <div className="user-post">
          <h2 className="user-title"> {posts.username}</h2>
          <PostList userid= {id} />
        </div>
  
        <button onClick={()=>deletprofile(userinfo.id)} className="delet-profile">delet profile</button>
        {updateprofile && <UpdateProfile setupdateprofile={setupdateprofile} />}
      </section>
    );

  
};

export default Profile;
