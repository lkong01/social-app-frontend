import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/UserInfo.css";

function UserInfo(props) {
  const [user, setUser] = useState({
    firstName: "",
    userProfileImg: "",
    lastName: "",
    friends: [],
  });
  const [friends, setFriends] = useState([]);
  const [profileImg, setProfileImg] = useState();

  const fetchUser = async () => {
    const res = await axios.get(`http://localhost:3000/user/${props.userId}`, {
      withCredentials: true,
    });
    console.log(res.data.profileImg, "img address", res.data);
    setUser(res.data);
    // setFriends(res.data.friends);
    // setProfileImg(res.data.profileImg);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="user-info">
      name
      {user.firstName} {user.lastName}
      <img src={user.profileImg} alt="profile-img" />
      <div className="friends">
        friends:
        {user.friends.map((friend) => {
          return (
            <div className="friend" key={friend._id}>
              {friend.firstName} {friend.lastName}
              <img src={friend.profileImg} alt="profile-img" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserInfo;
