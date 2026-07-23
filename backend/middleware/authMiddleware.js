import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  // 1. Get the token from cookies or Authorization header
  let token = req.cookies.token;
  if (!token) {
    const authHeader = req.headers['authorization'];
    token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  }

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  // 2. Verify the token using your secret
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    
    // 3. Attach the user info to the request object
    req.user = user; 
    next(); // Pass control to the next function
  });
};