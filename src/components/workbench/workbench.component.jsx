import React, { useState } from "react";
import ImageUploader from "./image-uploader.component";
import ImageHolder from "./image-holder.component";
import CanvasDisplay from "./canvas-display.component";

const Workbench = () => {
  const [images, setImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const selectedImage =
    selectedImageIndex !== null ? images[selectedImageIndex] : null;

  return (
    <div className="flex">
      <ImageHolder
        images={images}
        setSelectedImageIndex={setSelectedImageIndex}
      />
      <CanvasDisplay selectedImage={selectedImage} />
      <ImageUploader setImages={setImages} />
    </div>
  );
};

export default Workbench;
