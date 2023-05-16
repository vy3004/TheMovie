import React, { useEffect, useState } from "react";
import mediaApi from "../../api/modules/mediaApi";
import { toast } from "react-toastify";
import AutoSwiper from "./AutoSwiper";
import MediaItem from "./MediaItem";
import { SwiperSlide } from "swiper/react";
import genreApi from "../../api/modules/genreApi";

const MediaSlide = ({ mediaType, mediaCategory }) => {
  const [medias, setMedias] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getMedias = async () => {
      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 2,
      });

      if (response) setMedias(response.results);
      if (err) toast.error(err.message);
    };

    getMedias();

    const getGenres = async () => {
      const { response, err } = await genreApi.getList({ mediaType });

      if (response) setGenres(response.genres);
      if (err) toast.error(err.message);
    };

    getGenres();
  }, [mediaType, mediaCategory]);

  return (
    <AutoSwiper>
      {medias.map((media, index) => (
        <SwiperSlide key={index}>
          <MediaItem media={media} mediaType={mediaType} genres={genres} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default MediaSlide;
