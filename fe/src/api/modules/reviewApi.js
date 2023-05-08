import privateClient from "../client/privateClient";

const reviewEndpoints = {
  list: "reviews",
  add: "reviews",
  remove: ({ reviewId }) => `reviews/${reviewId}`,
};

const reviewApi = {
  getList: async () => {
    try {
      const response = await privateClient.post(reviewEndpoints.list);

      return { response };
    } catch (error) {
      return { error };
    }
  },
  add: async ({ mediaId, mediaType, mediaTitle, mediaPoster, content }) => {
    try {
      const response = await privateClient.post(reviewEndpoints.add, {
        mediaId,
        mediaType,
        mediaTitle,
        mediaPoster,
        content,
      });

      return { response };
    } catch (error) {
      return { error };
    }
  },
  remove: async ({ reviewId }) => {
    try {
      const response = await privateClient.post(
        reviewEndpoints.remove({ reviewId })
      );

      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default reviewApi;
