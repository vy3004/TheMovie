import responseHandler from "../handlers/responseHandler.js";
import api from "../api/api.js";
import tokenMiddleware from "../middleware.js";
import userModel from "../models/userModel.js";
import favoriteModel from "../models/favoriteModel.js";
import reviewModel from "../models/reviewModel.js";

const getList = async (req, res) => {
  try {
    const { page } = req.query;
    const { mediaType, mediaCategory } = req.params;

    const response = await api.mediaList({ mediaType, mediaCategory, page });

    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const getGenres = async (req, res) => {
  try {
    const { mediaType } = req.params;

    const response = await api.mediaGenres({ mediaType });

    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const search = async (req, res) => {
  try {
    const { mediaType } = req.params;
    const { query, page } = req.query;

    const response = await api.mediaSearch({
      mediaType: mediaType === "people" ? "person" : mediaType,
      query,
      page,
    });

    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const getDetail = async (req, res) => {
  try {
    const { mediaType, mediaId } = req.params;
    const params = { mediaType, mediaId };

    const media = await api.mediaDetail(params);

    media.credits = await api.mediaCredits(params);
    media.videos = await api.mediaVideos(params);
    media.recommend = await api.mediaRecommend(params).result;
    media.images = await api.mediaImages(params);

    const tokenDecode = tokenMiddleware.tokenDecode(req);

    if (tokenDecode) {
      const user = await userModel.findById(tokenDecode.data);

      if (user) {
        const isFavorite = await favoriteModel.findOne({
          user: user.id,
          mediaId,
        });
        media.isFavorite = isFavorite !== null;
      }
    }

    media.reviews = await reviewModel
      .find({ mediaId })
      .populate("user")
      .sort("-createdAt");

    return responseHandler.ok(res, media);
  } catch {
    responseHandler.error(res);
  }
};

export default {
  getList,
  getGenres,
  search,
  getDetail,
};
