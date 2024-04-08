import AdminMain from "./adminMain";
import AdminSidebar from "./adminsidebar";
import "./admin.css"

const AdminDashboard = () => {
    return (  
        <section className="admin-dashboard">

            <AdminSidebar/>
            <AdminMain/>
          


        </section>
    );
}
 
export default AdminDashboard;