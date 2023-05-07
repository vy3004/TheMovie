import axiosConfig from "../axios";
import apiEndpoints from "./endpoint";

const api = {
  mediaList: async ({ mediaType, mediaCategory, page }) =>
    axiosConfig.get(apiEndpoints.mediaList({ mediaType, mediaCategory, page })),

  mediaDetail: async ({ mediaType, mediaId }) =>
    await axiosConfig.get(apiEndpoints.mediaDetail({ mediaType, mediaId })),

  mediaGenres: async ({ mediaType }) =>
    await axiosConfig.get(apiEndpoints.mediaGenres({ mediaType })),

  mediaCredits: async ({ mediaType, mediaId }) =>
    await axiosConfig.get(apiEndpoints.mediaCredits({ mediaType, mediaId })),

  mediaVideos: async ({ mediaType, mediaId }) =>
    await axiosConfig.get(apiEndpoints.mediaVideos({ mediaType, mediaId })),

  mediaImages: async ({ mediaType, mediaId }) =>
    await axiosConfig.get(apiEndpoints.mediaImages({ mediaType, mediaId })),

  mediaRecommend: async ({ mediaType, mediaId }) =>
    await axiosConfig.get(apiEndpoints.mediaRecommend({ mediaType, mediaId })),

  mediaSearch: async ({ mediaType, query, page }) =>
    await axiosConfig.get(apiEndpoints.mediaSearch({ mediaType, query, page })),

  personDetail: async ({ personId }) =>
    await axiosConfig.get(apiEndpoints.personDetail({ personId })),

  personMedias: async ({ personId }) =>
    await axiosConfig.get(apiEndpoints.personMedias({ personId })),
};

export default api;
