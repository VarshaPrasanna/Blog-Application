import React from "react";
import "./Styles.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MyBlogs from "./MyBlogs";

function Profile() {
  const [userLen, setUserLen] = useState(0);
  const [likes, setLikes] = useState(0);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [userData, setuserData] = useState([]);
  const getUserprofile = async () => {
    try {
      const data = await axios.get(
        "https://blogapplication-l75i.onrender.com/user/" + userId
      );
      console.log(data.data);
      setuserData(data.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getUserprofile();
  }, []);
  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      navigate("/");
    }
  }, {});

  return (
    <>
      <MyBlogs setUserLen={setUserLen} setLikes={setLikes} />

      <section>
        <div class="profile-card">
          <div class="image">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1983/1983457.png"
              width="100"
              height="100"
              className="mx-auto mt-3 d-inline-block align-top rounded-circle"
              alt=""
            ></img>
          </div>
          <div class="data">
            <h2>
              {userData.firstName} &nbsp;{userData.lastName}
            </h2>
            <h4>@{userData.username}</h4>
            <span>{userData.email}</span>

            <span>{userData.bio}</span>
          </div>
          <div class="row">
            <div class="info">
              <h3>Articles : &nbsp;</h3>
              <span>{userLen}</span>
            </div>
            <div class="info">
              <h3>&nbsp; &nbsp; &nbsp; &nbsp;Likes: &nbsp;</h3>
              <span>{likes}</span>
            </div>
          </div>
          <div class="buttons">
            <Link to={{ pathname: "/editProfile" }} className="btn">
              Update Profile
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
