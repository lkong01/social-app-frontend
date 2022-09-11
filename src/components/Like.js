import React, { useEffect, useState } from "react";
import axios from "axios";

function Like(props) {
  const [like, setLike] = useState(false);
  const [likes, setLikes] = useState([]);

  const fetchLikes = async () => {
    const res = await axios.get(
      `http://localhost:3000/post/${props.postId}/likes`,
      {
        withCredentials: true,
      }
    );
    console.log(res.data);
    setLikes(res.data);
  };

  function handleLike() {
    let method = "post";
    if (likes.includes("630fbed1269c22832d102c43")) {
      method = "delete";
    }

    axios({
      method,
      url: `http://localhost:3000/post/${props.postId}/like`,
      data: {},
      withCredentials: true,
    })
      .then(function (response) {
        console.log(response);
        fetchLikes();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchLikes();
    console.log(likes);
  }, []);
  useEffect(() => {
    if (likes.includes("630fbed1269c22832d102c43")) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [likes]);

  return (
    <div className="like">
      <button onClick={handleLike}>{like ? "unlike" : "like"}</button>
      {}
    </div>
  );
}

export default Like;
