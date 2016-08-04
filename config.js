exports.db = {
  url: 'mongodb://127.0.0.1/',
  name: 'my-project',
  collection: 'registers' // collection name for MongoDB
};
exports.login = {
  route: '/login',
  logoutRoute: '/logout',
  views: {
    login: './login.jade',
    loggedOut: 'templates/views/myLogoutSuccess.jade'
  }
};
