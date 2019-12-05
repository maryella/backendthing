const jwt = require("jsonwebtoken");
//change secret
const secret = "secret";

const withAuth = function(req, res, next) {
  const token = req.cookies.token;
  console.log("token", req.cookies);
  if (!token) {
    res.status(401).send("Unauthorized: No token provided");
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).send("Unauthorized: Invalid token");
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
};

module.exports = withAuth;
