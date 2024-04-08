
import { useState } from "react";
import "./updatepost.css"
import { ToastContainer,toast } from "react-toastify";
const UpdatePost = ({setupdatepost,post}) => {

      const[title,settitle]=useState(post.title)
      const[category,setcategory]=useState(post.category)
      const[description,setdescription]=useState(post.description)

      const formupdatepost=(e)=>{
            e.preventDefault()
            if(title.trim()===""){
                  // we use liberary react-tostfy
                  return toast.error("enter title")
                }
                if(category.trim()===""){
                  // we use liberary react-tostfy
                  return toast.error("enter category")
                }
                if(description.trim()===""){
                  // we use liberary react-tostfy
                  return toast.error("enter description")
                }
                console.log({title},"",{category},"",{description})
                

      }

      return ( 

            <div className="update-post">
                  <ToastContainer theme="color" />
                  <form onClick={formupdatepost} action="" className="update-post-form">

                        <abbr title="close">
                              <i onClick={()=>setupdatepost(false)} className="bi bi-x-circle-fill update-form-colse"></i>
                        </abbr>
                        <h1 className="update-post-title">updatepost</h1>
                        <input 
                        value={title}
                        onChange={(e)=>{
                              settitle(e.target.value)
                        }} type="text"  className="update-post-input"/>
                        <select
                         value={category}
                         onChange={(e)=>{
                               setcategory(e.target.value)
                         }} className="update-post-input">
                              <option disabled value={"select"}>select categpry</option>
                              <option  value="sport">sport</option>
                              <option  value="travel">travel</option>


                        </select>
                        <textarea
                         value={description}
                         onChange={(e)=>{
                               setdescription(e.target.value)
                         }} className="update-text-area" rows={5}></textarea>
                        <button  className="btn-update-post" type="submit">submit</button>
                  </form>
            </div>
       );
}
 
export default UpdatePost;