import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Home.css";
import Comment from "./Comment";
import Like from "./Like";
import { DateTime } from "luxon";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [postImage, setPostImage] = useState();

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:3000/posts/", {
      withCredentials: true,
    });
    console.log(res.data);
    setPosts(res.data);
    setPostImage(res.data.image);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("text", newPost);
    formData.append("image", postImage);
    for (const value of formData.values()) {
      console.log(value);
    }
    axios({
      method: "post",
      url: "http://localhost:3000/post",
      data: formData,
      withCredentials: true,
    })
      .then(function (response) {
        console.log(response);
        //window.location.reload();
        fetchPosts();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handlePostChange = (e) => {
    console.log(e.target.value);
    setNewPost(e.target.value);
  };

  const handlePostDelete = (e) => {
    console.log(e.target.value);
    axios
      .delete("http://localhost:3000/post/" + String(e.target.value))
      .then(function (response) {
        console.log(response);
        fetchPosts();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // const handleEdit = (e) => {
  //   console.log(e.target);
  //   // axios
  //   //   .edit(
  //   //     "http://localhost:3000/posts/post/" + String(e.target.value) + "/delete"
  //   //   )
  //   //   .then(function (response) {
  //   //     console.log(response);
  //   //     window.location.reload();
  //   //   })
  //   //   .catch(function (error) {
  //   //     console.log(error);
  //   //   });
  // };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div className="posts">
      <form onSubmit={handlePostSubmit}>
        <textarea
          name="newPost"
          id="newPost"
          cols="30"
          rows="5"
          value={newPost}
          placeholder="What's happening?"
          onChange={handlePostChange}
          required
        />
        <input
          type="file"
          id="post-img-input"
          onChange={(e) => {
            setPostImage(e.target.files[0]);
          }}
        />
        <label htmlFor="post-img-input">Add a picture</label>
        <button type="submit">Post</button>
      </form>
      {posts.map((post) => {
        return (
          <div className="post" key={post._id}>
            post:{post.text} username: {post.author.username}
            date:{DateTime.fromISO(post.createdAt).toRelativeCalendar()}
            {post.image != "http://localhost:3000/images/" ? (
              <img src={post.image} alt="post-img" />
            ) : (
              ""
            )}
            <button value={post._id} onClick={handlePostDelete}>
              delete
            </button>
            <Comment postId={post._id}></Comment>
            <Like postId={post._id}></Like>
          </div>
        );
      })}
    </div>
  );
}

export default Posts;
