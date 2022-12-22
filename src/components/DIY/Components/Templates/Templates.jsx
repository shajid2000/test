import React from "react";
import FakeData from "../../FakeData/FakeData";
import ImageTemplate from "./ImageTemplate";
import "./Templates.css";

const Templates = ({ imgData }) => {
  return (
    <div id="scrollDemo" style={{marginRight:"0px"}}>
      <div className="templete-div">
        <h4 className="pictograms-h4">Templates</h4>
      </div>
      <div className="image-map-container scrollbar">
        <div className="row" style={{marginRight:"4px", width:'330px'}}>
          {FakeData.map((img, index) => (
            <ImageTemplate key={index} img={img} imgData={imgData} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Templates;
