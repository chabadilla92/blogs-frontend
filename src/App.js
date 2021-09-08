// Import All Our Components
import AllPosts from "./pages/AllPosts";
import SinglePost from "./pages/SinglePost";
import Form from "./pages/Form";

// Import React and hooks
import React, { useState, useEffect } from "react";

// Import components from React Router
import { Route, Switch, Link } from "react-router-dom";

function App(props) {
  ////////////////////
  // Style Objects
  ////////////////////

  const h1 = {
    textAlign: "center",
    margin: "10px",
  };

  const button = {
  backgroundColor: "navy",
  display: "block",
  margin: "auto",
  };

  ///////////////
  // State & Other Variables
  ///////////////

  // Our Api Url
  const url = "https://ca-blogs-api.herokuapp.com/blogs/";

  // State to Hold The List of Posts
  const [posts, setPosts] = useState([]);

  // an object that represents a null todo
const nullBlog = {
  subject: "",
  details: "",
};

const [targetBlog, setTargetBlog] = useState(nullBlog);

  //////////////
  // Functions
  //////////////
// Function to get list of Blogs from API
const getBlogs = async () => {
  const response = await fetch(url);
  const data = await response.json();
  setPosts(data);
};

// Function to add todo from form data
const addBlogs = async (newBlog) => {
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBlog),
  });

  // get updated list of blogs
  getBlogs();
};

// Function to select blog to edit
const getTargetBlog = (blog) => {
  setTargetBlog(blog);
  props.history.push("/edit");
};

// Function to edit blog on form submission
const updateBlog = async (blog) => {
  const response = await fetch(url + blog.id + "/", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blog),
  });

  // get updated list of blogs
  getBlogs();
};

// Function to edit todo on form submission
const deleteBlog = async (blog) => {
  const response = await fetch(url + blog.id + "/", {
    method: "delete",
  });

  // get updated list of todos
  getBlogs();
  props.history.push("/");
};

  //////////////
  // useEffects
  //////////////
  useEffect(() => {getBlogs()}, []);
  /////////////////////
  // returned JSX
  /////////////////////
  return (
    <div>
      <h1 style={h1}>My Blog</h1>
      <Link to="/new"><button style={button}>Create New Blog Post</button></Link>
      <Switch>
        <Route
          exact
          path="/"
          render={(routerProps) => <AllPosts {...routerProps} posts={posts} />}
        />
        <Route
          path="/post/:id"
          render={(routerProps) => (
          <SinglePost {...routerProps} posts={posts} edit={getTargetBlog} deleteBlog={deleteBlog}
        />
          )}
        />
        <Route
          path="/new"
          render={(routerProps) => (
          <Form
            {...routerProps}
            initialTodo={nullBlog}
            handleSubmit={addBlogs}
            buttonLabel="create blog"
          />
          )}
        />
        <Route
          path="/edit"
          render={(routerProps) => (
            <Form
              {...routerProps}
              initialTodo={targetBlog}
              handleSubmit={updateBlog}
              buttonLabel="update blog"
            />
          )}
  />
      </Switch>
    </div>
  );
}

export default App;