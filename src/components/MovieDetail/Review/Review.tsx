import { ReviewData } from "../../HomePage/SliceApi/SliceReview";
import { extractUrl } from "../../../Helper/ExtractUrl";
import { useRef, useEffect, useState } from "react";
import { set } from "date-fns";
type Props = {
  reviewData: ReviewData[];
};
import { createPortal } from "react-dom";
function Review({ reviewData }: { reviewData: ReviewData[] }) {
  const timerRef = useRef<number | null>(null);
  const [xSlate, setXSlate] = useState(0);
  const [slide, setSlide] = useState(true);
  const [pageNumber, setPageNUmber] = useState<number | null>(null);
  const [pageReview, setPageReview] = useState(false);
  const divContainerRed = useRef<HTMLDivElement>(null);
  const reviewCOntainer = document.getElementById("reviewContainer");
  const handleNext = (prev: number) => {
    if (prev === reviewData.length + 2) {
      return 0;
    } else {
      return prev + 1;
    }
  };
  const handleTranSlateX = (index: number, limit: number) => {
    if (
      (xSlate + index) * (limit / (reviewData.length + 1)) >=
      limit + limit / (reviewData.length + 1)
    ) {
      return (
        (xSlate + index) * (limit / (reviewData.length + 1)) -
        (limit + 2 * (limit / (reviewData.length + 1)))
      );
    }
    return (xSlate + index) * (limit / (reviewData.length + 1));
  };
  const handleStop = () => {
    setSlide(false);
    clearInterval(timerRef.current!);
  };
  const handleMouseOverPage = (id: number) => {
    setPageNUmber(id);
    setPageReview(true);
  };
  const handleMouseLeavePage = () => {
    setPageNUmber(null);
    setPageReview(false);
  };
  const handleStart = () => {
    setSlide(true);
    timerRef.current = setInterval(() => {
      setXSlate(handleNext);
    }, 1000);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setXSlate(handleNext);
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [xSlate]);

  return (
    <div
      id="reviewContainer"
      className={`relative flex w-[90%] flex-nowrap bg-transparent p-4 text-white hover:bg-black`}
      onMouseEnter={handleStop}
      onMouseLeave={handleStart}
      ref={divContainerRed}
    >
      {reviewData
        .map((data, i) => (
          <div
            key={data.id}
            className={`-z-1 group absolute even:bottom-0 ${
              handleTranSlateX(
                i,
                divContainerRed.current?.offsetWidth as number
              ) < 0
                ? " "
                : `duration-1000 ease-linear`
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
                  <div
                    className="rounded-full "
                    onMouseEnter={() => handleMouseOverPage(data.id)}
                    onMouseLeave={handleMouseLeavePage}
                  >
                    <img
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
                      className="h-[50px] w-[50px] rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="">
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
                        <div className="">
                          <p className="text-sm">{data.content}</p>
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
    </div>
  );
}

export default Review;
