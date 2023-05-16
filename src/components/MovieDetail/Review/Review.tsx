import { ReviewData } from "../../HomePage/SliceApi/SliceReview";
import { extractUrl } from "../../../Helper/ExtractUrl";
import { useRef, useEffect, useState } from "react";
import useScreen from "../../useScreen/useScreen";
import { set } from "date-fns";
export type Props = {
  reviewData: ReviewData[];
};
import { createPortal } from "react-dom";
function Review({ reviewData }: { reviewData: ReviewData[] }) {
  const timerRef = useRef<number | null>(null);
  const [xSlate, setXSlate] = useState(0);
  const [slide, setSlide] = useState(false);
  const [pageNumber, setPageNUmber] = useState<number | null>(null);
  const [pageReview, setPageReview] = useState(false);
  const divContainerRed = useRef<HTMLDivElement>(null);

  const handleNext = (prev: number) => {
    if (prev === 6) {
      return 0;
    } else {
      return prev + 1;
    }
  };
  const handleTranSlateX = (index: number, limit: number) => {
    const length = 4;
    if (
      (xSlate + index) * (limit / (length + 1)) >=
      limit + limit / (length + 1)
    ) {
      return (
        (xSlate + index) * (limit / (length + 1)) -
        (limit + 2 * (limit / (length + 1)))
      );
    }
    return (xSlate + index) * (limit / (length + 1));
  };
  const handleStop = () => {
    clearInterval(timerRef.current!);
  };
  const handleMouseOverPage = (id: number) => {
    setPageNUmber(id);
    setPageReview(true);
    setSlide(true);
  };
  const handleMouseLeavePage = () => {
    setPageNUmber(null);
    setPageReview(false);
    setSlide(false);
  };
  const handleStart = () => {
    timerRef.current = setInterval(() => {
      setXSlate(handleNext);
    }, 700);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setXSlate(handleNext);
    }, 700);
    return () => clearInterval(timerRef.current!);
  }, [xSlate]);

  return (
    <div
      id="reviewContainer"
      className={`relative flex w-[90%] flex-nowrap gap-6 bg-transparent px-4 text-white hover:bg-black `}
      onMouseEnter={handleStop}
      onMouseLeave={handleStart}
      ref={divContainerRed}
    >
      {reviewData
        .map((data, i) => (
          <div
            key={data.id}
            className={` group absolute  ${
              slide
                ? "odd:top-[-100px]  even:bottom-[-100px]"
                : "odd:top-4 even:bottom-4"
            } ${
              handleTranSlateX(
                i,
                divContainerRed.current?.offsetWidth as number
              ) < 0
                ? " "
                : `${"duration-1000"} ease-linear`
            } `}
            style={{
              transform: `translateX(${handleTranSlateX(
                i,
                divContainerRed.current?.offsetWidth as number
              )}px`,
            }}
          >
            {
              <div className="relative">
                <div className="flex items-center gap-2">
                  <div className="rounded-full ">
                    <img
                      onMouseOver={() => handleMouseOverPage(data.id)}
                      src={` ${
                        extractUrl(data.author_details.avatar_path)
                          ? data.author_details.avatar_path.substring(1)
                          : `${import.meta.env.VITE_URL_IMAGE}${
                              data.author_details.avatar_path
                            }`
                      }   `}
                      alt=""
                      width={50}
                      height={50}
                      className="h-[50px] w-[50px] cursor-pointer rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className=" max-w-[15ch]">
                      {data.author_details.name
                        ? data.author_details.name
                        : "Unknown"}
                    </h3>
                    <h4>
                      Rate:{" "}
                      {data.author_details.rating
                        ? data.author_details.rating
                        : "?"}
                    </h4>
                    {pageReview &&
                      pageNumber === data.id &&
                      createPortal(
                        <div
                          className=" z-4 relative top-0 left-0 h-full  w-full bg-black/50 p-4 text-xs"
                          onMouseLeave={handleMouseLeavePage}
                        >
                          <p
                            className="text-sm leading-relaxed"
                            onMouseEnter={(e) => e.preventDefault()}
                          >
                            {data.content}
                          </p>
                        </div>,
                        document.getElementById("reviewContainer")!
                      )}
                  </div>
                </div>
              </div>
            }
          </div>
        ))
        .slice(0, 4)}
      {reviewData.length === 0 && "No Review"}
    </div>
  );
}

export default Review;
