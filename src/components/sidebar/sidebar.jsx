
import { Link } from "react-router-dom";
import "./sidebar.css"
const Sidebr = ({categories}) => {
    console.log(categories)


   
    return ( 
        <div className="side-bar">

        <h5 className="sidebar-title">Ctegoryies</h5>

        <ul className="sidebar-links">
        {categories?.map((category) =>{
            return(
            
            <Link className="link-sidebar" key={category._id} to={`/post/category/${category.title}`}>
                {category.title}
            </Link>)

        })}
            
        </ul>
          
        </div>
     
     );
}
 
export default Sidebr;