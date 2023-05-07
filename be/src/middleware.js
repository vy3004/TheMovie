import jsonwebtoken from "jsonwebtoken";
import responseHandler from "./handlers/responseHandler";
import userModel from "./models/userModel";

const tokenDecode = (req) => {
  try {
    const bearerHeader = req.headers["authorization"];

    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];

      return jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
    }

    return false;
  } catch {
    return false;
  }
};

const auth = async (req, res, next) => {
  const tokenDecode = tokenDecode(req);

  if (!tokenDecode) return responseHandler.unauthorized(res);

  const user = await userModel.findById(tokenDecode.data);

  if (!user) return responseHandler.unauthorized(res);

  req.user = user;

  next();
};

export default { auth, tokenDecode };
