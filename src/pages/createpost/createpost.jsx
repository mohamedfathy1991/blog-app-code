import { useState } from "react";
import "./createpost.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  let navigate = useNavigate()
  const [title, settitle] = useState("");
  const [category, setcategory] = useState("");
  const [description, setdescription] = useState("");
  const [photo, setphoto] = useState(null);
  const [err, seterr] = useState(null);
  let userreducer = useSelector((state) => state.auth);

  async function printchange(e) {
    e.preventDefault();
    if (title.trim() === "") {
      // we use liberary react-tostfy
      settitle("no ");
      return toast.error("enter title");
    }
    if (category.trim() === "") {
      // we use liberary react-tostfy
      return toast.error("enter category");
    }
    if (!photo) {
      return toast.error("enter photo");
    }
    let formdat = {
      title: title,
      category: category,
      describtion: description,
      image: photo,
    };

    console.log(formdat);

    try {
      let { data } = await axios.post(
        "http://localhost:4000/api/posts/all",
        formdat,
        {
          headers: {
            authorization: `Bearer ` + userreducer.user.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/posts");
    } catch (err) {
      console.log("err");
      console.log(err);
      return toast.error(err.response?.data.message);
    }
  }

  return (
    <section className="create-post">
      <ToastContainer />
      <h1 className="create-post-title">create post</h1>

      <form onSubmit={printchange} className="create-post-form">
        <input
          type="text"
          placeholder="enter title"
          className="create-post-input"
          value={title}
          onChange={(e) => {
            settitle(e.target.value);
          }}
        />
        <select
          value={category}
          onChange={(e) => {
            setcategory(e.target.value);
          }}
          className="create-post-input"
        >
          <option disabled value="">
            select category
          </option>
          <option value="music">music</option>
          <option value="sport">sport</option>
          <option value="romance">romance</option>
          <option value="politics">politics</option>
        </select>
        <textarea
          placeholder="enter discreption"
          className="create-post-textarea"
          value={description}
          onChange={(e) => {
            setdescription(e.target.value);
          }}
          rows="5"
        ></textarea>
        {/*  to print file be marks the input file  is array so we use target.files[0] */}
        <input
          onChange={(e) => {
            setphoto(e.target.files[0]);
          }}
          type="file"
          name="file"
          id="file"
          className="create-post-upload"
        />
        <button type="submit" className="create-post-btn">
          Create Post
        </button>
      </form>
    </section>
  );
};

export default CreatePost;
