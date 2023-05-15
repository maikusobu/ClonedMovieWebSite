import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Logo from "./lgo.svg";
import User from "./user.svg";
import Sort from "./sort.svg";
import Tool from "./Setting.svg";
import { Form } from "react-router-dom";
import Menu from "./menu.svg";
import { useEffect, useRef, useState } from "react";
import { useSubmit } from "react-router-dom";
import { useNavigation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useInView } from "react-intersection-observer";
import DropDownMovie from "../DropDownMovie/DropDownMovie";
import NavBarMobile from "./NavBarMobile/NavBarMobile";
import { MovieType } from "../../../Type/MovieType";
import { useLocation } from "react-router-dom";
import { usePrevLocation } from "../../../usePrevLocation/usePrevLocation";
let approved: string | null;
let request_token_response: string | null;
type NavbarProps = {
  movies: MovieType[];
  q: string;
};
let lastScrollTop = 0;
let fixedNav = false;

export const Navbar = ({ movies, q }: NavbarProps): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null!);
  const refDiv = useRef<HTMLDivElement>(null!);
  const inputFixRef = useRef<HTMLInputElement>(null!);
  const settingRef = useRef<HTMLDivElement>(null!);
  const submit = useSubmit();
  const naigation = useNavigation();
  const navigate = useNavigate();
  const [movieDown, setMovieDown] = useState(false);
  const [navBar, setNavBar] = useState(false);
  const [search, setSearch] = useState(false);
  const [isMouse, setIsMouse] = useState(false);
  const [scrollNavBar, setScrollNavBar] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  let location = useLocation();
  let isFetch = false;
  const { locationPath, setLocationPrev } = usePrevLocation();
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY !== 0) {
        if (window.scrollY > lastScrollTop) {
          setScrollNavBar(true);
        } else {
          setScrollNavBar(false);
        }
      }

      lastScrollTop = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    const url = new URL(window.location.href);
    approved = url.searchParams.get("approved");
    request_token_response = url.searchParams.get("request_token");

    if (approved === "true" && !isFetch) {
      isFetch = true;
      fetch(
        `https://api.themoviedb.org/3/authentication/session/new?api_key=${
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
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
    }
    return () => {
      isFetch = true;
    };
  }, []);
  useEffect(() => {
    setLocationPrev(location);
  }, [location]);
  useEffect(() => {
    inputRef.current.value = q;
    if (inputFixRef.current) {
      inputFixRef.current.value = q;
    }
  }, [q]);

  return (
    <>
      <nav
        ref={ref}
        id="navBar"
        className=" relative z-50 flex  w-full items-center justify-around  "
      >
        <>
          <div className=" flex h-auto cursor-pointer items-center ">
            <div
              className=" aspect-square "
              onClick={() => {
                navigate("/");
              }}
            >
              <img src={Logo} width={50} height={50} alt="logo" />
            </div>
          </div>

          <div className="media_search md:w-85 flex lg:w-96 ">
            <Form
              id="search-form"
              className=" grow-1 flex w-full items-center gap-5 "
              role="search"
            >
              <div
                className="  relative mx-auto flex w-1/2 justify-center duration-300 ease-in"
                ref={refDiv}
              >
                <input
                  ref={inputRef}
                  id="q"
                  type="search"
                  onFocus={() => {
                    if (!isMouse) {
                      refDiv.current.style.setProperty("width", "100%");
                      setMovieDown(!movieDown);
                      setIsTyping(true);
                    }
                  }}
                  onBlur={() => {
                    if (!isMouse) {
                      refDiv.current.style.setProperty("width", "50%");
                      setMovieDown(!movieDown);
                      setIsMouse(false);
                    }
                  }}
                  className="focus:border-primary-600   focus:shadow-te-primary placeholder:text-red-300 dark:text-red-200 
              relative w-full rounded-full
              border border-solid border-neutral-700 bg-white bg-clip-padding py-1.5 
               pl-3 pr-10 text-base 
              font-normal
             
              outline-none transition-all duration-300 
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
                  {naigation.state == "loading" && isTyping ? (
                    <FontAwesomeIcon icon={faSpinner} spinPulse size="xl" />
                  ) : (
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      size="xl"
                      onClick={() => {
                        if (q !== "") {
                          navigate(`/search/${q}`);
                        }
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                      }}
                    />
                  )}
                </div>
                {movieDown && inView && (
                  <ul className=" absolute top-100 w-full space-y-3  bg-gray-600">
                    <DropDownMovie
                      movies={movies}
                      q={q}
                      setIsMouse={(isMouse: boolean) => setIsMouse(isMouse)}
                      isMouse={isMouse}
                      setMovieDown={(movieDown: boolean) =>
                        setMovieDown(movieDown)
                      }
                    />
                  </ul>
                )}
              </div>
            </Form>
          </div>

          <div className="media_search flex-0 group  relative   items-center justify-center">
            <div
              id="tooltip"
              className=" cursor-pointer transition-all  duration-500 group-hover:rotate-180"
              onMouseEnter={(e) => {
                settingRef.current.style.setProperty("top", "120%");
              }}
              onMouseOut={(e) => {
                settingRef.current.style.setProperty("top", "-250%");
              }}
            >
              <img src={Tool} height={35} width={35} alt="tool"></img>
            </div>
            <div
              className="  absolute top-[-250%] !z-[-999999999] flex w-[150%] translate-x-[-15%] flex-col items-center justify-center gap-2 rounded-lg bg-slate-800  transition-all duration-500 "
              ref={settingRef}
              onMouseEnter={(e) => {
                e.preventDefault();
                e.stopPropagation();
                settingRef.current.style.setProperty("top", "120%");
              }}
              onMouseLeave={(e) => {
                e.preventDefault();
                e.stopPropagation();
                settingRef.current.style.setProperty("top", "-250%");
              }}
            >
              <div
                className=" relative flex w-full cursor-pointer justify-center duration-500 before:absolute before:top-0 before:left-0 before:z-[-1] before:h-full before:w-[0%] before:rounded-lg before:bg-slate-500  before:transition  before:content-[''] hover:before:w-full"
                onClick={() => {
                  navigate("/nowplaying/search");
                }}
                onMouseEnter={(e) => e.preventDefault()}
              >
                <img src={Sort} height={30} width={30} alt="sort"></img>
              </div>
              <div
                className=" relative flex w-full cursor-pointer justify-center duration-500 before:absolute before:top-0 before:left-0 before:z-[-1] before:h-full before:w-[0%] before:rounded-lg before:bg-slate-500  before:transition before:content-[''] hover:before:w-full"
                onMouseEnter={(e) => e.preventDefault()}
                onClick={() => {
                  navigate("/login");
                }}
              >
                <img src={User} height={30} width={30} alt="user"></img>
              </div>
            </div>
          </div>
          {!inView && (
            <>
              <div
                className={`media_search md:w-85 fixed top-[-134px] flex transition-all duration-700 lg:w-96  ${
                  scrollNavBar ? "top-[-134px]" : "top-[0px] "
                }`}
              >
                <Form
                  id="search-form"
                  className=" grow-1 flex w-full items-center  gap-5 "
                  role="search"
                >
                  <div className="  relative mx-auto flex w-full justify-center duration-300 ease-in">
                    <input
                      ref={inputFixRef}
                      id="q"
                      type="search"
                      className="focus:border-primary-600   focus:shadow-te-primary placeholder:text-red-300 dark:text-red-200 
              relative w-full rounded-full
              border border-solid border-neutral-700 bg-white bg-clip-padding py-1.5 
               pl-3 pr-10 text-base 
              font-normal
             
              outline-none transition-all duration-300 
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
                            if (q !== "") {
                              navigate(`/search/${q}`);
                            }
                          }}
                          onMouseDown={(e) => {
                            e.preventDefault();
                          }}
                        />
                      ) : (
                        <FontAwesomeIcon icon={faSpinner} spinPulse size="xl" />
                      )}
                    </div>
                  </div>
                </Form>
              </div>
            </>
          )}
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
        </>

        {}
        <NavBarMobile
          q={q}
          setNavBar={(nav: boolean) => setNavBar(nav)}
          navBar={navBar}
          search={search}
          setSearch={(search: boolean) => setSearch(search)}
        />
      </nav>
    </>
  );
};
