import React from "react";
import PosterBody from "../components/categoryPages/Poster/posterBody";

const poster = () => {
  const topView = () => {
    window.scrollTo({ top: 0 });
  };

  topView();

  return (
    <>
      <PosterBody />
    </>
  );
};

export default poster;
