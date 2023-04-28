import { useState, useEffect, useRef } from "react";
const ImageColorExtractor = ({
  imageUrl,
  children,
  color,
  setColor,
  textColor,
  setTextColor,
  setRgba,
}) => {
  // const [color, setColor] = useState(null);
  // const [textColor, setTextColor] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;
    img.onload = () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      ).data;
      const color = getDominantColor(imageData);
      const colorRbga = [...color];

      colorRbga.push(0.5);

      const luminace = 0.299 * color[0] + 0.587 * color[1] + 0.114 * color[2];

      const givenColor = 3.6 * (luminace + 0.05) - 0.05;

      if (luminace > 166) setTextColor("black");
      else setTextColor("white");

      setColor(`rgb(${color.join(", ")})`);
      setRgba(`rgba(${colorRbga.join(", ")})`);
    };
  }, [imageUrl]);
  const getDominantColor = (imageData) => {
    const colorMap = {};
    let maxCount = 0;
    let dominantColor = [0, 0, 0];
    for (let i = 0; i < imageData.length; i += 4) {
      const [r, g, b] = imageData.slice(i, i + 3);
      const key = `${r},${g},${b}`;
      colorMap[key] = colorMap[key] ? colorMap[key] + 1 : 1;
      if (colorMap[key] > maxCount) {
        maxCount = colorMap[key];
        dominantColor = [r, g, b];
      }
    }
    dominantColor = dominantColor.map((val) => Math.min(val + 50, 255));
    return dominantColor;
  };
  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ display: "none" }}
        width="100"
        height="100"
      />

      {color && (
        <div
          className={`${
            textColor === "black" ? "text-gray-800" : "text-slate-100"
          }`}
          style={{ backgroundColor: color }}
        >
          {children}
        </div>
      )}
    </>
  );
};
export default ImageColorExtractor;
