import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faMagnifyingGlass,
  faUser,
  faSpinner,
  faArrowDownWideShort,
} from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-router-dom";
import { useNavigation, useSubmit, useNavigate } from "react-router-dom";
type NavBarMobileProps = {
  navBar: boolean;
  setNavBar: (navBar: boolean) => void;
  search: boolean;
  setSearch: (search: boolean) => void;
  q: string;
};
function NavBarMobile({
  navBar,
  setNavBar,
  search,
  setSearch,
  q,
}: NavBarMobileProps) {
  const navigation = useNavigation();
  const submit = useSubmit();
  const navigate = useNavigate();

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
          className={`${!navBar ? "navBar_mobile" : ""}`}
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
            <div className="  relative mx-auto duration-300 ease-in">
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
                  const isFirstSearch = q == null;
                  submit(e.currentTarget.form, {
                    replace: !isFirstSearch,
                  });
                }}
                onBlur={(e) => {
                  setSearch(!search);
                }}
              />

              <div className=" absolute top-0 right-0  translate-y-[30%] translate-x-[-50%] cursor-pointer transition ease-in-out">
                {navigation.state == "idle" ? (
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    size="xl"
                    onClick={() => {
                      navigate(`/search/${q}`);
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
        )}
        <div>
          <FontAwesomeIcon
            icon={faUser}
            size="2xl"
            style={{ color: "#ffd43b" }}
          />
        </div>
        <div>
          <FontAwesomeIcon
            icon={faArrowDownWideShort}
            size="2xl"
            style={{ color: "#ffd43b" }}
            onClick={() => {
              navigate("/nowplaying/search");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default NavBarMobile;
