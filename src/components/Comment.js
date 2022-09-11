import React, { useEffect, useState } from "react";
import axios from "axios";
import Like from "./Like";
import "../styles/Comment.css";

function Comment(props) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const fetchComments = async () => {
    const res = await axios.get(
      `http://localhost:3000/post/${props.postId}/comments`,
      {
        withCredentials: true,
      }
    );
    //console.log(res.data.comments);
    setComments(res.data.comments);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: `http://localhost:3000/post/${props.postId}/comment`,
      data: {
        text: newComment,
        post: props.postId,
      },
      withCredentials: true,
    })
      .then(function (response) {
        console.log(response);
        fetchComments();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleCommentChange = (e) => {
    console.log(e.target.value);
    setNewComment(e.target.value);
  };

  const handleCommentDelete = (e) => {
    console.log(e.target.value);
    axios
      .delete(
        `http://localhost:3000/post/${props.postId}/comment/` +
          String(e.target.value)
      )
      .then(function (response) {
        console.log(response);
        fetchComments();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="comments">
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          name="newComment"
          id="newComment"
          value={newComment}
          placeholder="Write a comment"
          //   required
          onChange={handleCommentChange}
        />
        <button type="submit">Comment</button>
      </form>
      {comments.map((comment) => {
        return (
          <div className="comment" key={comment._id}>
            {comment.text}
            <button value={comment._id} onClick={handleCommentDelete}>
              x
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Comment;
