import { urlImage } from "../../../apikey";
function TopBillCast({ topCast }) {
  return (
    <>
      <div
        id="credit"
        className=" relative w-full bg-slate-900 px-4 py-4 text-xl"
      >
        <div className="circle-spin absolute top-1/2 right-1/2 h-[100px] w-[100px]  rounded-full bg-gradient-to-r from-red to-purple"></div>
        <div className="text-2xl font-bold text-yellow">Hot cast</div>
        <div className="flex flex-nowrap gap-4  overflow-x-scroll md:gap-0">
          {topCast
            .filter((cast) => cast.popularity > 10)
            .map((cast) => (
              <div key={cast.id} className="  w-[80%] shrink-0 md:w-[50%]">
                <h1 className=" font-medium text-white">{cast.name}</h1>
                <div className="md:max-w-sm">
                  <img
                    src={`${urlImage}${cast.profile_path}`}
                    className="w-[80%] rounded-lg"
                  />
                </div>
                <div>
                  <div className=" font-bold text-white">Act as</div>
                  <div className="text-white">
                    {cast.character ? cast.character : "Unknown"}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default TopBillCast;
