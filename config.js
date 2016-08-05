exports.db = {
  url: 'mongodb://127.0.0.1/',
  name: 'my-project',
  collection: 'users' // collection name for MongoDB
};
exports.login = {
  route: '/login',
  logoutRoute: '/logout',
  views: {
    login: './login.jade',
    loggedOut: 'templates/views/myLogoutSuccess.jade'
  }
};
exports.emailType = 'nodemailer-smtp-transport';
exports.emailSettings = {
  service: 'Mailgun',
  auth: {
    user: 'postmaster@username.mailgun.org',
    pass: 'secret-password'
  }
};
