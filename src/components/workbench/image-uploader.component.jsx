import React from "react";

const ImageUploader = (props) => {
  const handleUpload = (event) => {
    const files = Array.from(event.target.files);
    props.setImages((prevImages) => [...prevImages, ...files]);
  };

  return (
    <div className="flex justify-center items-center">
      <label className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Upload Images
        <input
          type="file"
          multiple
          className="hidden"
          accept="image/*"
          onChange={handleUpload}
        />
      </label>
    </div>
  );
};

export default ImageUploader;
