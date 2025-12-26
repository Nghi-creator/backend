import authService from '../services/auth.js';

export default async function (req, res, next) {
  const authorization = req.header('Authorization');
  const token = authorization?.replace('Bearer ', '');
  if (token) {
    const result = await authService.validateToken(token);
    if (!result) {
      return res.status(401).json({
        message: 'Invalid token',
      });
    }
    req.currentUser = result;
  }
  next();
}