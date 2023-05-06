
import { MovieType } from "../../../Type/MovieType";
export type TopBillCastType = {
  topCast: (MovieType & {profile_path:string, character:string, popularity: number})[];
}
function TopBillCast({ topCast } : TopBillCastType) {
  return (
    <>
      <div
        id="credit"
        className=" relative w-full bg-slate-900 px-4 py-4 text-xl"
      >
        <div className="circle-spin absolute top-1/2 right-1/2 h-[100px] w-[100px]  rounded-full bg-gradient-to-r from-red to-purple"></div>
        <div className="text-2xl font-bold text-yellow">Hot cast</div>
        <div
          className="flex flex-nowrap  gap-4 overflow-x-scroll border  border-[10px] border-[rgb(133,_137,_148)] p-4   "
          id="list_content"
        >
          {topCast

            .map((cast) => (
              <div
                key={cast.id}
                className="  md:shrink-2 w-[80%] shrink-0 md:w-[20%]"
              >
                <h1 className=" font-medium text-white">{cast.name}</h1>
                <div className="w-full">
                  <img
                    src={`${import.meta.env.VITE_URL_IMAGE}${cast.profile_path}`}
                    className="w-[100%] rounded-lg "
                  />
                </div>
                <div>
                  <div className=" font-bold text-white">Act as</div>
                  <div className="text-white">
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
