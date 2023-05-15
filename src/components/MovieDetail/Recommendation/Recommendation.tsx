import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import { fetchRecommend } from "../../HomePage/SliceApi/SliceRecommend";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import NotFound from "../../../assets/notfound.jpg";

import {
  selectRecommend,
  selectRecommendStatus,
} from "../../HomePage/SliceApi/SliceRecommend";

function Recommendation({ id }: { id: number }) {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectRecommend);
  const status = useAppSelector(selectRecommendStatus);
  const [scrollState, setScrollState] = useState(0);

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
        inline: "start",
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
        <div className="mx-4 flex justify-center">
          <div id="scroll_arrow" className=" w-1/4 font-bold ">
            <div className="text-2xl text-yellow">
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
            className=" flex w-4/5 min-w-[938px] 
          max-w-[941px] scroll-pl-2 flex-nowrap gap-5 overflow-hidden overflow-y-hidden border-[10px] border-borderColor p-3 pl-2"
          >
            {data?.map((item, i) => (
              <div
                key={item.id}
                className=" flex h-[32%] min-h-[120px] w-[32%] min-w-[220px] shrink-0 flex-col gap-4"
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
                      className=" rounded-lg hover:scale-[1.08]"
                    />
                  </div>
                </Link>
                <div>
                  <h4 className="ml-3 text-xl font-semibold text-white">
                    {item.title}
                    {i}
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
