const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

exports.verifyAdmin = (req, res, next) => {
  exports.verifyToken(req, res, () => {
    if (req.user.isAdmin) next();
    else res.status(403).json({ message: 'Admin access only' });
  });
};
