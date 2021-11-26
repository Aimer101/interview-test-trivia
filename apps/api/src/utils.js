import * as jwt from 'jsonwebtoken';

const hashed = 'finnoconsult';

export const checkBody = (req, res, next) => {
  if (req.body.name) {
    next();
  } else {
    return res.status(400).json('Name field cannot be empty');
  }
};

export const jwtSign = (userId) => {
  const accessToken = jwt.sign({ id: userId }, hashed);
  return accessToken;
};

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, hashed, (err, payload) => {
      if (err) {
        return res.status(403).json('Token is not valid');
      }
      req.user = payload;
      next();
    });
  } else {
    return res.status(401).json('You are not authenticated');
  }
};

export const checkScore = (req, res, next) => {
  const score = req.body.newScore;
  if (!score && typeof score !== 'number') {
    return res.status(400).json('Please specify the new score');
  } else {
    next();
  }
};
