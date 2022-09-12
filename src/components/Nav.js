import axios from "axios";
import "../styles/Home.css";

function Nav() {
  return (
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
  );
}

export default Nav;
