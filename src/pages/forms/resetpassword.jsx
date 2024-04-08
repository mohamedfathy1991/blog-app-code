import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

import "./form.css";

const Login = () => {
  const [password, setuspassword] = useState("");

  const formsregister = (e) => {
    e.preventDefault();
    if (password.trim() === "") return toast.warning("enter name");
  };

  return (
    <section className="form-container">
      <h1 className="form-title">reset password</h1>
      <form className="form" onSubmit={formsregister}>
       

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            password
          </label>
          <input
            type="password"
            id="password"
            className="input-form"
            placeholder="enter password"
            value={password}
            onChange={(e) => {
              setuspassword(e.target.value);
            }}
          />
        </div>
        <button className="form-btn" type="submit">
          reset 
        </button>
      </form>
     
    </section>
  );
};

export default Login;
