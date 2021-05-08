const login = require('./login');
const logout = require('./logout');
const upload = require('./upload');
const updateConfig = require('./update-config');
const dasheboardTable = require('./dasheboard-table');
const homeRoutes = require('./home-routes');
const userInfo = require('./user-info');

module.exports = [
    {
        url: '/admin/login',
        interface: login
    },
    {
        url: '/admin/logout',
        interface: logout
    },
    {
        url: '/admin/user_info',
        interface: userInfo
    },
    {
        url: '/admin/home_routes',
        interface: homeRoutes
    },
    {
        url: '/admin/dasheboard_table',
        interface: dasheboardTable
    },
    {
        url: '/admin/upload',
        interface: upload
    },
    {
        url: '/admin/update_config',
        interface: updateConfig
    },
];