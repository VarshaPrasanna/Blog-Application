import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [Valerror, setValerror] = useState({});
  const [error, setError] = useState("");
  const [isSubmit, setisSubmit] = useState(false);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    history.push('/');
    setValerror(validate(data));
    setisSubmit(true);

    try {
      const url = "https://blogapplication-l75i.onrender.com/auth/login";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("userId", res._id);
      localStorage.setItem("userName", res.firstName + "  " + res.lastName);
      localStorage.setItem("author", res.username);

      navigate("/");
      localStorage.setItem("role", "user");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username is required ";
    }
    if (!values.password) {
      errors.password = "Password is required ";
    }
    return errors;
  };

  return (
    <div>
      <div className="login_container">
        <div className="login_form_container">
          <div className="left">
            <form className="form_container" onSubmit={handleSubmit}>
              <h1>Login To Your Account</h1>
              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleChange}
                value={data.username}
                className="input"
              />

              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                className="input"
              />
              {Valerror.password && (
                <span className="error_msg">{Valerror.password}</span>
              )}
              {error && <div className="error_msg">{error}</div>}
              <button type="submit" className="green_btn">
                LOGIN
              </button>
            </form>
          </div>
          <div className="right">
            <h1>New Here ?</h1>
            <Link to="/signup">
              <button type="button" className="white_btn">
                SIGN UP
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
