const jwt = () => {
    const secret = env.TokenSecret;
    console.log(secret);
    return expressJwt({ secret }).unless({
        path: [
            '/api/login',
            '/api/logout',
            '/login',
            '/api/signup',
            '/api/fast-signup',
            '/api/verifiedphone',
            '/api/user/reset',
            '/api/forgot-password',
            '/api/user/password',
            /^\/api\/user\/active\/.*/,
            /^\/api\/media\/download\/.*/,
            /^\/api\/3rd\/.*/,
            /^\/api\/metadata\/.*/,
            /^\/api\/verify-active-code\/.*/
        ]
    });
}
module.exports = jwt;