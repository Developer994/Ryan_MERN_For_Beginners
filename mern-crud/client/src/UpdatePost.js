import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";
import ReactQuill from "react-quill";
import { getToken } from "./helpers";
import "react-quill/dist/quill.bubble.css";

const UpdatePost = (props) => {
  //   return <div>{JSON.stringify(props)}</div>; -> this will show you a the json object with the slug.
  const [state, setState] = useState({
    title: "",
    slug: "",
    user: "",
  });

  const { title, slug, user } = state;

  const [content, setContent] = useState("");

  // rich text editor handle change
  const handleContent = (event) => {
    console.log(event);
    setContent(event);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
      .then((response) => {
        const { title, content, slug, user } = response.data;
        setState({ ...state, title, slug, user });
        setContent(content);
      })
      .catch((error) => alert("Error loading single post"));
  }, []);

  //   onchange event handler
  const handleChange = (name) => (event) => {
    // console.log("name", name, "event", event.target.value);
    setState({ ...state, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.table({ title, content, user });
    axios
      .put(
        `${process.env.REACT_APP_API}/post/${slug}`,
        {
          title,
          content,
          user,
        },
        {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        const { title, content, slug, user } = response.data;
        // empty the state
        setState({ ...state, title, content, slug, user });
        // show success alert
        alert(`Post titled ${title} is created`);
      })
      .catch((error) => {
        console.log(error.response);
        alert(error.response.data.error);
      });
  };

  const showUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Title</label>
        <input
          onChange={handleChange("title")}
          value={title}
          type="text"
          className="form-control"
          placeholder="Post Title"
          required
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Content</label>
        <ReactQuill
          onChange={handleContent}
          value={content}
          theme="bubble"
          className="pb-5 mb-3"
          placeholder="Write Something"
          style={{ border: "1px solid #666" }}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">User</label>
        <input
          onChange={handleChange("user")}
          value={user}
          type="text"
          className="form-control"
          placeholder="Your name"
          required
        />
      </div>
      <div>
        <button className="btn btn-primary">Update</button>
      </div>
    </form>
  );

  return (
    <div className="container pb-5">
      <Nav />
      <br />
      <h1>UPDATE POST</h1>
      {showUpdateForm()}
    </div>
  );
};

export default UpdatePost;
