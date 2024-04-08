import AdminSidebar from "./adminsidebar";
import "./admin-tables.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { posts } from "../../dummyData";
import { useQuery } from "@tanstack/react-query";

const PostTables = () => {
  const allpost= useQuery({
    queryKey: ['allpostuserdata'],
    queryFn: () =>
      fetch(`http://localhost:4000/api/posts/all?category=${undefined}`,{
        method:'GET',
       
      }).then((res) =>
        res.json(),
      ),
  })
  


 

  /*deleting user*/
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  const SweetalertHandler=()=>{
    
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't to delet user",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
    }
  })
  }


  

  return (
    <section className="table-container ">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1  className="table-title">Tables post</h1>
        <table className="table">
          <thead>
            <tr>
              <th>count</th>
              <th>users</th>
              <th>posts</th>
              <th>action</th>
            </tr>
           
          </thead>
          <tbody>
               {allpost?.data?.map((item ,index) => {
                return (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>
                      <div className="table-image">
                        <img
                          src={item?.user.image}
                          alt="" 
                          className="table-user-image"
                        />
                        <span className="table-username"> {item.user?.name}</span>
                      </div>
                    </td>
                    <td>{item.tittle}</td>
                    <td>
                      <div className="table-buttom-group">
                        <button>
                          <Link to={`/profile/${item.user.id}`}> view profile user</Link>
                        </button>
                        <button onClick={()=>{
                          SweetalertHandler()
                        }}>delet user</button>

                       
                      </div>
                    </td>
                  </tr>
                );
              })} 
            </tbody>
        </table>
      </div>
    </section>
  );
};

export default PostTables;
