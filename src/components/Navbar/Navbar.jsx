import { FaUserAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IconContext } from "react-icons";
import { FaPlay } from "react-icons/fa";
import Logo from "./logo2.png";
import { Form } from "react-router-dom";
import { Link } from "react-router-dom";
import { getTheMovie } from "./Helper";
import { useLoaderData } from "react-router-dom";
import { FaFontAwesome } from "react-icons/fa";
import { useEffect, useRef } from "react";
import { useSubmit } from "react-router-dom";
import "./Navbar.css";
export const Navbar = ({ movies, q }) => {
  const inputRef = useRef();
  const submit = useSubmit();

  useEffect(() => {
    inputRef.current.value = q;
  }, [q]);

  return (
    <>
      <nav
        id="navBar"
        className=" w-full flex  justify-between items-center  px-8 h-20 bg"
      >
        <div className=" text-[20px] bg-white h-full flex items-center ">
          <div className=" ">
<div className="flex  justify-center items-center">
 <div className=" text-3xl  font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-amber-300">I</div>
 <div>
 <IconContext.Provider
                value={{
                  className:
                    " border-20 b",
                  size: "1.2em",
                  color: "#FCD354",
                }}
              >
              <FaPlay/>
              </IconContext.Provider>
              <span>
                
              </span>

  </div>
 <div className=" text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600">W</div>
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
              text-red-500 outline-none transition duration-300 
              ease-in-out focus:border-primary-600 focus:text-black-700 
              focus:shadow-te-primary focus:outline-none dark:border-neutral-600 
              dark:text-red-200 dark:placeholder:text-red-200 "
                placeholder="search the"
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
              <IconContext.Provider
                value={{
                  className:
                    " absolute top-0 right-0 translate-y-1/2 translate-x-[-50%]",
                  size: "1.2em",
                  color: "red",
                }}
              >
                <FaSearch />
              </IconContext.Provider>
            </div>
          </Form>
        </div>

        <div className="flex-initial  border border-4 border-white pr-8">
          <div className="flex justify-end items-center relative">
            <div className="flex mr-4 items-center gradient rounded-full ">
              <a className="inline-block py-2 px-3 " href="#">
                <div className="flex items-center relative cursor-pointer whitespace-nowrap ">
                  Donate
                </div>
              </a>
            </div>
            <IconContext.Provider
              value={{
                className: "fagradient",
                size: "2rem",
                color: "white",
              }}
            >
              <FaUserAlt />
            </IconContext.Provider>
          </div>
        </div>
      </nav>
    </>
  );
};
