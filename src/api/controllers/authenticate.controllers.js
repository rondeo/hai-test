const authenticateServices = require('../services/authenticate.services');
const { errorHandler, successHandler } = require('../middleware/response-handlers');
const env = require('../../../configs/env')[process.env.NODE_ENV];
var CryptoJS = require("crypto-js");

module.exports = {
    login: async (req, res, next) => {
        try {
            console.log("============================LOGIN CONTROLLER=============================");
            const { username, password } = req.body;
            const user = await authenticateServices.login(username, password);
            console.log("user", user);
            if (user !== null) {
                Object.assign(req.session, user);
                var session = CryptoJS.AES.encrypt(req.sessionID, env.tokenSecret);
                user.session = session.toString();
                console.log(user);
                return successHandler(res, user);
            }
            return errorHandler(res, {
                code: 400,
                message: "username or password is invalid"
            });
        }
        catch (e) {
            console.log(e);
            return errorHandler(res, {
                code: 500,
                message: "an error occured, please try again"
            });
        }
    },
    register: async (req, res, next) => {
        try {
            console.log("============================REGISTER CONTROLLER=============================");
            const { username, password, fullName, mobile } = req.body;
            const registerResponse = await authenticateServices.register(username, password, fullName, mobile);

            if (registerResponse === 400) {
                return errorHandler(res, {
                    code: 400,
                    message: "username has been existed"
                });
            }
            else if (registerResponse === false) {
                return errorHandler(res, {
                    code: 400,
                    message: "register fail. please check your info"
                });
            }
            return successHandler(res);
        }
        catch (e) {
            console.log(e);
            return errorHandler(res, {
                code: 500,
                message: "an error occured, please try again"
            });
        }
    },
    update: async (req, res, next) => {
        try {
            const { password, fullName, mobile, id } = req.body;
            const user = await authenticateServices.getUserById(req.session.user.id);
            if (user.type === 1 && id !== undefined) {
                const update = await authenticateServices.updateUser(id, password, fullName, mobile);
            }
            else {
                const update = await authenticateServices.updateUser(req.session.user.id, password, fullName, mobile);
            }
            return successHandler(res);
            
        }
        catch (e) {
            console.log(e);
            return errorHandler(res, {
                code: 500,
                message: "an error occured, please try again"
            });
        }
    },
    /**
     * 
     * @api {POST} /accounts/service login
     * @apiName Login
     * @apiGroup accounts
     * @apiVersion 0.0.1
     * 
     * 
     * @apiParam  {String} username email or username
     * @apiParam  {String} password password of account
     * 
     * @apiSuccess (200) {String} accessToken access token of the request
     * @apiSuccess (200) {String} refreshToken token used to refresh accessToken without login
     * @apiSuccess (200) {Object} user user information
     * 
     * @apiParamExample  {Object} Request-Example:
     * {
     *     "username": "hainguyen",
     *     "password": "123456123"
     * }
     * 
     * 
     * @apiSuccessExample {Object} Success-Response:
     * {
     *     "accessToken" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTU1MzU1MTA5LCJleHAiOjE1NjA1MzkxMDl9.vC1KbvELzMSUPfty84rYTOvSVFm_AeGZ13TQzH-u5z4",
     *     "refreshToken" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTU1MzU1MTA5LCJleHAiOjE1NjU3MjMxMDl9.JaF2eJAbWJCAl8jBxui_XLE37lDJrbNfhdc2b3UKf1s",
     *     "user":{
     *          "id": 1,
     *          "status": 1,
     *          "role": 2,
     *          "firstName": "Hai",
     *          "lastName": "Nguyen",
     *          "email": "nnhaigl3@gmail.com",
     *          "mobile": "0355940565"
     *      }
     * }
     * 
     * 
     * @apiErrorExample Server-Error:
     * HTTP/1.1 500 Internal Server Error
     * {
     *      "success": "false",
     *      "message" : "an error occured, please try again",
     * }
     * 
     * @apiErrorExample Invalid-Credential:
     * HTTP/1.1 400 Bad Request
     * {
     *      "success": "false",
     *      "message" : "username or password is invalid",
     * }
     * 
     * 
     */
    externalLogin: async (req, res, next) => {
        try {
            const { username, password } = req.body;
            const user = await authenticateServices.login(username, password);
            if (user !== null) {
                return successHandler(res, user);
            }
            return errorHandler(res, {
                code: 400,
                message: "username or password is invalid"
            });
        }
        catch (e) {
            console.log(e);
            return errorHandler(res, {
                code: 500,
                message: "an error occured, please try again"
            });
        }
    },
    /**
     * 
     * @api {GET} /accounts/verify verify-token
     * @apiName VerifyToken
     * @apiGroup accounts
     * @apiVersion 0.0.1
     * 
     * 
     * @apiHeader {String} Authorization user jwt token
     * 
     * @apiSuccess (200) {Boolean} valid token verify result
     * @apiSuccess (200) {Object} user user information
     * 
     * @apiHeaderExample   {Object} Request-Example:
     * {
     *     "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTU1MzU5NjA0LCJleHAiOjE1NTUzNTk2MDV9.t17y0Mgr_9a7KDI9ra6UEok8y5sgG7EdBagQjyBU8rM"
     * }
     * 
     * 
     * @apiSuccessExample {Object} Success-Response:
     * {
     *     "valid" : "true",
     *      "user":{
     *          "id": 1,
     *          "status": 1,
     *          "role": 2,
     *          "firstName": "Hai",
     *          "lastName": "Nguyen",
     *          "email": "nnhaigl3@gmail.com",
     *          "mobile": "0355940565"
     *      }
     * }
     * 
     * 
     * @apiErrorExample Server-Error:
     * HTTP/1.1 500 Internal Server Error
     * {
     *      "success": "false",
     *      "message" : "an error occured, please try again",
     * }
     * 
     */
    verifyToken: async (req, res, next) => {
        try {
            const token = req.headers.authorization.replace("Bearer ", "");
            const isValid = await authenticateServices.verifyToken(token);
            return successHandler(res, isValid);
        }
        catch (e) {
            console.log(e);
            return errorHandler(res, {
                code: 500,
                message: "an error occured, please try again"
            });
        }
    },

    /**
     * 
     * @api {PUT} /accounts/reset-token reset-token
     * @apiName ResetToken
     * @apiGroup accounts
     * @apiVersion 0.0.1
     * 
     * 
     * @apiHeader {String} Authorization user jwt token
     * @apiParam {String} refreshToken refresh token
     * 
     * @apiSuccess (200) {String} accessToken access token
     * @apiSuccess (200) {String} refreshToken refresh token
     * 
     * @apiParamExample  {Object} Request-Example:
     * {
     *     "refreshToken" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTU1MzU1MTA5LCJleHAiOjE1NjA1MzkxMDl9.vC1KbvELzMSUPfty84rYTOvSVFm_AeGZ13TQzH-u5z4",
     * }
     * 
     * @apiHeaderExample   {Object} Request-Example:
     * {
     *     "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTU1MzU5NjA0LCJleHAiOjE1NTUzNTk2MDV9.t17y0Mgr_9a7KDI9ra6UEok8y5sgG7EdBagQjyBU8rM"
     * }
     * 
     * @apiSuccessExample {Object} Success-Response:
     * {
     *     "accessToken" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTU1MzU1MTA5LCJleHAiOjE1NjA1MzkxMDl9.vC1KbvELzMSUPfty84rYTOvSVFm_AeGZ13TQzH-u5z4",
     *     "refreshToken" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTU1MzU1MTA5LCJleHAiOjE1NjU3MjMxMDl9.JaF2eJAbWJCAl8jBxui_XLE37lDJrbNfhdc2b3UKf1s",
     * }
     * 
     * 
     * @apiErrorExample Server-Error:
     * HTTP/1.1 500 Internal Server Error
     * {
     *      "success": "false",
     *      "message" : "an error occured, please try again",
     * }
     * 
     */
    resetToken: async (req, res, next) => {
        try {
            const { refreshToken } = req.body;
            const token = req.headers.authorization.replace("Bearer ", "");
            const valid = await authenticateServices.verifyToken(token);
            if (valid === false) {
                return errorHandler(res, { code: 403 });
            }
            const result = await authenticateServices.refreshToken(token, refreshToken);
            return successHandler(res, result);
        }
        catch (e) {
            console.log(e);
            return errorHandler(res, {
                code: 500,
                message: "an error occured, please try again"
            });
        }
    },

    verifySession: async (req, res) => {
        try {
            if (req.session.user !== null && req.session.user != undefined) {
                const user = await authenticateServices.getUserById(req.session.user.id);
                return successHandler(res, user);
            }
            return errorHandler(res, { code: 404 });
        }
        catch (e) {
            console.log(e);
            return errorHandler(res, {
                code: 500,
                message: "an error occured, please try again"
            });
        }
    },
    updateSocket: async (req, res) => {
        try {
            if (req.session.user !== null && req.session.user != undefined) {
                await authenticateServices.updateSocket(req.session.user.id, req.body.socket, true);
                return successHandler(res);
            }
            return errorHandler(res, { code: 404 });
        }
        catch (e) {
            console.log("++++++++++++++++++++++++++++++++++", e);
            return errorHandler(res, {
                code: 500,
                message: "an error occured, please try again"
            });
        }
    },
    getAll: async (req, res) => {
        try {
            if (req.session.user !== null && req.session.user != undefined) {
                const users = await authenticateServices.getUser();
                return successHandler(res, users);
            }
            return errorHandler(res, { code: 404 });
        }
        catch (e) {
            return errorHandler(res, {
                code: 500,
                message: "an error occured, please try again"
            });
        }
    }
}
