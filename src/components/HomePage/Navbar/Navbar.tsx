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
import { useInView } from 'react-intersection-observer';
import DropDownMovie from "../DropDownMovie/DropDownMovie";
import NavBarMobile from "./NavBarMobile/NavBarMobile";
import { MovieType } from "../../../Type/MovieType";
import fi from "date-fns/esm/locale/fi";
import { set } from "date-fns";
type NavbarProps = {
  movies: MovieType[];
  q: string;
}
let lastScrollTop = 0;
let fixedNav = false;
export const Navbar = ({ movies, q } : NavbarProps): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null!);
    const refDiv = useRef<HTMLDivElement>(null!);
  const inputFixRef = useRef<HTMLInputElement>(null!);
  const submit = useSubmit();
  const naigation = useNavigation();
  const navigate = useNavigate();
  const [movieDown, setMovieDown] = useState(false);
  const [navBar, setNavBar] = useState(false);
  const [search, setSearch] = useState(false);
  const [isMouse, setIsMouse] = useState(false);
  const [scrollNavBar, setScrollNavBar] = useState(true);

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
   }

   window.addEventListener("scroll", handleScroll);
   return () => {
      window.removeEventListener("scroll", handleScroll);
    };
}, []);
  useEffect(() => {
    inputRef.current.value = q;
    if (inputFixRef.current) {
      inputFixRef.current.value = q;
    }
  }, [q]);
 console.log(scrollNavBar)
  return (
    <>
      <nav
        ref={ref}
        id="navBar"
        className=" relative z-50 flex  w-full justify-around items-center  "
      >
      
        <>
        <div className="  flex h-auto cursor-pointer items-center ">
          <div
            className=" aspect-square "
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={Logo} width={50} height={50} alt="logo" />
          </div>
        </div>

          <div className="media_search md:w-85 flex lg:w-96 " >
          <Form
            id="search-form"
            className=" grow-1 flex w-full items-center gap-5 "
            role="search"
          >
            <div
                className="  relative mx-auto duration-300 ease-in w-1/2 flex justify-center"
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
                }
              }}
              onBlur={(e) => {
                if (!isMouse) {
                    refDiv.current.style.setProperty("width", "50%");
                  setMovieDown(!movieDown);
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
              {movieDown && (
                <ul className=" absolute top-100 w-full space-y-3  bg-gray-600">
                  <DropDownMovie
                    movies={movies}
                    q={q}
                    setIsMouse={(isMouse: boolean) => setIsMouse(isMouse)}
                    isMouse={isMouse}
                    setMovieDown={(movieDown: boolean) => setMovieDown(movieDown)}
                  />
                </ul>
              )}
            </div>
          </Form>
        </div>
       
        <div className="media_search  flex-0  items-center justify-center ">
          <div className="relative flex items-center justify-center  gap-2">
            <div
              className=" cursor-pointer"
              onClick={() => {
                navigate("/nowplaying/search");
              }}
            >
              <img src={Sort} height={30} width={30} alt="sort" ></img>
            </div>
            <div>
              <img src={User} height={30} width={30} alt="user"></img>
            </div>
          </div>
        </div>
    {
            (!inView &&  <>
                <div className={`media_search md:w-85 flex lg:w-96 fixed top-[-134px] transition-all duration-700  ${scrollNavBar ? "top-[-134px]" : "top-[0px] "}`} >
          <Form
            id="search-form"
            className=" grow-1 flex w-full items-center  gap-5 "
            role="search"
          >
            <div
                className="  relative mx-auto duration-300 ease-in w-full flex justify-center"
               
            >
              <input
                ref={inputFixRef}
                id="q"
                  type="search"
                     onFocus={() => {
                if (!isMouse) {
            
                  setMovieDown(!movieDown);
                }
              }}
              onBlur={(e) => {
                if (!isMouse) {
              
                  setMovieDown(!movieDown);
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
            </>)
        }
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
        
        {
          
        }
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
