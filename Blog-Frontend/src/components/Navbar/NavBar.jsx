import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"

const firstName = localStorage.getItem("userName");

function NavBar() {
  const [isLogged, setisLogged] = useState(false);

  useEffect(() => {
    checkStorage();
  }, [isLogged]);

  function checkStorage() {
    if (localStorage.getItem("userId")) {
      setisLogged(true);
    } else {
      setisLogged(false);
    }
  }

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.clear();
    setisLogged(false);
    window.location.reload();
  };

  return (
    <header>
      <nav>
      
        {!isLogged ? (
          <ul className="ulClass" id="top-menu">
                          <li>
                <Link to={{ pathname: "/" }} className="linkClass">
                  Home 
                </Link>
                </li>

            <li>
              <Link to={{ pathname: "/login" }} className="linkClass">
                Login
              </Link>
            </li>
          </ul>
        ) : (
          <div>
            <ul className="ulClass" id="top-menu">
            <li>
                <Link to={{ pathname: "/" }} className="linkClass">
                  Home 
                </Link>
                </li>
              <li>
                <Link to={{ pathname: "/postBlog" }} className="linkClass">
                  Write <i className="fas fa-pencil-alt"></i>
                </Link>

                <Link to={{ pathname: "/profile" }} className="linkClass">
                 {firstName}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-person"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                  </svg>
                </Link>
                <Link className="linkClass" onClick={logout}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}

export default NavBar;
