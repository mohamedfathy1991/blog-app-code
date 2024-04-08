
import Swal from "sweetalert2";
import UpdateComment from "./updateComment";
import { useState } from "react";
import { useSelector } from "react-redux";
import Moment from "react-moment";
import Commenmt from "./addcomment";

const Commentlisat = ({comments}) => {
      let {userinfo} =useSelector(state=> state.auth)

      const[updatecomment,setupdatecommnet]=useState(false)
      const[commenttext,setupdatecommenttext]=useState(null)
      const[commentid,setcommentid]=useState(null)
      return ( 
            <div className="comment-list">
                  <h4 className="comment-count">{comments.length}comment</h4>
                  
                 { comments?.map((comment)=>{
                  return(
                  <div  key={comment._id} className="comment-item">
                        <div className="comment-item-info">
                              <div className="comment-username">{comment.username}</div>
                              <div className="comment-time">
                              <Moment fromNow>{comment.updatedAt?comment.updatedAt:comment.createdAt}</Moment>
                              </div>
                        </div>
                        <p className="comment-details">
                              {comment.text}
                        </p>
                        {userinfo?._id== comment?.user?
                        <div className="comment-icon-wrapper">
                        <i onClick={()=>
                        {
                              setupdatecommnet(true)
                              setcommentid(comment._id)
                              setupdatecommenttext(comment.text)

                        }
                              } className="bi bi-pencil-square "></i>
                        <i onClick={()=>{
                          Swal.fire({
                               title: 'هل تريد الحذف؟',
                               icon: 'question',
                               iconHtml: '؟',
                               confirmButtonText: 'نعم',
                               cancelButtonText: 'لا',
                               showCancelButton: true,
                               showCloseButton: true
                             })
 
                        }
                        
                        } className="bi bi-trash-fill ">delet</i>
                         
                         </div>
                        :''}

                        
                        
                  </div>)

                  })}
         {updatecomment &&  <  UpdateComment commenttext={commenttext} commentid={commentid} setupdatecomment={setupdatecommnet}/>}


            </div>
       );
}
 
export default Commentlisat;