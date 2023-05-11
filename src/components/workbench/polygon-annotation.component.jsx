import React, { useRef, useState, useEffect } from "react";

const PolygonAnnotation = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [polygons, setPolygons] = useState([]);
  const [currentPolygon, setCurrentPolygon] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineWidth = 2;
    context.strokeStyle = "#ff0000";
  }, []);

  const handleMouseDown = (event) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const { offsetX, offsetY } = event.nativeEvent;

    if (!isDrawing) {
      setIsDrawing(true);
      setCurrentPolygon([{ x: offsetX, y: offsetY }]);
    } else {
      setCurrentPolygon([...currentPolygon, { x: offsetX, y: offsetY }]);
      context.beginPath();
      context.moveTo(
        currentPolygon[currentPolygon.length - 1].x,
        currentPolygon[currentPolygon.length - 1].y
      );
      context.lineTo(offsetX, offsetY);
      context.stroke();
    }
  };

  const handleDoubleClick = () => {
    setIsDrawing(false);
    setPolygons([...polygons, currentPolygon]);
    setCurrentPolygon([]);
  };

  return (
    <canvas
      ref={canvasRef}
      className="border border-black w-3/4 h-screen"
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    ></canvas>
  );
};

export default PolygonAnnotation;
