var authorize = function(req, res, next) {
    console.log('<><><><>', req.user.identity.isAuthenticated);
    next();
    return;
  if (req.user && req.user.identity.isAuthenticated) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/account/login');
    console.log('User not logged');
  }
};

module.exports = authorize;