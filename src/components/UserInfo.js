import axios from "axios";
import React, { useEffect, useState } from "react";

function UserInfo() {
  const [friends, setFriends] = useState([]);
  const [profileImg, setProfileImg] = useState();

  const fetchUser = async () => {
    const res = await axios.get(
      `http://localhost:3000/user/630fbed1269c22832d102c43/friends`,
      {
        withCredentials: true,
      }
    );
    console.log(res.data.profileImg, "img address");
    setFriends(res.data.friends);
    setProfileImg(res.data.profileImg);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="user-info">
      name
      <img src={profileImg} alt="profile img" />
      <div className="friends">
        {friends.map((friend) => {
          return (
            <div className="friend" key={friend._id}>
              {friend.username}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserInfo;
