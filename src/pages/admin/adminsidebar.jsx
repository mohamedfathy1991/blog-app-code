import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <Link to="/admin-dashboard" className="admin-sidebar-title">
        <i className="bi bi-columns"></i>
        dashboard
      </Link>
      <ul className="admin-dashboard-list">
        <Link className="admin-sidebar-link" to="/admin-dashboard/users-tables">
            <i className="bi bi-person"></i>users
        </Link>
        <Link className="admin-sidebar-link" to="/admin-dashboard/post-tables">
            <i className="bi bi-file-post"></i>posts
        </Link>
        <Link className="admin-sidebar-link" to="/admin-dashboard/categories-tables">
            <i className="bi bi-tag"></i>
            categories
        </Link>
        <Link className="admin-sidebar-link" to="/admin-dashboard/comment-tables">
            <i className="bi bi-chat-left-text"></i>
            comment
        </Link>
        
        
        
      </ul>
    </div>
  );
};

export default AdminSidebar;
