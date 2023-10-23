import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PostBlog.css";

function PostBlog() {
  const authorId = localStorage.getItem("userId");
  const author = localStorage.getItem("author");

  const initialState = {
    title: "",
    image: "",
    content: "",
    category: "",
    authorId: authorId,
    username: author,
  };
  const [blog, setBlog] = useState(initialState);
  const navigate = useNavigate();

  const data = {
    ...blog,
    authorId: localStorage.getItem("userId"),
    username: localStorage.getItem("author"),
  };

  function handleSubmit(event) {
    event.preventDefault();
    async function postBlog() {
      try {
        console.log(data);
        await axios.post(
          "https://blogapplication-l75i.onrender.com/blog/createBlog",
          data
        );

        window.confirm("Blog Created Succesfully");
        navigate(`/`);
      } catch (error) {
        console.log(error);
      }
    }
    postBlog();
  }

  function handleChange(event) {
    setBlog({ ...blog, [event.target.name]: event.target.value });
  }

  const categories = [
    "Technology",
    "Travel",
    "Food",
    "Health",
    "Science",
    "Other",
  ];

  return (
    <div className="write">
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input id="fileInput" type="file" style={{ display: "none" }} />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            name="title"
            onChange={handleChange}
            autoFocus={true}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            name="content"
            onChange={handleChange}
          />
        </div>
        <div className="writeFormGroup">
          <select
            className="writeSelect"
            name="category"
            onChange={handleChange}
          >
            <option value="">Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <button className="writeSubmit" type="submit">
            Publish
          </button>
        </div>

        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}

export default PostBlog;
