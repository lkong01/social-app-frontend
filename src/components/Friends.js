import axios from "axios";
import React, { useEffect, useState } from "react";

function Friends() {
  const [friends, setFriends] = useState([]);

  const fetchFriends = async () => {
    let loggedInUser = localStorage.getItem("user");
    // console.log(loggedInUser);
    if (loggedInUser) {
      loggedInUser = JSON.parse(loggedInUser);
      console.log(loggedInUser);
    } else {
      console.log("not logged in");
      return;
    }

    const res = await axios.get(
      `http://localhost:3000/user/${loggedInUser._id}`,
      {
        withCredentials: true,
      }
    );
    console.log(res.data);
    setFriends(res.data.friends);
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <div className="friends">
      <h2>
        Friends <span>{friends ? friends.length : ""}</span>
      </h2>
      <div className="user-friends-content">
        {friends.map((friend) => {
          return (
            <div className="friend-item" key={friend._id}>
              <a href={`http://localhost:3001/user/${friend._id}`}>
                <img src={friend.profileImg} alt="profile-img" />
              </a>
              <a href={`http://localhost:3001/user/${friend._id}`}>
                {" "}
                <div className="name">
                  {friend.firstName} {friend.lastName}
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Friends;
