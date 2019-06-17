module.exports = {
    errorHandler: (res, obj) => {
        res.status(obj.code).json({
            success: false,
            message: obj.message
        });
    },
    successHandler: (res, data) => {
        res.json({
            success: true,
            data: data
        });
    },
    rawResponseHandler: (res, data) => {
        res.json(data);
    }
}
