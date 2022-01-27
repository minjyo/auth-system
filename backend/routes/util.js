const successRes = (res, code, message, data) => {
    res.status(200).json({
        code: code,
        message: message,
        data: data,
    });
};

const failureRes = (res, code, message, description) => {
    res.status(200).json({
        code: code,
        message: message,
        description: description,
    });
};

module.exports = successRes;
module.exports = failureRes;
