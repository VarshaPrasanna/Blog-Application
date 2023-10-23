import axios from "axios";
import React, { useEffect, useState } from "react";
import "./EditBlog.css";
import { useNavigate, useParams } from "react-router-dom";

function EditBlog(props) {
  const authorId = localStorage.getItem("userId");
  const author = localStorage.getItem("author");
  const { id } = useParams();

  const initialState = {
    title: "",
    image: "",
    content: "",
    category: "",
    authorId: authorId,
    username: author,
  };
  const [editBlog, setEditBlog] = useState(initialState);
  const [isSubmit, setisSubmit] = useState(false);
  const navigate = useNavigate();
  const [isAuthor, setIsAuthor] = useState(false); // State to track if the user is the author of the blog

  useEffect(() => {
    async function getBlogData() {
      try {
        const response = await axios.get(
          `https://blogapplication-l75i.onrender.com/blog/${id}`
        );
        setEditBlog(response.data);

        // Check if the current user is the author of the blog
        setIsAuthor(authorId === response.data.authorId);
      } catch (error) {
        console.log("error", error);
      }
    }
    getBlogData();
  }, [id]);

  async function updateBlog() {
    try {
      await axios.put(
        `https://blogapplication-l75i.onrender.com/blog/updateBlog/${id}`,
        editBlog
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
    if (isSubmit) {
      updateBlog();
      navigate(`/viewBlog/${id}`);
    }
  }, [isSubmit, navigate, id]);

  function handleChange(event) {
    setEditBlog({ ...editBlog, [event.target.name]: event.target.value });
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
            defaultValue={editBlog.title}
            onChange={handleChange}
            autoFocus={true}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            name="content"
            defaultValue={editBlog.content}
            onChange={handleChange}
          />
        </div>
        <div className="writeFormGroup">
          <select
            className="writeSelect"
            name="category"
            onChange={handleChange}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Conditionally render the "UPDATE" button if the user is the author */}
        {isAuthor && (
          <button className="writeSubmit" type="submit">
            UPDATE
          </button>
        )}

        {isAuthor && (
          <div className="edit-delete-icons">
            <i className="fas fa-edit" onClick={handleEditClick}></i>
            <i className="fas fa-trash" onClick={handleDeleteClick}></i>
          </div>
        )}
      </form>
    </div>
  );
}

export default EditBlog;
