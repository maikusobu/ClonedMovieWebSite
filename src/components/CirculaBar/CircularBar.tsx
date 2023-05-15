import { CircularProgressbar } from "react-circular-progressbar";
function CircularBar({ vote }: { vote: number }) {
  return (
    <CircularProgressbar
      value={vote * 10 || 100}
      text={`${vote?.toFixed(1) || 100}`}
      strokeWidth={8}
      styles={{
        root: {},
        path: {
          stroke: `${
            vote * 10 >= 70
              ? "#dc2430"
              : vote * 10 >= 50
              ? "#7b4397"
              : "#01c6ac"
          }`,
          strokeLinecap: "butt",
          transition: "stroke-dashoffset 0.5s ease 0s",
        },
        trail: {
          stroke: `${
            vote * 10 >= 70
              ? "#580e13"
              : vote * 10 >= 50
              ? "#3e224c"
              : "#003b34"
          }`,
        },
        text: {
          fill: `white`,
          fontSize: "40px",
          fontWeight: "500",
        },
      }}
    />
  );
}

export default CircularBar;
