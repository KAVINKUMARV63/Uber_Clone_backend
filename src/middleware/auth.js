const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

const requireAuth = ClerkExpressRequireAuth({
  // Add custom configuration if needed
});

const optionalAuth = (req, res, next) => {
  // Optional auth middleware for routes that work with or without auth
  ClerkExpressRequireAuth({
    onError: () => next() // Continue without auth if token is invalid
  })(req, res, next);
};

module.exports = { requireAuth, optionalAuth };
