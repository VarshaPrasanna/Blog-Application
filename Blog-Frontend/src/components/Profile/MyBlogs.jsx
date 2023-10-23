import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Styles.css";
import { Link } from "react-router-dom";
const firstName = localStorage.getItem("userName");

function MyBlogs({ setUserLen, setLikes, props }) {
  const [userBlogs, setUserBlogs] = useState([]);
  const authorId = localStorage.getItem("userId");

  useEffect(() => {
    const getMyBlogs = async () => {
      try {
        const response = await axios.get(
          `https://blogapplication-l75i.onrender.com/blog/myBlogs/${authorId}/`
        );
        setUserBlogs(response.data.myBlogs);
        setUserLen(response.data.myBlogs.length);

        const totalLikes = response.data.myBlogs.reduce(
          (total, blog) => total + blog.likes,
          0
        );
        setLikes(totalLikes);
      } catch (error) {
        console.error(error);
      }
    };

    getMyBlogs();
  }, [authorId]);

  return (
    <div className="containerPost">
      <div className="cardabc">
        {userBlogs.length < 1 ? (
          // Display this message when there are no blogs
          <div className="no-blogs-message">
            <p>
              You haven't created any blogs yet.{" "}
              <Link to="/postBlog">Create your first blog</Link>
            </p>
          </div>
        ) : (
          // Display the blog cards when there are blogs available
          userBlogs.map((blog, index) => (
            <Link
              style={{ color: "inherit", textDecoration: "inherit" }}
              to={{ pathname: `/viewBlog/${blog._id}` }}
              key={index}
            >
              <div className="cardabc">
                <div className="img-container"></div>
                <div className="card-content">
                  <h1>{blog.title}</h1>
                  <p className="excerpt">{blog.content}</p>
                  <p className="author">{firstName}</p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default MyBlogs;
