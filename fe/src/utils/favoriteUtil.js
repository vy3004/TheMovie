const favoriteUtil = {
  check: ({ listFavorites, mediaId }) =>
    listFavorites &&
    listFavorites.find((e) => e.mediaId.toString() === mediaId.toString()) !==
      undefined,
};

export default favoriteUtil;
