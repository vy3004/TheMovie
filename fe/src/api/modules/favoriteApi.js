import privateClient from "../client/privateClient";

const favoriteEndpoints = {
  list: "user/favorites",
  add: "user/favorites",
  remove: ({ favoriteId }) => `user/favorites/${favoriteId}`,
};

const favoriteApi = {
  getList: async () => {
    try {
      const response = await privateClient.get(favoriteEndpoints.list);

      return { response };
    } catch (error) {
      return { error };
    }
  },
  add: async ({ mediaId, mediaTitle, mediaType, mediaPoster, mediaRate }) => {
    try {
      const response = await privateClient.post(favoriteEndpoints.add, {
        mediaId,
        mediaTitle,
        mediaType,
        mediaPoster,
        mediaRate,
      });

      return { response };
    } catch (error) {
      return { error };
    }
  },
  remove: async ({ favoriteId }) => {
    try {
      const response = await privateClient.delete(
        favoriteEndpoints.remove({ favoriteId })
      );

      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default favoriteApi;
