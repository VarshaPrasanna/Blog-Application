import NavBar from './components/Navbar/NavBar.jsx'
import "./styles.css"
import Login from './components/Login/Login.jsx'
import Signup from './components/Signup/Signup.jsx';
import Layout from './Layout.jsx';
import PostBlog from './components/BLOG/PostBLog/PostBlog.jsx';
import Feed from './components/Feed/Feed.jsx';
import EditProfile from './components/Edit Profile/EditProfile.jsx';
import ViewBlog from './components/BLOG/View Blog/ViewBlog.jsx';
import EditBlog from './components/Edit Blog/EditBlog.jsx';



import Profile from './components/Profile/Profile.jsx';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet
} from "react-router-dom";
import { Profiler } from 'react';
function App() {

  return (
    <>
 
 <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
          <Route exact path="/" element={<Feed />} />
          <Route exact path="/postBlog" element={<PostBlog />} />
          <Route exact path="/profile" element={<Profile />} />
          </Route>
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/editProfile" element={<EditProfile />} />
          <Route exact path="/viewBlog/:id" element={<ViewBlog />} />
          <Route exact path="/editBlog/:id" element={<EditBlog />} />
          {/* <Route  path="/editBlog/:id" element={<EditBlog />} /> */}

  
          
        </Routes>
      </BrowserRouter>
    </>
   
  )
}

export default App
