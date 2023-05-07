import ReactLoading from "react-loading";
function LoadingPage() {
  return (
    <div className=" flex h-[400px] items-center justify-center bg-slate-900">
      <ReactLoading
        type="spokes"
        height={"4%"}
        width={"4%"}
        color="#fff"
      ></ReactLoading>
    </div>
  );
}

export default LoadingPage;
