import React from "react";
import "./ViewBlog.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ViewBlog() {
  const author = localStorage.getItem("author");

  const [blog, setBlog] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  const getBlog = async () => {
    try {
      const data = await axios.get(
        `https://blogapplication-l75i.onrender.com/blog/${id}`
      );
      console.log("blog", data.data);
      setBlog(data.data);
      setLikeCount(data.data.likes);
    } catch (e) {
      console.log(e);
    }
  };

  const incrementLikeCount = async () => {
    try {
      await axios.put(
        `https://blogapplication-l75i.onrender.com/blog/updateBlog/${id}`,
        {
          likes: likeCount + 1,
        }
      );
      setLikeCount(likeCount + 1);
      setLiked(!liked);
    } catch (e) {
      console.log(e);
    }
  };

  const DeleteBlog = (id) => {
    if (window.confirm("Are you sure?")) {
      axios.delete(
        `https://blogapplication-l75i.onrender.com/blog/deleteBlog/${id}`
      );
      getBlog();
      navigate(`/`);
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

  const isAuthor = author === blog.username;

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img
          className="singlePostImg"
          src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        <h1 className="singlePostTitle">
          {blog.title}
          <div className="singlePostEdit">
            {isAuthor && (
              <Link
                style={{ color: "inherit", textDecoration: "inherit" }}
                to={{ pathname: `/editBlog/${blog._id}` }}
              >
                <i className="singlePostIcon far fa-edit"></i>
              </Link>
            )}
            {isAuthor && (
              <button
                className="icon-button"
                onClick={() => DeleteBlog(blog._id)}
              >
                <i className="singlePostIcon far fa-trash-alt"></i>
              </button>
            )}
            <button
              className={`icon-button ${liked ? "fill-heart" : ""}`}
              onClick={incrementLikeCount}
            >
              <i className="singlePostIcon far fa-heart"></i>
            </button>
            <span>{likeCount}</span>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span>Author: {blog.username}</span>
          <span>1 day ago</span>
        </div>
        <p className="singlePostDesc">{blog.content}</p>
      </div>
    </div>
  );
}

export default ViewBlog;
