import { useEffect, useState } from "react";
function useScreen() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      setHeight(innerHeight);
      setWidth(innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return { width, height };
}
export default useScreen;
