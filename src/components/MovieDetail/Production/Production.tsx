import { productionCompanies } from "../MovieData/MovieData";
function Production({ array }: { array: productionCompanies[] }) {
  return (
    <>
      <div
        className=" flex flex-col gap-2"
        onMouseEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {array
          .filter(
            (company) =>
              company.origin_country === "US" &&
              company.logo_path !== null &&
              company.name !== null
          )
          .map((company) => (
            <div
              className="group relative cursor-pointer pl-3 before:absolute before:top-0 before:left-0 before:content-['*'] "
              key={company.id}
            >
              <h5 className="  transiton relative text-sm font-semibold before:absolute before:h-full before:w-[0%] before:bg-slate-500/50 before:transition-all before:duration-500  group-hover:before:w-full">
                {company.name}
              </h5>
              <div className="absolute left-0 top-0 z-10 hidden translate-x-[-100%]  group-hover:block  group-hover:bg-white">
                <img
                  className="h-1/3"
                  src={`${import.meta.env.VITE_URL_IMAGE}${company.logo_path}`}
                />{" "}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Production;
