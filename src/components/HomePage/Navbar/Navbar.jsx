import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Logo from "./lgo.svg";
import User from "./user.svg";
import Sort from "./sort.svg";
import { Form } from "react-router-dom";
import Menu from "./menu.svg";
import { useEffect, useRef, useState } from "react";
import { useSubmit } from "react-router-dom";
import { useNavigation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import DropDownMovie from "../DropDownMovie/DropDownMovie";
import NavBarMobile from "./NavBarMobile/NavBarMobile";
export const Navbar = ({ movies, q }) => {
  const inputRef = useRef();
  const submit = useSubmit();
  const naigation = useNavigation();
  const navigate = useNavigate();
  const [movieDown, setMovieDown] = useState(false);
  const [navBar, setNavBar] = useState(false);
  const [search, setSearch] = useState(false);
  const [isMouse, setIsMouse] = useState(false);
  useEffect(() => {
    inputRef.current.value = q;
  }, [q]);

  return (
    <>
      <nav
        id="navBar"
        className=" bg relative z-50 flex h-20 w-full items-center justify-around   "
      >
        <div className="  flex h-full cursor-pointer items-center ">
          <div
            className=" aspect-square  "
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={Logo} />
          </div>
        </div>

        <div className="media_search md:w-85 flex lg:w-96">
          <Form
            id="search-form"
            className=" grow-1 flex w-full items-center  gap-5 "
            role="search"
          >
            <div
              className="  relative mx-auto duration-300 ease-in"
              onFocus={(e) => {
                if (!isMouse) {
                  e.currentTarget.style.setProperty("width", "100%");
                  setMovieDown(!movieDown);
                }
              }}
              onBlur={(e) => {
                if (!isMouse) {
                  e.currentTarget.style.setProperty("width", "50%");
                  setMovieDown(!movieDown);
                }
              }}
            >
              <input
                ref={inputRef}
                id="q"
                type="search"
                className="focus:border-primary-600 focus:shadow-te-primary placeholder:text-red-300 dark:text-red-200 
              relative w-full rounded-full
              border border-solid border-neutral-700 bg-white bg-clip-padding py-1.5 
               pl-3 pr-10 text-base 
              font-normal
              outline-none transition duration-300 
              ease-in-out focus:text-black focus:outline-none 
              dark:border-neutral-600"
                placeholder="Search"
                aria-label="Search-movie"
                aria-describedby="button-addon2"
                name="search"
                defaultValue={q}
                onChange={(e) => {
                  const isFirstSearch = q == null;
                  submit(e.currentTarget.form, {
                    replace: !isFirstSearch,
                  });
                }}
              />
              <div className=" absolute top-0  right-0 translate-y-[30%] translate-x-[-50%] cursor-pointer transition ease-in-out">
                {naigation.state == "idle" ? (
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    size="xl"
                    onClick={() => {
                      navigate(`/search/${q}`);
                    }}
                  />
                ) : (
                  <FontAwesomeIcon icon={faSpinner} spinPulse size="xl" />
                )}
              </div>
              {movieDown && (
                <ul className=" absolute top-100 w-full space-y-3  bg-gray-600">
                  <DropDownMovie
                    movies={movies}
                    q={q}
                    setIsMouse={(isMouse) => setIsMouse(isMouse)}
                    isMouse={isMouse}
                    setMovieDown={(movieDown) => setMovieDown(movieDown)}
                  />
                </ul>
              )}
            </div>
          </Form>
        </div>

        <div className="media_search  flex-0  items-center justify-center pr-8">
          <div className="relative flex items-center justify-center  gap-2">
            <div
              className=" cursor-pointer"
              onClick={() => {
                navigate("/nowplaying/search");
              }}
            >
              <img src={Sort}></img>
            </div>
            <div>
              <img src={User}></img>
            </div>
          </div>
        </div>

        <div
          className={`main_navbar  flex-initial pr-4 ${
            navBar ? `navBar_mobile` : ""
          }`}
          onClick={(e) => {
            setNavBar(!navBar);
          }}
        >
          <div className="menu_burger flex items-center justify-end">
            <div>
              <img src={Menu}></img>
            </div>
          </div>
        </div>

        <NavBarMobile
          q={q}
          setNavBar={(nav) => setNavBar(nav)}
          navBar={navBar}
          search={search}
          setSearch={setSearch}
        />
      </nav>
    </>
  );
};
