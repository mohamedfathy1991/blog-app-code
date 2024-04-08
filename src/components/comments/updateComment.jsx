import { useState } from "react";
import "./updatecomment.css";

import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
const UpdateComment = ({ commentid,commenttext,setupdatecomment }) => {
  let userreducer = useSelector((state) => state.auth);

  
  const [text, settext] = useState(commenttext);

  const formupdatecomment = async(e) => {
    e.preventDefault();
    if (text.trim() === "") {
      // we use liberary react-tostfy
      return toast.error("enter comment");
    }
    try {
      let data = await axios.put(
        `http://localhost:4000/api/comment/update/${commentid}`,
        {  text:text},

        {
          headers: {
            authorization: `Bearer ` + userreducer.user.token,
          },
        }
      );
      console.log(data)
      setupdatecomment(false)

    } catch (err) {
      console.log(err)
      setupdatecomment(false)

    }

    
  };

  return (
    <div className="update-comment">
      <ToastContainer theme="color" />
      <form onSubmit={formupdatecomment} action="" className="update-comment-form">
        <abbr title="close">
          <i
            onClick={() => setupdatecomment(false)}
            className="bi bi-x-circle-fill update-form-colse"
          ></i>
        </abbr>
        <h1 className="update-comment-title">updatecomment</h1>
        <input
          value={text}
          onChange={(e) => {
            settext(e.target.value);
          }}
          type="text"
          className="update-comment-input"
        />

        <button className="btn-update-comment" type="submit">
          submit
        </button>
      </form>
    </div>
  );
};

export default UpdateComment;
