import React, { useRef, useEffect, useState } from "react";

const CanvasDisplay = (props) => {
  const canvasRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isPolygonMode, setIsPolygonMode] = useState(false);
  const [isDrawingPolygon, setIsDrawingPolygon] = useState(false);
  const [polygonPoints, setPolygonPoints] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const image = new Image();
    image.src = props.selectedImage
      ? URL.createObjectURL(props.selectedImage)
      : "";
    image.onload = () => {
      const { width, height } = image;
      canvas.width = width;
      canvas.height = height;
      context.clearRect(0, 0, width, height);
      context.drawImage(image, 0, 0, width * zoomLevel, height * zoomLevel);
    };
  }, [props.selectedImage, zoomLevel]);

  const handleZoomIn = () => {
    const canvas = canvasRef.current;
    const newZoomLevel = zoomLevel + 0.1;
    if (canvas && canvas.width * newZoomLevel <= window.innerWidth) {
      setZoomLevel(newZoomLevel);
    }
  };

  const handleZoomOut = () => {
    const canvas = canvasRef.current;
    const newZoomLevel = zoomLevel - 0.1;
    if (canvas && canvas.width * newZoomLevel >= 100) {
      setZoomLevel(newZoomLevel);
    }
  };

  const handlePolygonClick = () => {
    setIsPolygonMode(!isPolygonMode);
  };

  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (isPolygonMode) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (!isDrawingPolygon) {
        setIsDrawingPolygon(true);
        setPolygonPoints([{ x, y }]);
      } else {
        setPolygonPoints([...polygonPoints, { x, y }]);
        drawPolygon(context, polygonPoints.concat([{ x, y }]), true);
      }
    }
  };

  const handleCanvasDoubleClick = (event) => {
    if (isDrawingPolygon) {
      setIsDrawingPolygon(false);
      setPolygonPoints([]);
    }
  };

  const drawPolygon = (context, points, isClosed) => {
    context.lineWidth = 3;
    context.strokeStyle = "#FF0000";
    context.fillStyle = "rgba(255, 0, 0, 0.2)";
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      context.lineTo(points[i].x, points[i].y);
    }
    if (isClosed) {
      context.closePath();
      context.stroke();
      context.fill();
    } else {
      context.stroke();
    }
  };

  return (
    <div>
      <div>
        <button className="p-3" onClick={handleZoomIn}>
          Zoom In
        </button>
        <button onClick={handleZoomOut}>Zoom Out</button>
        <button onClick={handlePolygonClick}>
          {isPolygonMode ? "Exit Polygon Mode" : "Enter Polygon Mode"}
        </button>
      </div>
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        onDoubleClick={handleCanvasDoubleClick}
      />
    </div>
  );
};

export default CanvasDisplay;
