import { Typography, useTheme } from "@mui/material";
import React from "react";

const Logo = () => {
  const theme = useTheme();

  return (
    <Typography fontWeight="700" fontSize="1.7rem">
      The
      <span
        style={{
          color: theme.palette.primary.main,
        }}
      >
        Movie
      </span>
    </Typography>
  );
};

export default Logo;
