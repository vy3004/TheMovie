import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, LinearProgress, Paper, Skeleton, Toolbar } from "@mui/material";
import uiConfig from "../../configs/uiConfig";
import AutoSwiper from "./AutoSwiper";
import { SwiperSlide } from "swiper/react";

const GlobalLoading = () => {
  const { globalLoading } = useSelector((state) => state.globalLoading);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (globalLoading) {
      setIsLoading(true);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [globalLoading]);

  return (
    <Paper
      sx={{
        opacity: isLoading ? 1 : 0,
        pointerEvents: "none",
        transition: "all .3s ease",
        position: "fixed",
        width: "100vw",
        height: "100vh",
        zIndex: 100,
      }}
    >
      <Toolbar />
      <LinearProgress />
      <Box sx={{ ...uiConfig.style.mainContent }}>
        <Skeleton variant="rounded" width="15vw" height={30} animation="wave" />
        <AutoSwiper>
          <SwiperSlide>
            <Skeleton variant="rounded" height="20rem" animation="wave" />
          </SwiperSlide>
          <SwiperSlide>
            <Skeleton variant="rounded" height="20rem" animation="wave" />
          </SwiperSlide>
          <SwiperSlide>
            <Skeleton variant="rounded" height="20rem" animation="wave" />
          </SwiperSlide>
          <SwiperSlide>
            <Skeleton variant="rounded" height="20rem" animation="wave" />
          </SwiperSlide>
          <SwiperSlide>
            <Skeleton variant="rounded" height="20rem" animation="wave" />
          </SwiperSlide>
        </AutoSwiper>
      </Box>
    </Paper>
  );
};

export default GlobalLoading;
