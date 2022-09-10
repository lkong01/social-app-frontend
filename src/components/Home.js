import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Home.css";
import Comment from "./Comment";

function Home() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:3000/posts/", {
      withCredentials: true,
    });
    console.log(res.data);
    setPosts(res.data);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: "http://localhost:3000/post",
      data: {
        text: newPost,
      },
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
    <div>
      <nav>
        <a href="/home">reactbook</a>
        <div className="nav-main">
          <a href="/home">Home</a>
          <button
            onClick={() =>
              axios.get("http://localhost:3000" + "/logout").then((res) => {
                console.log(res.data);
                window.location.href = "/login";
              })
            }
          >
            logout
          </button>
        </div>
      </nav>

      <div className="profile-main">
        <div className="user-info">name</div>
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
            <button type="submit">Post</button>
          </form>
          {posts.map((post) => {
            return (
              <div className="post" key={post._id}>
                {post.text}

                <button value={post._id} onClick={handlePostDelete}>
                  x
                </button>
                <Comment postId={post._id}></Comment>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
