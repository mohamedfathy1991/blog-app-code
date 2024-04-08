import { useState } from "react";
import "./addcomment.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

const Commenmt = ({ postid }) => {
  let userreducer = useSelector((state) => state.auth);

  const [text, settext] = useState("");

  const formsubmithandler = async (e) => {
    e.preventDefault();
    if (text.trim() === "") {
      return toast.error("please write any thing");
    }
    try {
      console.log(userreducer.user)
      let data = await axios.post(
        `http://localhost:4000/api/comment/addcomment`,
        { text, postid },

        {
          headers: {
            authorization: `Bearer ` + userreducer.user.token,
          },
        }
      );
      console.log(data)
      settext("");

    } catch (err) {
      console.log(err)
      settext("");

    }
  };
  return (
    <form onSubmit={formsubmithandler} className="add-comment">
      <ToastContainer theme="colored" />
      <input
        onChange={(e) => {
          settext(e.target.value);
        }}
        value={text}
        type="text"
        className="comment-input"
        placeholder="add new comment"
      />
      <button className="btn-add-comment" type="submit">
        add comment
      </button>
    </form>
  );
};

export default Commenmt;
