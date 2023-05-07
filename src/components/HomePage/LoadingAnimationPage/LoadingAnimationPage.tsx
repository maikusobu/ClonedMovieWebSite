import Logo from "../Navbar/lgo.svg";
function LoadingAnimationPage() {
  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-slate-700/80 ">
        <div className="animate-pulse">
          <img src={Logo} width={90} height={90} />
        </div>
      </div>
    </>
  );
}

export default LoadingAnimationPage;
