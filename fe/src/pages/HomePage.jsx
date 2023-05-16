import React from "react";
import VideoSlide from "../components/common/VideoSlide";
import apiConfig from "../api/configs/apiConfig";
import { Box } from "@mui/material";
import uiConfig from "../configs/uiConfig";
import Container from "../components/common/Container";
import MediaSlide from "../components/common/MediaSlide";

const HomePage = () => {
  return (
    <>
      <VideoSlide
        mediaType={apiConfig.mediaType.movie}
        mediaCategory={apiConfig.mediaCategory.popular}
      />

      <Box marginTop="-4rem" sx={{ ...uiConfig.style.mainContent }}>
        <Container header="Popular movies">
          <MediaSlide
            mediaType={apiConfig.mediaType.movie}
            mediaCategory={apiConfig.mediaCategory.popular}
          />
        </Container>
      </Box>

      <Box marginTop="-4rem" sx={{ ...uiConfig.style.mainContent }}>
        <Container header="Popular series">
          <MediaSlide
            mediaType={apiConfig.mediaType.tv}
            mediaCategory={apiConfig.mediaCategory.popular}
          />
        </Container>
      </Box>

      <Box marginTop="-4rem" sx={{ ...uiConfig.style.mainContent }}>
        <Container header="Top rated movies">
          <MediaSlide
            mediaType={apiConfig.mediaType.movie}
            mediaCategory={apiConfig.mediaCategory.top_rated}
          />
        </Container>
      </Box>

      <Box marginTop="-4rem" sx={{ ...uiConfig.style.mainContent }}>
        <Container header="Top rated series">
          <MediaSlide
            mediaType={apiConfig.mediaType.tv}
            mediaCategory={apiConfig.mediaCategory.top_rated}
          />
        </Container>
      </Box>
    </>
  );
};

export default HomePage;
