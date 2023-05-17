import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const Container = ({ header, children }) => {
  return (
    <Box
      sx={{
        position: "relative",
        marginTop: "4rem",
        marginX: "auto",
        color: "text.primary",
        "&::before": {
          content: '""',
          position: "absolute",
          borderRadius: "10px",
          transition: ".25s",
          left: { xs: "20px", md: "0" },
          top: "2rem",
          height: "5px",
          width: "0",
          backgroundColor: "primary.main",
        },
        "&:hover:before": {
          height: "5px",
          width: "150px",
          backgroundColor: "primary.main",
        },
      }}
    >
      <Stack spacing={4}>
        {header && (
          <Box
            sx={{
              position: "relative",
              paddingX: { xs: "20px", md: 0 },
              maxWidth: "1366px",
              marginX: "auto",
              width: "100%",
            }}
          >
            <Typography
              variant="h5"
              fontWeight="700"
              sx={{ cursor: "pointer" }}
            >
              {header}
            </Typography>
          </Box>
        )}
        {children}
      </Stack>
    </Box>
  );
};

export default Container;
