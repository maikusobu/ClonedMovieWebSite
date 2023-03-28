import { FaUserAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IconContext } from "react-icons";
import { FaPlay } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import Logo from "./user1.svg";
import User from "./user.svg"
import { Form } from "react-router-dom";
import { Link } from "react-router-dom";
import { getTheMovie } from "./Helper";
import { useLoaderData } from "react-router-dom";
import { FaFontAwesome } from "react-icons/fa";
import { useEffect, useRef } from "react";
import { useSubmit } from "react-router-dom";
import { useNavigation } from "react-router-dom";
import "./Navbar.css";
import Loading from "react-loading";
import { Navigation } from "swiper";
export const Navbar = ({ movies, q }) => {
  const inputRef = useRef();
  const submit = useSubmit();
  const naigation = useNavigation();
  useEffect(() => {
    inputRef.current.value = q;
  }, [q]);

  return (
    <>
      <nav
        id="navBar"
        className=" w-full flex  justify-between items-center  my-7 px-8 h-20 bg  "
      >
        <div className="  h-full flex items-center ">
          <div className=" ">
<div className="flex  justify-between items-center">
 <div className=" fagradient font-medium text-6xl flex items-center mb-2">I</div>
 <div>
 <div className="border-10 aspect-square  ">
  <img src={Logo}/>
 </div>
  </div>
 <div className=" text-6xl  font-medium flex items-center fagradient mb-2 ml-[-0.1em]">W</div>
</div>
          </div>
        </div>

        <div class="xl:w-96 flex">
          <Form
            id="search-form"
            className=" items-center flex grow-1 gap-5  w-full "
            role="search"
          >
            <div
              className="relative w-[50%] ease-in duration-300 mx-auto"
              onFocus={(e) => {
                e.currentTarget.style.setProperty("width", "100%");
              }}
              onBlur={(e) => {
                e.currentTarget.style.setProperty("width", "50%");
              }}
            >
              <input
                ref={inputRef}
                id="q"
                type="search"
                className="relative w-full rounded-full border 
              border-solid border-neutral-700 bg-white
              bg-clip-padding pl-3 pr-10 py-1.5 text-base font-normal 
               outline-none transition duration-300 
              placeholder:text-red-300
              ease-in-out focus:border-primary-600 focus:text-black 
              focus:shadow-te-primary focus:outline-none dark:border-neutral-600 
              dark:text-red-200"
                placeholder="Movie you love"
                aria-label="Search-movie"
                aria-describedby="button-addon2"
                name="search"
                defaultValue={q}
                onChange={(e) => {
                  const isFirstSearch = q == null;
                  submit(e.currentTarget.form, {
                    replacce: !isFirstSearch,
                  });
                }}
              />
              
            <div className=" transition ease-in-out  absolute top-0 right-0 translate-y-[30%] translate-x-[-50%] cursor-pointer">
              {naigation.state == "idle" ? <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" /> : 
            <FontAwesomeIcon icon={faSpinner} spinPulse size="xl"/>}
            </div>
            </div>
          </Form>
        </div>

        <div className="flex-initial  pr-8">
          <div className="flex justify-end items-center relative">
            {/* <div className="flex mr-4 items-center gradient rounded-full ">
              <a className="inline-block py-2 px-3 " href="#">
                <div className="flex items-center relative cursor-pointer whitespace-nowrap ">
                  Donate
                </div>
              </a>
            </div> */}
            <div>
              <img src={User}></img>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
