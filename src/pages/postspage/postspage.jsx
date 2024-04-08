import { useEffect } from "react";
import Pagination from "../../components/pagination/paginations";
import PostList from "../../components/posts/post";
import Sidebr from "../../components/sidebar/sidebar";
import {posts ,categories}from "../../dummyData"
import "./postpage.css"
import { useQuery } from "@tanstack/react-query";


const PostsPage = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['category'],
        queryFn: () =>
          fetch('http://localhost:4000/api/category').then((res) =>
            res.json(),
          ),
      })
    
      if (isPending) return 'Loading...'
    
      if (error) return 'An error has occurred: ' + error.message
      console.log(data)



    // useEffect(()=>{
    //     window.scrollTo(0,0)// this is react component

    // },[])
    return ( 
        <>
         <section className="post-page">


            <PostList />
            <Sidebr categories={data}/>
            
        </section>
        <Pagination/>
        </>
       
    
        
     );
}
 
export default PostsPage;