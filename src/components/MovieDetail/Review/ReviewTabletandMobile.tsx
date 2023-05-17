import { Props } from "./Review";
import { isBeginWithHTTPS } from "../../../Helper/isBeginWithHTTPS";
import { useState } from "react";
import { createPortal } from "react-dom";
import useScreen from "../../useScreen/useScreen";
function ReviewTabletandMobile({ reviewData }: Props) {
  const [pageNumber, setPageNUmber] = useState<number | null>(null);
  const { width, height } = useScreen();
  const handleSet = (id: number) => {
    if (pageNumber === id) {
      setPageNUmber(null);
    } else {
      setPageNUmber(id);
    }
  };
  return (
    <div
      id="reviewContainer"
      className={`grid ${
        width > 770 ? "w-[90%]" : "w-[100%]"
      }  grid-cols-[repeat(auto_fill,minmax(0,1fr))] flex-nowrap gap-6 bg-transparent  text-white`}
    >
      {reviewData
        .map((data, i) => (
          <div key={data.id}>
            {
              <div
                className={`relative transition ${
                  data.id === pageNumber ? "bg-black/70" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="cursor-pointer rounded-full "
                    onClick={() => handleSet(data.id)}
                  >
                    <img
                      src={` ${
                        isBeginWithHTTPS(data.author_details.avatar_path)
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
                    {pageNumber === data.id &&
                      createPortal(
                        <div className=" z-4 relative top-0 left-0 h-full  w-full bg-black/50 p-4 text-xs">
                          <p
                            className=" text-xs leading-relaxed"
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
    </div>
  );
}

export default ReviewTabletandMobile;
