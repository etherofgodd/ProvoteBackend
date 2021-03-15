import jwt from "jsonwebtoken";

const generateToken = (id, nin) => {
  return jwt.sign(
    {
      id,
      nin,
    },
    process.env.JWT_PRIVATE_KEY,
    {
      expiresIn: "30d",
    }
  );
};

export default generateToken;
