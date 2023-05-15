import Logo from "../HomePage/Navbar/lgo.svg";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Login() {
  return (
    <>
      <div className="text-white">
        <div className="flex h-screen flex-col items-center justify-center">
          <img src={Logo} alt="logo" />
          <form>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
