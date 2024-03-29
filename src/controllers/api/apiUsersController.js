const path = require("path");
const db = require('../../database/models');

const User = db.User;

const apiUsersController = {
    async getUsers(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 10;
            const offset = parseInt(req.query.offset) || 0;
    
            const users = await User.findAndCountAll({ limit, offset });
            const userList = users.rows.map(user => ({
                detail: `/api/users/${user.username}`,
                id: user.id,
                username: user.username,
                name: user.name,
                email: user.email,
            }));
    
            const totalPages = Math.ceil(users.count / limit);
    
            let nextUrl = null;
            let prevUrl = null;
            if (offset + limit < users.count) {
                nextUrl = `/api/users?limit=${limit}&offset=${offset + limit}`;
            }
            if (offset - limit >= 0) {
                prevUrl = `/api/users?limit=${limit}&offset=${offset - limit}`;
            }
    
            const response = {
                count: userList.length,
                users: userList,
                next: nextUrl,
                previous: prevUrl,
                totalPages: totalPages,
                contactanos: "https://huellitas.com/contact"
            };
    
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(response, null, 2));
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    

    async getUserByUsername(req, res) {
        try {
            const username = req.params.username;
            const user = await User.findOne({ where: { username: username } });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            const userDetail = {
                detail: `/api/users/${user.id}`,
                username: user.username,
                name: user.name,
                email: user.email,
                avatar: user.avatar ? `../public/img/avatars/${user.avatar}` : null
            };
            
            res.json(userDetail);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

module.exports = apiUsersController;
