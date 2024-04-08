import { Link, useNavigate, useParams } from "react-router-dom";
import { posts } from "../../dummyData";
import "./postdetails.css";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Commenmt from "../../components/comments/addcomment";
import Commentlisat from "../../components/comments/commentlost";
import Swal from "sweetalert2";
import UpdatePost from "./updatepost";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import axios from "axios";


const PostDetails = () => {
  const [file, setfile] = useState(null);
  const [updatepost, setupdatepost] = useState(false);
  const [like, setlike] = useState(null);

  const uploadhandler = (e) => {
    e.preventDefault();
    if (!file) {
      return toast.warning("no image");
    } else {
      console.log(" upload");
      console.log(file);
      console.log(URL.createObjectURL(file));
    }
  };
  let { userinfo } = useSelector((state) => state.auth);
  let userreducer = useSelector((state) => state.auth);
  let navigate=useNavigate()

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  const SweetalertHandler = (id) => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          Deletepost(id).then((data)=>{
            if(data.message=='post delet'){
                   swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
            
           

            }

            navigate('/posts')

         
        
          }).catch(err=>{
            console.log(err)
          })
         
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { id } = useParams();
  const { isPending, error, data } = useQuery({
    
    queryKey: ["postdetails"],
    
    
    queryFn: () =>
      fetch(`http://localhost:4000/api/posts/post/${id}`).then((res) =>
        res.json()
      ),
      refetchInterval:5000
  });

  if (isPending)
    return (
      <div className="loading">
        <h1>Loading</h1>
      </div>
    );

  if (error) return "An error has occurred: " + error.message;



  async function likeToggle(id) {
    try {
      let { data } = await axios.put(
        `http://localhost:4000/api/posts/like/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ` + userreducer.user.token,
          },
        }
      );
      setlike(data);
        } catch (err) {
      console.log(err);
    }
   
  }
  async function Deletepost(id) {
    try {
      let { data } = await axios.delete(
        `http://localhost:4000/api/posts/delet/${id}`,
        
        {
          headers: {
            authorization: `Bearer ` + userreducer.user.token,
          },
        }
      );
       return data
        } catch (err) {
          return err
      console.log(err);
    }
   
  }
  // const { id } = useParams();

  // const post = posts.find((pos) => pos._id === parseInt(id));

  return (
    <>
      {data ? (
        <>
          <section className="postdetails">
            <ToastContainer position="top" theme="colored" />
            <div className="postdetails-image-wraper">
              {/* it very important create image object */}
              <img
                src={file ? URL.createObjectURL(file) : data.image.url}
                className="image-details"
                alt={data.title}
              />
              {userinfo?._id == data?.user?.id ? (
                <form onSubmit={uploadhandler} className="update-image-post">
                  <label htmlFor="file" className="update-post-label">
                    <i className="bi bi-image-fill"></i> select image
                  </label>
                  <input
                    onChange={(e) => {
                      setfile(e.target.files[0]);
                    }}
                    style={{ display: "none" }}
                    type="file"
                    name="file"
                    id="file"
                  />
                  <button type="submit">upload</button>
                </form>
              ) : (
                ""
              )}
            </div>

            <h1 className="post-details-title">{data.tittle}</h1>
            <div className="post-details-user-info">
              <img
                className="post-details-user-image"
                src={data.user.profilephoto.url}
                alt=""
              />

              <div className="post-details-user">
                <strong>
                  <Link to={`/profile/${data.user._id}`}>{data.user.name}</Link>
                </strong>
                <span>{data.createdAt}</span>
              </div>
            </div>

            <p className="details-post-description">
              {data.description}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
              repellendus ducimus expedita hic fuga similique odit animi quod
              quaerat nam quia dolore error recusandae accusantium, cupiditate
              iste laboriosam, corporis sed!
            </p>
            <div className="post-details-icon-wraper">
              <div>
                <i
                  onClick={() => {
                    likeToggle(data?._id);
                  }}
                  className={
                    like?
                    like?.likes.includes(userinfo?._id)
                    ? "bi bi-hand-thumbs-up-fill"
                    : "bi bi-hand-thumbs-up":
                    data.likes.includes(userinfo?._id)
                      ? "bi bi-hand-thumbs-up-fill"
                      : "bi bi-hand-thumbs-up"
                  }
                >
                  <small>{data.likes.length}</small>
                </i>
              </div>
              {userinfo?._id == data?.user?.id ? (
                <div>
                  <i
                    onClick={() => {
                      setupdatepost(true);
                    }}
                    className="bi bi-pencil-square"
                  >
                    update post
                  </i>
                  <i onClick={()=>SweetalertHandler(data._id)} className="bi bi-trash-fill">
                    delet post
                  </i>
                </div>
              ) : (
                ""
              )}
            </div>
            <Commenmt postid={data._id} />
            <Commentlisat comments={data.comments} />
            {updatepost && (
              <UpdatePost setupdatepost={setupdatepost} post={data} />
            )}
          </section>
        </>
      ) : (
        <h1>no data</h1>
      )}
    </>
  );
};

export default PostDetails;
