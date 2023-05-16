import { Box } from "@mui/material";
import React from "react";
import { Swiper } from "swiper/react";

const AutoSwiper = ({ children }) => {
  return (
    <Box
      sx={{
        "& .swiper-slide": {
          width: {
            xs: "48%",
            sm: "32%",
            md: "24%",
            lg: "19.2%",
          },
        },
      }}
    >
      <Swiper
        slidesPerView="auto"
        grabCursor={true}
        spaceBetween={"1%"}
        style={{
          width: "100%",
          height: "max-content",
          borderRadius: "10px",
          padding: "8px 2px",
        }}
      >
        {children}
      </Swiper>
    </Box>
  );
};

export default AutoSwiper;
