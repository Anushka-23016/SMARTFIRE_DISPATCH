function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];

  if (token !== 'SMARTFIRE_DISPATCH_KEY') {
    return res.status(401).json({ error: 'Unauthorized access' });
  }

  next();
}

module.exports = authMiddleware;
