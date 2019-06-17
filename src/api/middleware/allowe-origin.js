const allowOrigin = require('../../../configs/allow-origin');
const { errorHandler } = require('../middleware/response-handlers');
const env = process.env.NODE_ENV

module.exports = (req, res, next) => {
    let origin = req.headers.origin;
    // console.log(allowOrigin[env], allowOrigin[env][origin]);
    // if (allowOrigin[env][origin] === null || allowOrigin[env][origin] === undefined || allowOrigin[env][origin].allow === false) {
    //     return res.status(403).send(`${origin} is refused permission to access oryton accounts`);
    // }
    next();
}
