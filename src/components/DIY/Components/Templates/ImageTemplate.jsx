import React from "react";
import "./Templates.css";

const ImageTemplate = ({ img, imgData }) => {
  const allImg = img.img;
  const imgId = img.id;
  let temp = false;
  return (
    <div className="col-6 pr-0 pl-0">
      <div className="image-template ml-3 mr-0  pr-0">
        <div>
          <a style={{ cursor: "pointer" }} onClick={() => imgData(imgId)}>
            <img width="123px" height="123px" src={allImg} alt="" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ImageTemplate;
