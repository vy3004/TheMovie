import { Box, IconButton, Stack, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CircularRate from "./CircularRate";
import apiConfig from "../../api/configs/apiConfig";
import { useSelector } from "react-redux";
import uiConfig from "../../configs/uiConfig";
import { routesGen } from "../../routes/routes";
import favoriteUtil from "../../utils/favoriteUtil";

const MediaItem = ({ media, mediaType, genres }) => {
  const { listFavorites } = useSelector((state) => state.user);

  const [posterPath, setPosterPath] = useState("");
  const [releaseDate, setReleaseDate] = useState(null);
  const [rate, setRate] = useState(null);

  useEffect(() => {
    setPosterPath(
      apiConfig.posterPath(
        media.poster_path ||
          media.backdrop_path ||
          media.mediaPoster ||
          media.profile_path
      )
    );

    if (mediaType === apiConfig.mediaType.movie) {
      setReleaseDate(media.release_date && media.release_date.split("-")[0]);
    } else {
      setReleaseDate(
        media.first_air_date && media.first_air_date.split("-")[0]
      );
    }

    setRate(media.vote_average || media.mediaRate);
  }, [media, mediaType]);

  return (
    <Link
      to={
        mediaType !== "people"
          ? routesGen.mediaDetail(mediaType, media.mediaId || media.id)
          : routesGen.person(media.id)
      }
    >
      <Box
        sx={{
          ...uiConfig.style.backgroundImage(posterPath),
          paddingTop: "160%",
          "&:hover": { transform: "scale(1.04)", zIndex: 999 },
          "&:hover .media-info": { opacity: 1, bottom: 0 },
          "&:hover .media-back-drop, &:hover .media-play-btn": { opacity: 1 },
          WebkitUserDrag: "none",
          KhtmlUserDrag: "none",
          MozUserDrag: "none",
          OUserDrag: "none",
          UserDrag: "none",
          color: "primary.contrastText",
          borderRadius: "10px",
          boxShadow:
            "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
        }}
      >
        {mediaType !== "people" && (
          <>
            {favoriteUtil.check({ listFavorites, mediaId: media.id }) && (
              <FavoriteIcon
                color="primary"
                sx={{
                  position: "absolute",
                  top: 2,
                  right: 2,
                  fontSize: "2rem",
                }}
              />
            )}
            <Box
              className="media-back-drop"
              sx={{
                opacity: { xs: 1, md: 0 },
                transition: "all 0.3s ease",
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                borderRadius: "10px",
                backgroundImage:
                  "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))",
              }}
            />
            <IconButton
              className="media-play-btn"
              sx={{
                opacity: 0,
                transition: "all 0.3s ease",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
              }}
            >
              <PlayCircleOutlineRoundedIcon sx={{ fontSize: "5rem" }} />
            </IconButton>
            <Box
              className="media-info"
              sx={{
                transition: "all 0.3s ease",
                opacity: { xs: 1, md: 0 },
                position: "absolute",
                bottom: { xs: 0, md: "-20px" },
                width: "100%",
                height: "max-content",
                boxSizing: "border-box",
                padding: { xs: "10px", md: "2rem 1rem" },
                WebkitUserSelect: "none",
                MsUserSelect: "none",
                UserSelect: "none",
              }}
            >
              <Stack spacing={{ xs: 1, md: 2 }}>
                {rate && <CircularRate value={rate} />}

                <Typography>{releaseDate}</Typography>

                <Typography sx={{ fontStyle: "italic" }}>
                  {[...media.genre_ids]
                    .splice(0, 2)
                    .map(
                      (genreId) =>
                        genres.find((e) => e.id === genreId) &&
                        genres.find((e) => e.id === genreId).name
                    )
                    .join(" ● ")}
                </Typography>
              </Stack>
            </Box>
          </>
        )}

        {mediaType === "people" && (
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "max-content",
              bottom: 0,
              padding: "10px",
              backgroundColor: "rgba(0,0,0,0.6)",
            }}
          >
            <Typography sx={{ ...uiConfig.style.typoLines(1, "left") }}>
              {media.name}
            </Typography>
          </Box>
        )}
      </Box>
    </Link>
  );
};

export default MediaItem;
