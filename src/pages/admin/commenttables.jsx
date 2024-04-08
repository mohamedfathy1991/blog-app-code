import AdminSidebar from "./adminsidebar";
import "./admin-tables.css";
import Swal from "sweetalert2";

const CommentTable = () => {
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
        <h1  className="table-title">Comment post</h1>
        <table className="table">
          <thead>
            <tr>
              <th>count</th>
              <th>users</th>
              <th>comments</th>
              <th>action</th>
            </tr>
           
          </thead>
          <tbody>
               {[1,2,3].map((item ,index) => {
                return (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>
                      <div className="table-image">
                        <img
                          src="/images/user-avatar.png"
                          alt="" 
                          className="table-user-image"
                        />
                        <span className="table-username"> omar fathy</span>
                      </div>
                    </td>
                    <td> it is agood comment</td>
                    <td>
                      <div className="table-buttom-group">
                      
                        <button onClick={()=>{
                          SweetalertHandler()
                        }}>delet comment</button>

                       
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

export default CommentTable;
