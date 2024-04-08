import {posts ,categories}from "../../dummyData"
import PostList from "../../components/posts/post";
import "./home.css"
import Sidebr from "../../components/sidebar/sidebar";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const HomePage = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['category'],
        queryFn: () =>
          fetch('http://localhost:4000/api/category').then((res) =>
            res.json(),
          ),
      })
    
      if (isPending) return 'Loading...'
    
      if (error) return 'An error has occurred: ' + error.message

    return ( 
       <section className="homepage">
        <div className="home-hero-header">
            <div className="home-header-layout">
                <h1 className="home-title">welcome to blg</h1>
            </div>
        </div>
        <div className="home-latest-post">Latest Post</div>
        <div className="home-container">
            <PostList posts={posts.slice(0,5)}/>
            <Sidebr categories={data}/>

        </div>
        <div className="home-sea-posts">
            <Link className="home-link-allpost" to={"/posts"}>sea all posts</Link>
        </div>
    
       </section>
     );
}
 
export default HomePage;