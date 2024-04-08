import { useParams } from "react-router-dom";
import PostList from "../../components/posts/post";
import {posts }from "../../dummyData"
import { useEffect } from "react";
import "./category.css"


const Category = () => {
      useEffect(()=>{
            window.scrollTo(0,0)

      },[])
      const {category}=useParams()
      console.log(category)
      return ( 

            <section className="category">
                  <h1 className="title">post based on{category}</h1>
                  
                  {/* <PostList posts={posts}/> */}
                  <PostList category={category}/>
      
            </section>
       );
}
 
export default Category;