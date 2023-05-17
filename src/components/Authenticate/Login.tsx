import Logo from "../HomePage/Navbar/lgo.svg";
import { useEffect, useState, useRef } from "react";
import { fetchAccount } from "./fetchAccount";
import { Authen, AuthenGuest } from "./useAuthen";
import { usePrevLocation } from "../../usePrevLocation/usePrevLocation";
import { deleteSession } from "./delete";
import {
  getCookie,
  setCookie,
  deleteCookie,
} from "../../Helper/CookieFunction";
let approved: string | null;
let request_token_response: string | null;
type account = {
  id: number;
  avatar: { gravatar: { hash: string }; tmdb: { avatar_path: string | null } };
  username: string;
  success?: boolean;
};
let firstSession = false;
let isGuest = false;
function Login() {
  const firstLogin = getCookie("session_id");
  const timer = useRef<number | null>(null);
  const [dataLogin, setDataLogin] = useState<account | null>(
    localStorage.getItem("dataLoginFirst")
      ? JSON.parse(localStorage.getItem("dataLoginFirst")!)
      : null
  );
  let timeleft: number;
  if (getCookie("expire") !== undefined) {
    const vnTime = getCookie("expire")!;
    const timeNow = new Date();
    const expirationTime = new Date(vnTime);
    timeleft = expirationTime.getTime() - timeNow.getTime();
  } else {
    timeleft = 0;
  }

  const { locationPath, setLocationPrev } = usePrevLocation();
  const [timeRemaining, setTimeRemaining] = useState(timeleft);
  const url = new URL(window.location.href);
  approved = url.searchParams.get("approved");
  request_token_response = url.searchParams.get("request_token");

  const seconds = Math.floor((timeRemaining / 1000) % 60);
  const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
  const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const handleLogin = async () => {
    await Authen();
  };
  const handleDelete = async () => {
    await deleteSession();
    setDataLogin(null);
  };
  const handleLoginGuest = async () => {
    await AuthenGuest();
  };
  useEffect(() => {
    if (getCookie("expire") !== undefined) {
      timer.current = setInterval(() => {
        const vnTime = getCookie("expire")!;
        const timeNow = new Date();
        const expirationTime = new Date(vnTime);
        setTimeRemaining(expirationTime.getTime() - timeNow.getTime());
        if (expirationTime < timeNow) {
          handleDelete();
        }
      }, 1000);
    }
    return () => {
      clearTimeout(timer.current!);
    };
  }, [timeRemaining]);
  useEffect(() => {
    if (approved === "true" && !firstSession) {
      fetch(
        `${
          import.meta.env.VITE_SITE_API_TMDB
        }/3/authentication/session/new?api_key=${
          import.meta.env.VITE_TMBD_API_KEY
        }`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
          body: JSON.stringify({ request_token: request_token_response }),
        }
      )
        .then((json) => json.json())
        .then((res) => {
          setCookie("session_id", res.session_id, { secure: true });

          fetchAccount(res.session_id).then((res) => {
            setDataLogin(res);

            localStorage.setItem("dataLoginFirst", JSON.stringify(res));
          });
        })
        .catch((e) => console.log(e));
    }
    return () => {
      firstSession = true;
    };
  }, []);
  if (
    dataLogin !== null &&
    firstLogin !== "undefined" &&
    dataLogin.success !== false
  )
    return (
      <div className="flex flex-col items-center justify-center gap-4 text-white">
        <div className="h-[80px] w-[80px] translate-x-[-15%]">
          <img src={Logo} alt="logo" className="h-full w-full" />
        </div>
        <h3 className="text-2xl font-bold">{dataLogin?.username}</h3>
        {dataLogin?.avatar.tmdb.avatar_path !== null && (
          <div>
            <img
              src={`${import.meta.env.VITE_URL_IMAGE}w500${
                dataLogin?.avatar.tmdb.avatar_path
              }`}
              alt="avatar"
            />
          </div>
        )}
        {dataLogin?.avatar.tmdb.avatar_path === null && (
          <span className=" flex h-[50px] w-[50px] items-center justify-center rounded-full bg-orange-500 text-3xl">
            {dataLogin?.username[0]}
          </span>
        )}
        <button
          type="button"
          className=" rounded-lg bg-blue-700 p-3 hover:bg-blue-700/50 lg:text-xl"
        >
          <a href={`${import.meta.env.VITE_SITE}${locationPath?.pathname}`}>
            Now you can go back
          </a>
        </button>
        <button
          className="rounded-lg bg-rose-700 p-3 hover:bg-rose-700/60 lg:text-xl"
          onClick={handleDelete}
        >
          Delete session (logout)
        </button>
        <button
          className="rounded-lg bg-amber-500 p-3 text-xl text-black hover:bg-amber-500/50"
          onClick={() => alert("It is currently fixing")}
        >
          List movies you rated
        </button>
        <div>
          Expired in
          <span className="text-xl">
            {" "}
            {days}
            {" days"} : {hours}
            {" hours"} : {minutes}
            {" minutes"} : {seconds}
            {" seconds"}
          </span>
        </div>
      </div>
    );
  else
    return (
      <>
        <div className="text-white">
          <div className="flex h-screen flex-col items-center justify-center">
            <form className="flex flex-col items-center justify-center gap-5">
              <button
                type="button"
                className="rounded-md bg-blue-500 p-2 hover:bg-blue-500/50"
                onClick={handleLogin}
              >
                Approve session
              </button>
              <span>
                Join themoviedb
                <a
                  href="https://www.themoviedb.org/signup"
                  target="_blank"
                  className="pl-3 underline hover:text-stone-500"
                >
                  (Signup)
                </a>
              </span>
            </form>
          </div>
        </div>
      </>
    );
}

export default Login;
