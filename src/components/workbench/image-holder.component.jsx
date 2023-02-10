import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const ImageHolder = () => {
  const [images, setImages] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

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
      <div style={canvasContainerStyle}>
        {selectedImage ? <canvas ref={canvasRef} /> : <p>No image selected</p>}
      </div>
    </>
  );
};

export default ImageHolder;
