import Link from "next/link";
import UserContext from "../utils/userContext";
import { useContext } from "react";
import LoginButton from "./LoginButton";

function Footer() {
  const { user, setUser} = useContext(UserContext);

  return (
    <footer>
      {user ? (
        <p className="user">Skráður inn sem {user}</p>
      ) : (
        <Link className="user" href="/register">
          Nýskrá
        </Link>
      )}
      <br />
      <LoginButton/>
    </footer>
  );
}

export default Footer;
