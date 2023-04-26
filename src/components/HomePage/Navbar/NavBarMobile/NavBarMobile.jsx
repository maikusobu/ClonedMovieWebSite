import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faMagnifyingGlass,
  faUser,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-router-dom";
import { useNavigation, useSubmit } from "react-router-dom";
function NavBarMobile({ navBar, setNavBar, search, setSearch, q }) {
  const navigation = useNavigation();
  const submit = useSubmit();
  // const q = navigation.location.state?.q;
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const search = e.target.search.value;
  //   if (search) {
  //     navigation.push({
  //       pathname: "/search",
  //       state: {
  //         q: search,
  //       },
  //     });
  //   }
  // };

  return (
    <div
      className={`main_navbar disp absolute top-0  h-[100vh] w-[100%] bg-slate-600 transition-all delay-300 ${
        navBar ? "right-0" : "right-[-100%]"
      }`}
    >
      <div>
        <FontAwesomeIcon
          icon={faXmark}
          size="2xl"
          style={{ color: "#e7e8e9" }}
          onClick={(e) => {
            setNavBar(!navBar);
          }}
        />
      </div>
      <div
        className={`flex flex-col items-center justify-center gap-5 pt-2   `}
      >
        {!search && (
          <div>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size="2xl"
              style={{ color: "#ffd43b" }}
              onClick={() => {
                setSearch(!search);
              }}
            />
          </div>
        )}
        {search && (
          <Form
            id="search-form"
            className=" grow-1 flex w-full items-center  gap-5 "
            role="search"
          >
            <div
              className="  relative mx-auto duration-300 ease-in"
              onBlur={(e) => {
                setSearch(!search);
              }}
            >
              <input
                autoFocus
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
                placeholder="Movie you love"
                aria-label="Search-movie"
                aria-describedby="button-addon2"
                name="search"
                defaultValue={q}
                onChange={(e) => {
                  console.log(navigation);
                  const isFirstSearch = q == null;
                  submit(e.currentTarget.form, {
                    replace: !isFirstSearch,
                  });
                }}
              />

              <div className=" absolute top-0 right-0  translate-y-[30%] translate-x-[-50%] cursor-pointer transition ease-in-out">
                {navigation.state == "idle" ? (
                  <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
                ) : (
                  <FontAwesomeIcon icon={faSpinner} spinPulse size="xl" />
                )}
              </div>
            </div>
          </Form>
        )}
        <div>
          <FontAwesomeIcon
            icon={faUser}
            size="2xl"
            style={{ color: "#ffd43b" }}
          />
        </div>
      </div>
    </div>
  );
}

export default NavBarMobile;
