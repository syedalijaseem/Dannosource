import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import CanvasDisplay from "./canvasDisplay.component";

import "./workbench.styles.scss";

const Workbench = () => {
  const [images, setImages] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTool, setSelectedTool] = useState("brush");

  const handleImageChange = (e) => {
    const imageFiles = Array.from(e.target.files);
    setImages(imageFiles);
    setImagePreviewUrls(imageFiles.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use axios to send a POST request to the server
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append(`image-${index}`, image);
    });
    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageClick = (image) => {
    console.log("Image URL: ", image);
    const img = new Image();
    img.src = image;
    console.log("Image object: ", img);
    setSelectedImage(image);
  };

  const canvasRef = useRef(null);

  useEffect(() => {
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

  const handleCanvasClick = (event) => {
    if (selectedTool === "brush") {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const x = event.clientX - canvas.offsetLeft;
      const y = event.clientY - canvas.offsetTop;
      ctx.fillRect(x, y, 10, 10);
    } else if (selectedTool === "text") {
      let text = prompt("Enter text to add to the canvas:");
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const x = event.clientX - canvas.offsetLeft;
      const y = event.clientY - canvas.offsetTop;
      ctx.fillText(text, x, y);
    } else if (selectedTool === "rectangle") {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const x = event.clientX - canvas.offsetLeft;
      const y = event.clientY - canvas.offsetTop;
      ctx.beginPath();
      ctx.rect(x, y, 50, 50);
      ctx.stroke();
    } else if (selectedTool === "free drawing") {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      let isDrawing = false;

      canvas.addEventListener("mousedown", function (e) {
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
      });

      canvas.addEventListener("mousemove", function (e) {
        if (isDrawing) {
          ctx.lineTo(
            e.clientX - canvas.offsetLeft,
            e.clientY - canvas.offsetTop
          );
          ctx.stroke();
        }
      });

      canvas.addEventListener("mouseup", function () {
        isDrawing = false;
      });
    } else if (selectedTool === "polygon") {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      let vertices = [];

      canvas.addEventListener("mousedown", function (e) {
        vertices.push([
          e.clientX - canvas.offsetLeft,
          e.clientY - canvas.offsetTop,
        ]);
        if (vertices.length === 1) {
          ctx.beginPath();
          ctx.moveTo(vertices[0][0], vertices[0][1]);
        } else {
          ctx.lineTo(
            vertices[vertices.length - 1][0],
            vertices[vertices.length - 1][1]
          );
          ctx.stroke();
        }
      });

      canvas.addEventListener("dblclick", function () {
        ctx.closePath();
        ctx.stroke();
        vertices = [];
      });
    }
  };

  const imageContainerStyle = {
    width: "20%",
    float: "left",
    display: "flex",
    flexWrap: "wrap",
  };

  const canvasContainerStyle = {
    width: "80%",
    float: "right",
  };

  const imageStyle = {
    width: "100%",
    height: "auto",
    marginBottom: "10px",
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="file" multiple onChange={handleImageChange} />
        <button type="submit">Upload Images</button>
      </form>
      <div style={imageContainerStyle}>
        {imagePreviewUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Image ${index}`}
            style={imageStyle}
            onClick={() => handleImageClick(url)}
          />
        ))}
      </div>
      <div>
        <button onClick={() => setSelectedTool("brush")}>Brush</button>
        <button onClick={() => setSelectedTool("text")}>Text</button>
        <button onClick={() => setSelectedTool("rectangle")}>Rectangle</button>
        <button onClick={() => setSelectedTool("free drawing")}>
          Free Draw
        </button>
        <button onClick={() => setSelectedTool("polygon")}>Polygon</button>
      </div>
      <div>
        {selectedImage ? (
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            style={{ border: "1px solid black" }}
          />
        ) : (
          <p>No image selected</p>
        )}
      </div>
    </>
  );
};

export default Workbench;
