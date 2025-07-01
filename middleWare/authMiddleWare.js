var jwt = require("jsonwebtoken");
//localhost:7878/api/v1/auth/user
async function authMiddleWare(req, res, next) {
  let { token } = req.cookies;
  jwt.verify(token, process.env.JWT_TOKEN, function (err, decoded) {
    if (err) {
      res.send(err);
    } else {
      if (decoded.userInfo.role == "admin") {
        next();
      } else {
        res.status(402).send({ msg: "Access denied" });
      }
    }
  });
}
module.exports = authMiddleWare;
