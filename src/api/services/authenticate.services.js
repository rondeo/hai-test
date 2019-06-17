const userModel = require('../models/user.models');
const authenticateModel = require('../models/authenticate.models');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const tokenSecret = require('../../../configs/env')[process.env.NODE_ENV].tokenSecret;
const expireTime = require('../../../configs/env')[process.env.NODE_ENV].expireTime;
const expireRefreshTime = require('../../../configs/env')[process.env.NODE_ENV].expireRefreshTime;
module.exports = {
    login: async (username, password) => {
        let user = null;
        if (username.indexOf("@") >= 0) {
            user = await userModel.getByCondition({ username: username, password: md5(password) });
        }
        else {
            user = await userModel.getByCondition({ username: username, password: md5(password) });
        }
        if (user !== null && user != undefined) {
            //create token
            const accessToken = jwt.sign({ id: user.id }, tokenSecret, { expiresIn: expireTime });
            const refreshToken = jwt.sign({ id: user.id }, accessToken, { expiresIn: expireRefreshTime });
            const authenticate = await authenticateModel.insert({
                AccessToken: accessToken,
                RefreshToken: refreshToken,
                Expire: expireTime,
                UserId: user.id
            });
            return {
                accessToken: accessToken,
                refreshToken: refreshToken,
                user: {
                    id: user.id,
                    type: user.type,
                    name: user.name,
                    mobile: user.mobile
                }
            }
        }
        return null;
    },
    register: async (username, password, fullName, mobile) => {
        const user = await userModel.getByCondition({ username: username });
        if (user !== null && user !== undefined) {
            return 400;
        }
        const newUser = await userModel.insert({
            username: username,
            password: md5(password),
            name: fullName,
            mobile: mobile
        });
        if (newUser !== undefined && newUser.length > 0) {
            return true;
        }
        return false;
    },
    verifyToken: async (token) => {
        const payload = jwt.verify(token, tokenSecret, (err, decode) => decode);
        if (payload) {
            const user = await userModel.findById(payload.id);
            return {
                valid: true,
                user: {
                    id: user.id,
                    type: user.type,
                    name: user.name,
                    mobile: user.mobile
                }
            };
        }
        return {
            valid: false
        };
    },
    getUserById: async (id) => {
        return await userModel.findById(id);
    },
    updateSocket: async (id, socket, isOnline) => {
        return await userModel.update(id, {
            socket: socket,
            isOnline: isOnline
        })
    },
    removeSocket: async (socket) => {
        return await userModel.removeSocket(socket);
    },
    getUser: async () => {
        return await userModel.getAll();
    }
}