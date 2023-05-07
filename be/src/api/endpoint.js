import apiConfig from "./config";

const apiEndpoints = {
  mediaList: ({ mediaType, mediaCategory, page }) =>
    apiConfig.getUrl(`${mediaType}/${mediaCategory}`, page),

  mediaDetail: ({ mediaType, mediaId }) =>
    apiConfig.getUrl(`${mediaType}/${mediaId}`),

  mediaGenres: ({ mediaType }) => apiConfig.getUrl(`${mediaType}/list`),

  mediaCredits: ({ mediaType, mediaId }) =>
    apiConfig.getUrl(`${mediaType}/${mediaId}/credits`),

  mediaVideos: ({ mediaType, mediaId }) =>
    apiConfig.getUrl(`${mediaType}/${mediaId}/videos`),

  mediaRecommend: ({ mediaType, mediaId }) =>
    apiConfig.getUrl(`${mediaType}/${mediaId}/recommendations`),

  mediaImages: ({ mediaType, mediaId }) =>
    apiConfig.getUrl(`${mediaType}/${mediaId}/images`),

  mediaSearch: ({ mediaType, query, page }) =>
    apiConfig.getUrl(`search/${mediaType}`, { query, page }),

  personDetail: ({ personId }) => apiConfig.getUrl(`person/${personId}`),

  personMedias: ({ personId }) =>
    apiConfig.getUrl(`person/${personId}/combined_credits`),
};

export default apiEndpoints;
