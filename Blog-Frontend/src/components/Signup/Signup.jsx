import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    bio: "",
    password: "",
    confirmPass: "",
  });
  const [Valerror, setValerror] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isSubmit, setisSubmit] = useState(false);
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
    console.log(data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setValerror(validate(data));
    setisSubmit(true);
    try {
      const url = "https://blogapplication-l75i.onrender.com/auth/register";
      const { data: res } = await axios.post(url, data);
      console.log(res.message);
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
  useEffect(() => {
    console.log(Valerror);
    if (Object.keys(Valerror).length === 0 && isSubmit) {
      console.log(data);
      navigate("/login");
    }
  }, [Valerror]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    const pass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{5,}/;
    const userVal = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;
    if (!values.firstName) {
      errors.firstName = "First Name is required ";
    }
    if (!values.lastName) {
      errors.lastName = "Last Name is required ";
    }
    if (!values.username) {
      errors.username = "Username is required ";
    } else if (!userVal.test(values.username)) {
      errors.username =
        "Invalid username(Must contain one alphabet and one number)";
    }
    if (!values.email) {
      errors.email = "Email is required ";
    } else if (!regex.test(values.email)) {
      errors.email = "Not a valid email Format";
    }
    if (!values.password) {
      errors.password = "Password is required ";
    } else if (!pass.test(values.password)) {
      errors.password =
        "Password must  contain atleast 1 (uppercase,lowercase,number,special character)";
    }
    if (data.password !== data.confirmPass) {
      errors.confirmPass = "Password do not match ";
    }
    return errors;
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              LOGIN
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form onSubmit={handleSubmit} className={styles.form_container}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              pattern="[a-zA-Z]+"
              className={styles.input}
            />
            {Valerror.firstName && (
              <span className={styles.error_msg}>{Valerror.firstName}</span>
            )}
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              pattern="[a-zA-Z]+"
              className={styles.input}
            />
            {Valerror.lastName && (
              <span className={styles.error_msg}>{Valerror.lastName}</span>
            )}
            <input
              type="text"
              placeholder="Email "
              name="email"
              onChange={handleChange}
              value={data.email}
              className={styles.input}
            />
            {Valerror.email && (
              <span className={styles.error_msg}>{Valerror.email}</span>
            )}

            <input
              type="text"
              placeholder="Username "
              name="username"
              onChange={handleChange}
              value={data.username}
              className={styles.input}
            />
            {Valerror.username && (
              <span className={styles.error_msg}>{Valerror.username}</span>
            )}
            <input
              type="text"
              placeholder="Add bio "
              name="bio"
              onChange={handleChange}
              value={data.bio}
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              className={styles.input}
            />
            {Valerror.password && (
              <span className={styles.error_msg}>{Valerror.password}</span>
            )}
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPass"
              onChange={handleChange}
              Value={data.confirmPass}
              className={styles.input}
            />

            {Valerror.confirmPass && (
              <span className={styles.error_msg}>{Valerror.confirmPass}</span>
            )}
            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
