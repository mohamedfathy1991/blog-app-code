import PostItem from "./postitem";
import "./post.css"
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Userpost } from "../../context/userpostcontext";

const PostList = ({category,userid,setuserpost}) => {
   let{userpost, setUserpost}= useContext(Userpost)

    
let GetPostbyuserid=userid;

    
    const { isPending, error, data } = useQuery({
        queryKey: ['post'],
        queryFn: () =>
          fetch(`http://localhost:4000/api/posts/all?category=${category}`).then((res) =>
            res.json(),
          ),
      })
    
      if (isPending) return 'Loading...'
    
      if (error) return 'An error has occurred: ' + error.message
     
      let allpost
      let userPostData
      if(GetPostbyuserid){
          
          userPostData=data?.filter(item=>item?.user?.id==GetPostbyuserid)[0]?.user
          setUserpost(userPostData)
         allpost = data.filter(item=>item.user.id==GetPostbyuserid)?.map(item=>{
           
            return(<PostItem post={item} key={item._id}/>)
        })
        
      }else{
       
         allpost = data.map(item=>{
            return(<PostItem post={item} key={item._id}/>)
        })

      }

    
   
    return (  

        <div className="post-list">

         {allpost}
        
            
        </div>
    );
}
 
export default PostList;

<div className="post-list">
    postlist
</div>