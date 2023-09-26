import jwt from "jsonwebtoken";

export const createAccessToken = userId => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });
};

export const verifyAccessToken = token => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};
