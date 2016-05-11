var keystone = require('keystone'),
    User = keystone.List('User');

exports = module.exports = function(done) {
    new User.model({
        name: {
            first: 'Admin',
            last: 'User'
        },
        email: 'scaumiao@gmail.com',
        password: '633996',
        canAccessKeystone: true
    }).save(done);
};
