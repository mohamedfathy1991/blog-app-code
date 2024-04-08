 import Header from "./components/header/header";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/homepage/home";
import Login from "./pages/forms/login";
import Register from "./pages/forms/register";
import CreatePost from "./pages/createpost/createpost";
import AdminDashboard from "./pages/admin/admindashboard";
import PostsPage from "./pages/postspage/postspage";
import Footer from "./components/footer/footer";
import PostDetails from "./pages/postdetails/postdetails";
import Category from "./pages/categoryies/category";
import Profile from "./pages/profilepages/profile";
import UsersTables from "./pages/admin/usersTables";
import postTables from "./pages/admin/posttables";
import CategoriesTables from "./pages/admin/categoriestables";
import CommentTable from "./pages/admin/commenttables";
import ForgetPassword from "./pages/forms/forgetpassword";
import resetPassword from "./pages/forms/resetpassword";
import NotFound from "./pages/notfound/notfound";
import { useSelector } from "react-redux";
import Userpostcontext from "./context/userpostcontext";
import PostTables from "./pages/admin/posttables";


function App() {
  let{user}=useSelector((state)=>state.auth)
  return (
    <div>
      <Userpostcontext  >
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/login" element={user? <Navigate to='/'/> :<Login/>} />
          <Route path="/register" element={user? <Navigate to='/'/> :<Register/>} />
          <Route path="/profile/:id"  element={ user?<Profile/>:<Login/>}  />
          <Route path="/posts" element={ user?<PostsPage/>:<Login/>} />
          <Route path="/post/category/:category" Component={Category} />

          <Route path="/create-post"element={ user?<CreatePost/>:<Login/>}  />
          <Route path="/post/details/:id" Component={PostTables} />
{/*  nested route   */}
          <Route path="admin-dashboard">
            <Route index  element={ user?.user?.isAdmin?<AdminDashboard/>:<h1 style={{textAlign:"center",background:"red",height:"300px"}}> you are not admin</h1>} />

            <Route path="users-tables" Component={UsersTables} />
            <Route path="post-tables" Component={postTables} />
            <Route path="categories-tables" Component={CategoriesTables} />
            <Route path="comment-tables" Component={CommentTable} />
          </Route>
          <Route path="/forgetmypassword" Component={ForgetPassword} />
          <Route path="/resetpassword" Component={resetPassword} />
          {/* not found must be at end */}
          <Route path="*" Component={NotFound} />


        </Routes>
      </BrowserRouter>

      </Userpostcontext>
      <Footer />
    </div>
  );
}

export default App;
