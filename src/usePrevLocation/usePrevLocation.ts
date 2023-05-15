import { locationType } from "../Type/LocationType";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
export const usePrevLocation = () => {
  const [locationPath, setLocationPath] = useState<locationType | null>(
    localStorage.getItem("locationPath")
      ? JSON.parse(localStorage.getItem("locationPath") as string)
      : null
  );
  const setLocationPrev = (location: locationType) => {
    setLocationPath(location);
    localStorage.setItem("locationPath", JSON.stringify(location));
  };

  return {
    locationPath,
    setLocationPrev,
  };
};
