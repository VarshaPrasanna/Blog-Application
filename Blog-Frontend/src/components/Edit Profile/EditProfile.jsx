import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Editprofile.css";

function EditProfile(props) {
  const userId = localStorage.getItem("userId");
  const initialState = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
  };
  const [editUser, seteditUser] = useState(initialState);
  const [Valerror, setValerror] = useState({});
  const [isSubmit, setisSubmit] = useState(false);
  const navigate = useNavigate();

  useEffect(
    function () {
      async function getUserprofile() {
        try {
          const response = await axios.get(
            `https://blogapplication-l75i.onrender.com/user/${userId}`
          );
          seteditUser(response.data);
          console.log("data", response.data);
        } catch (error) {
          console.log("error", error);
        }
      }
      getUserprofile();
    },
    [props]
  );

  async function UpdateUser() {
    try {
      await axios.put(
        `https://blogapplication-l75i.onrender.com/user/${editUser._id}`,
        editUser
      );
    } catch (error) {
      console.log(error);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    setisSubmit(true);
  }
  useEffect(() => {
    console.log(Valerror);
    if (isSubmit) {
      console.log(editUser);
      UpdateUser();
      navigate(`/profile`);
    }
  });

  function handleChange(event) {
    seteditUser({ ...editUser, [event.target.name]: event.target.value });
    console.log(editUser);
  }

  function handleCancel() {
    navigate(`/profile`);
  }

  return (
    <div>
      <div className="edit gradient-custom">
        <div className="edit-wrapper">
          <div className="edit-container">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  defaultValue={editUser.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  defaultValue={editUser.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  defaultValue={editUser.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  defaultValue={editUser.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="bio"
                  className="form-control"
                  placeholder="Add bio"
                  defaultValue={editUser.bio}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" id="submit">
                Submit
              </button>
              <p id="message-ref">Signed Up Successfully</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
