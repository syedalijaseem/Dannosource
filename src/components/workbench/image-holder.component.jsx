import React from "react";

const ImageHolder = (props) => {
  const handleClick = (index) => {
    props.setSelectedImageIndex(index);
  };

  return (
    <div className="w-1/4 h-screen overflow-y-scroll">
      {props.images.map((image, index) => (
        <img
          key={index}
          src={URL.createObjectURL(image)}
          alt="uploaded"
          className="w-full h-auto cursor-pointer"
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default ImageHolder;
