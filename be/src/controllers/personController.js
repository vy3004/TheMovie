import api from "../api/api.js";

const getPersonDetail = async (req, res) => {
  try {
    const { personId } = req.params;

    const person = await api.personDetail({ personId });

    responseHandler.ok(res, person);
  } catch {
    responseHandler.error(res);
  }
};

const getPersonMedias = async (req, res) => {
  try {
    const { personId } = req.params;

    const medias = await api.personMedias({ personId });

    responseHandler.ok(res, medias);
  } catch {
    responseHandler.error(res);
  }
};

export default { getPersonDetail, getPersonMedias };
