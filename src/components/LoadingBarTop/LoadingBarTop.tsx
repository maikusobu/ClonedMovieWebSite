import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import { useRef, useEffect } from "react";
import { useNavigation } from "react-router-dom";
function LoadingBarTop() {
  const navigation = useNavigation();
  const ref = useRef<LoadingBarRef>(null!);
  const startLoading = (number: number) => {
    if (ref.current) {
      ref.current.continuousStart(number);
    }
  };
  const endLoading = () => {
    if (ref.current) {
      ref.current.complete();
    }
  };
  useEffect(() => {
    if (navigation.state === "loading") {
      startLoading(40);
    } else {
      endLoading();
    }
  }, [navigation]);
  return (
    <LoadingBar color="#f11946" ref={ref} progress={40} loaderSpeed={30} />
  );
}

export default LoadingBarTop;
