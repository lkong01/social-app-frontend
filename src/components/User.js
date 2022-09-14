import { useParams } from "react-router-dom";

function User(props) {
  console.log("run?");
  const { id } = useParams();
  console.log(id);
  return <div className="user">dsf</div>;
}

export default User;
