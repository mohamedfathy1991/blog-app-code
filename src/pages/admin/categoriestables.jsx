import AdminSidebar from "./adminsidebar";
import "./admin-tables.css";
import Swal from "sweetalert2";
import { categories } from "../../dummyData";
import { useQuery } from "@tanstack/react-query";

const CategoriesTables = () => {


  const category= useQuery({
    queryKey: ['categoryies'],
    queryFn: () =>
      fetch(`http://localhost:4000/api/category`).then((res) =>
        res.json(),
      ),
  })

  
  if (category?.isPending) return 'Loading...'
    
  if (category?.error) return 'An error has occurred: ' + category.error.message

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
    text: "You won't to delet category",
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
        <h1  className="table-title">Tables categories</h1>
        <table className="table">
          <thead>
            <tr>
              <th>count</th>
              <th>categories title</th>
              <th>action</th>
            </tr>
           
          </thead>
          <tbody>
               {category?.data.map((item ,index) => {
                return (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>
                        {item.title}
                     
                    </td>
                   
                    <td>
                      <div className="table-buttom-group">
                       
                        <button onClick={()=>{
                          SweetalertHandler()
                        }}>delet category</button>

                       
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

export default CategoriesTables;
