import { Link } from "react-router-dom";
import AddCategoryForm from "./addCategoryForm";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";


const AdminMain = () => {
  let { user } = useSelector((state) => state.auth);
  const category= useQuery({
    queryKey: ['categoryies'],
    queryFn: () =>
      fetch(`http://localhost:4000/api/category`).then((res) =>
        res.json(),
      ),
  })
  /* get all post*/
  const allpost= useQuery({
    queryKey: ['allpostuser'],
    queryFn: () =>
      fetch(`http://localhost:4000/api/posts/all?category=${undefined}`,{
        method:'GET',
        headers:{
          authorization: `Bearer ` + user.token,
        }
      }).then((res) =>
        res.json(),
      ),
  })
  

  
  
  /*get all user */
  const alluser= useQuery({
    queryKey: ['allusers'],
    queryFn: () =>
      fetch(`http://localhost:4000/api/users/alluser`,{
        headers:{
          authorization: `Bearer ` + user.token,
        }
      }).then((res) =>
        res.json(),
      ),
  })

  
  if (alluser?.isPending) return 'Loading...'
    
  if (alluser?.error) return 'An error has occurred: ' + alluser.error.message


console.log(allpost)


  return (
    <div className="admin-main">
      <div className="admin-main-header">
        <div className="admin-main-card">
          <h5 className="admin-card-title">Users</h5>
          <div className="admin-card-count">{alluser?.data?.length}</div>
          <div className="admin-link-wrapper">
            <Link
              className="admin-card-link"
              to={"/admin-dashboard/users-tables"}
            >
              see all users
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-person"></i>
            </div>
          </div>
        </div>
        <div className="admin-main-card">
          <h5 className="admin-card-title">post</h5>
          <div className="admin-card-count">{allpost?.data?.length}</div>
          <div className="admin-link-wrapper">
            <Link
              className="admin-card-link"
              to={"/admin-dashboard/post-tables"}
            >
              see all post
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-file-post"></i>
            </div>
          </div>
        </div>
        <div className="admin-main-card">
          <h5 className="admin-card-title">category</h5>
          <div className="admin-card-count">{category?.data?.length}</div>
          <div className="admin-link-wrapper">
            <Link
              className="admin-card-link"
              to={"/admin-dashboard/categories-tables"}
            >
              see all category
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-tag-fill"></i>
            </div>
          </div>
        </div>
        <div className="admin-main-card">
          <h5 className="admin-card-title">comment</h5>
          <div className="admin-card-count">300</div>
          <div className="admin-link-wrapper">
            <Link
              className="admin-card-link"
              to={"/admin-dashboard/categories-tables"}
            >
              see all comment
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-chat-text"></i>
            </div>
          </div>
        </div>
      </div>
   <AddCategoryForm/>
    </div>
  );
};

export default AdminMain;
