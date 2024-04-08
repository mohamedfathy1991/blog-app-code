import { Link } from "react-router-dom";

const NavBar = ({togle,settogle}) => {
    return ( 
        <nav  style={{clipPath:togle }} className="naveBar">
        <ul className="nav-links">
          <Link to="/" onClick={()=>settogle(false)} className="nav-link">
            <i className="bi bi-house">home</i>
          </Link>
          <Link to='/posts' onClick={()=>settogle(false)} className="nav-link">
            <i className="bi bi-stickies">post</i>
          </Link>
          <Link to="/create-post" onClick={()=>settogle(false)} className="nav-link">
            <i className="bi bi-plus">Create</i>
          </Link>
          <Link to="/admin-dashboard" onClick={()=>settogle(false)} className="nav-link">
            <i className="bi bi-person-check">Admin-Dashboard</i>
          </Link>
        </ul>
      </nav>
     );
}
 
export default NavBar;