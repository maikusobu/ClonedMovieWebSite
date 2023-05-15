import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import { fetchRecommend } from "../../HomePage/SliceApi/SliceRecommend";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import NotFound from "../../../assets/notfound.jpg";
import useScreen from "../../useScreen/useScreen";

import {
  selectRecommend,
  selectRecommendStatus,
} from "../../HomePage/SliceApi/SliceRecommend";

function Recommendation({ id }: { id: number }) {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectRecommend);
  const status = useAppSelector(selectRecommendStatus);
  const [scrollState, setScrollState] = useState(0);
  const { width, height } = useScreen();
  const refScroll = useRef<HTMLDivElement>(null);
  const handleMoveScroll = (state: number) => {
    if (state === 1) {
      if (scrollState < 18) {
        flushSync(() => {
          setScrollState(scrollState + 1);
        });
      }
      handleScrollArrow();
    }
    if (state === -1) {
      if (scrollState > 0)
        flushSync(() => {
          setScrollState(scrollState - 1);
        });
      handleScrollArrow();
    }
  };
  const handleScrollArrow = () => {
    if (refScroll.current) {
      refScroll.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: `${width < 768 ? "center" : "start"}`,
      });
    }
  };

  useEffect(() => {
    dispatch(fetchRecommend({ id: id }));
  }, [id]);

  if (status == "pending")
    return (
      <>
        {" "}
        <h3>Pending</h3>
      </>
    );
  else if (status == "success")
    return (
      <>
        <div className="flex flex-col-reverse justify-center md:mx-4 lg:flex-row">
          <div id="scroll_arrow" className=" w-full font-bold lg:w-1/4 ">
            <div className="text-center text-2xl text-yellow">
              <h3>Movies you should watch!!</h3>
            </div>
            <div className="flex items-center justify-center gap-5 text-3xl text-purple ">
              <div
                onClick={() => handleMoveScroll(-1)}
                className={scrollState <= 0 ? "disable" : ""}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </div>
              <div
                onClick={() => handleMoveScroll(1)}
                className={scrollState >= 18 ? "disable" : ""}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
            </div>
          </div>
          <div
            className=" md:min-w[740px] flex min-h-[190px] min-w-full  max-w-[941px] flex-nowrap 
          gap-5 overflow-hidden overflow-y-hidden border-[10px] 
          border-borderColor p-3 md:w-4/5 md:scroll-pl-2 md:pl-2 lg:min-w-[938px]"
          >
            {data?.map((item, i) => (
              <div
                key={item.id}
                className=" flex h-[80%] w-[100%] shrink-0 flex-col justify-between gap-4 md:min-w-[224px] lg:h-[32%] lg:w-[32%]"
                ref={i === scrollState ? refScroll : null}
              >
                <Link to={`/description/movie/${item.id}`}>
                  <div>
                    <img
                      src={`${
                        item.backdrop_path
                          ? `${import.meta.env.VITE_URL_IMAGE}${
                              item.backdrop_path
                            }`
                          : `${null}`
                      }  `}
                      alt=""
                      width={300}
                      className=" block w-full  rounded-lg hover:scale-[1.08]"
                    />
                  </div>
                </Link>
                <div className="">
                  <h4 className="ml-3 text-sm font-bold text-white md:text-base lg:text-xl">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  else return <></>;
}

export default Recommendation;
