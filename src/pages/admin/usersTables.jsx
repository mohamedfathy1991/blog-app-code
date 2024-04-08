import AdminSidebar from "./adminsidebar";
import "./admin-tables.css";
import { Link, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { authAction } from "../../redux/clics/authslics";


const UsersTables = () => {
  let dispatch = useDispatch();
  
  let { user } = useSelector((state) => state.auth);

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
   
  if (alluser?.isPending) return 'Loading...'
    
  if (alluser?.error) return 'An error has occurred: ' + alluser.error.message
 if(alluser.data.message=='  error token experied'){
  dispatch(authAction.logout())

  return <Navigate  to={'/login'} />

 } 
  return (
    <section className="table-container ">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1  className="table-title">Tables Users</h1>
        <table className="table">
          <thead>
            <tr>
              <th>count</th>
              <th>users</th>
              <th>email</th>
              <th>action</th>
            </tr>
           
          </thead>
          <tbody>
               {alluser?.data.map((item,index) => {
                return (
                  <tr key={item.id}>
                    <td>{1 + index}</td>
                    <td>
                      <div className="table-image">
                        <img
                          src="/images/user-avatar.png"
                          alt=""
                          className="table-user-image"
                        />
                        <span className="table-username"> {item.name}</span>
                      </div>
                    </td>
                    <td>{item.email}</td>
                    <td>
                      <div className="table-buttom-group">
                        <button>
                          <Link to={`/profile/1`}> view profile</Link>
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

export default UsersTables;
