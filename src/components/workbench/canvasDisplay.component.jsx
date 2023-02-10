import React, { useRef } from "react";

const CanvasDisplay = ({ selectedImage }) => {
  const canvasRef = useRef(null);

  React.useEffect(() => {
    if (selectedImage) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = selectedImage;
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
      };
    }
  }, [selectedImage]);

  return <canvas ref={canvasRef} />;
};

export default CanvasDisplay;
