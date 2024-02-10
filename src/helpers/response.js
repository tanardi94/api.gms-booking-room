'use strict'


exports.ok = function(values, res) {
    var data = {
        success: true,
        code: 200,
        message: 'Request is processed successfully',
        errors: [],
        values: values
    };
    return res.json(data).end();
};

exports.customResponse = (message, status, code, errors, values, res) => {
    var data = {
        success: status,
        code: code,
        message: message,
        errors: errors,
        values: values
    };
    return res.json(data).end();
}

exports.failure = function(message, res) {
    var data = {
        success: false,
        code: 400,
        message: message,
        errors: [],
        values: []
    };
    return res.json(data).end();
};

exports.notFound = function(message, res) {
    var data = {
        success: false,
        code: 404,
        message: message + " is not found",
        errors: [],
        values: []
    };
    return res.json(data).end();
};

exports.created = function(message, data = [], res) {
    var data = {
        success: true,
        code: 201,
        message: message + " is successfully created",
        errors: [],
        values: data
    };
    return res.json(data).end();
}

exports.invalidParameter = function(errors, res) {
    var data = {
        success: false,
        code: 422,
        message: "Something wrong with your request",
        errors: errors,
        values: []
    };
    return res.json(data).end();
}

exports.forbidden = function(res) {
    var data = {
        success: false,
        code: 403,
        message: "You have no access for this service",
        errors: [],
        values: []
    };

    return res.json(data).end();
}

exports.unauthenticated = function(res) {
    var data = {
        success: false,
        code: 401,
        message: "You are not logged in",
        errors: [],
        values: []
    };

    return res.json(data).end();
}