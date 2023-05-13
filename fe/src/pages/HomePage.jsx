import React from "react";
import VideoSlide from "../components/common/VideoSlide";
import apiConfig from "../api/configs/apiConfig";

const HomePage = () => {
  return (
    <>
      <VideoSlide
        mediaType={apiConfig.mediaType.movie}
        mediaCategory={apiConfig.mediaCategory.popular}
      />
    </>
  );
};

export default HomePage;
