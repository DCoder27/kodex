import { verifyToken } from "../utils/verifyToken.js";

const noteMiddleware = (req, res, next) => {
  // Get token from cookies
  const { token } = req.cookies;

  // If token is not present, return unauthorized error
  if (!token)
    return res.status(401).json({
      message: "Unauthorized Access",
    });

  const verifiedToken = verifyToken(token);
  req.user = verifiedToken;

  // Call the next controller
  next();
};
export default noteMiddleware;
