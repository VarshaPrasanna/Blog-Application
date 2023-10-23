import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Feed.css";

export default function Feed({ img }) {
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const response = await axios.get(
          `https://blogapplication-l75i.onrender.com/blog/`
        );
        setAllBlogs(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getAllBlogs();
  }, []);

  // Sort the blogs based on the number of likes in descending order
  const sortedBlogs = allBlogs.slice().sort((a, b) => b.likes - a.likes);

  return (
    <>
      {sortedBlogs.map((blog, index) => (
        <div className="contenedor" key={index}>
          <div className="img"></div>

          <div className="contenido">
            <Link
              style={{ color: "inherit", textDecoration: "inherit" }}
              to={{ pathname: `/viewBlog/${blog._id}` }}
            >
              <h1>{blog.title}</h1>
              <p className="excerpt">{blog.content}</p>
              <div className="likes">
                <i className="fas fa-heart"></i> {blog.likes}
              </div>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
