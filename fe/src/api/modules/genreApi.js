import publicClient from "../client/publicClient";

const genrePoints = {
  list: ({ mediaType }) => `${mediaType}/genres`,
};

const genreApi = {
  list: async ({ mediaType }) => {
    try {
      const response = await publicClient.get(genrePoints.list({ mediaType }));

      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default genreApi;
