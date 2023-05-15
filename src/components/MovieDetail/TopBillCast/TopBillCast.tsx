import { MovieType } from "../../../Type/MovieType";
export type TopBillCastType = {
  topCast: (MovieType & {
    profile_path: string;
    character: string;
    popularity: number;
  })[];
};
function TopBillCast({ topCast }: TopBillCastType) {
  return (
    <>
      <div
        id="credit"
        className=" relative w-full bg-slate-900 py-4 text-xl md:px-4"
      >
        <div className="circle-spin absolute top-1/2 right-1/2 h-[100px] w-[100px]  rounded-full bg-gradient-to-r from-red to-purple"></div>
        <div className="text-2xl font-bold text-yellow">Hot cast</div>
        <div
          className="flex flex-nowrap  gap-2 overflow-x-scroll border-[10px] border-[rgb(133,_137,_148)]  px-2 md:gap-4 md:p-4   "
          id="list_content"
        >
          {topCast

            .map((cast) => (
              <div
                key={cast.id}
                className="  md:shrink-2 w-[50%] shrink-0 md:w-[20%]"
              >
                <h1 className=" text-base font-medium text-white lg:text-xl">
                  {cast.name}
                </h1>
                <div className="w-full">
                  <img
                    src={`${import.meta.env.VITE_URL_IMAGE}${
                      cast.profile_path
                    }`}
                    width={270}
                    className="w-[100%] max-w-[270px] rounded-lg "
                  />
                </div>
                <div>
                  <div className=" font-bold text-white">Act as</div>
                  <div className="text-base text-white lg:text-xl">
                    {cast.character ? cast.character : "Unknown"}
                  </div>
                </div>
              </div>
            ))
            .slice(0, 10)}
        </div>
      </div>
    </>
  );
}

export default TopBillCast;
