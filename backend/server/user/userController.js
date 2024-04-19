const User = require("./userModel");
const bcrypt = require("bcrypt");
const roundvalue = 10;
const jwt = require("jsonwebtoken");
const privatekey = "^MyProject@123";

const register = (req, res) => {
    const validationErrors = [];

    if (!req.body.name)
        validationErrors.push("Name is required");
    if (!req.body.email)
        validationErrors.push("Email is required");
    if (!req.body.password)
        validationErrors.push("Password is required");

    if (validationErrors.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "Validation error",
            errors: validationErrors
        });
    } else {
        User.findOne({ email: req.body.email })
            .then(userData => {
                if (!userData) {
                    const userObj = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, roundvalue),
                        userType: 1
                    });
                    userObj.save()
                        .then(userSaveRes => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "User registered successfully",
                                data: userSaveRes
                            });
                        })
                        .catch(err => {
                            res.json({
                                status: 500,
                                success: false,
                                message: "Internal server error while creating user",
                                errors: err.message
                            });
                        });
                } else {
                    res.json({
                        status: 422,
                        success: false,
                        message: "Email already registered"
                    });
                }
            })
            .catch(err => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal server error",
                    errors: err.message
                });
            });
    }
};

const login = (req, res) => {
    const validationErrors = [];

    if (!req.body.email)
        validationErrors.push("Email is required");
    if (!req.body.password)
        validationErrors.push("Password is required");

    if (validationErrors.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "Validation Errors",
            errors: validationErrors
        });
    } else {
        User.findOne({ email: req.body.email })
            .then(userData => {
                if (!userData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Email doesn't exist"
                    });
                } else {
                    bcrypt.compare(req.body.password, userData.password, function(err, result) {
                        if (result) {
                            const payload = {
                                name: userData.name,
                                email: userData.email,
                                userId: userData._id,
                                userType: userData.userType
                            };
                            const token = jwt.sign(payload, privatekey);

                            res.json({
                                status: 200,
                                success: true,
                                message: "Login Successful",
                                token: token,
                                data: userData
                            });
                        } else {
                            res.json({
                                status: 422,
                                success: false,
                                message: "Invalid password"
                            });
                        }
                    });
                }
            })
            .catch(err => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal Server Error",
                    errors: err.message
                });
            });
    }
};

module.exports = {
    register,
    login
};
