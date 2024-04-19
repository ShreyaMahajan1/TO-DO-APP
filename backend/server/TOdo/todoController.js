const ToDo = require('./todoModel');

const add = (req, res) => {
    var validationerrors = [];
    const userId = req.user.id; 
    if (!req.body.ToDoTitle)
        validationerrors.push("ToDo Title is required");

    if (validationerrors.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "Validation error",
            errors: validationerrors
        });
    }
    else {
        // Duplicate check
        ToDo.findOne({ ToDoTitle: req.body.ToDoTitle })
            .then(content => {
                if (!content) {
                    // Insert new ToDo
                    let ToDoObj = new ToDo();
                    ToDoObj.ToDoTitle = req.body.ToDoTitle;
                    ToDoObj.status = req.body.status || 'pending'; // Default status is 'pending'

                    ToDoObj.save()
                        .then(ToDoData => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Record Inserted",
                                data: ToDoData
                            });
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
                else {
                    res.json({
                        status: 422,
                        success: false,
                        message: "Record already exists",
                        data: content
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
}

const getall = async (req, res) => {
    var totalcount = await ToDo.find().countDocuments().exec();
    ToDo.find()
        .then(ToDoData => {
            res.json({
                status: 200,
                success: true,
                message: "Data loaded",
                total: totalcount,
                data: ToDoData
            });
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

const getpagination = (req, res) => {
    var lim = 2;
    var skipcount = 0;

    if (req.body.pageno > 1) {
        skipcount = (req.body.pageno - 1) * lim;
    }

    ToDo.find({ status: req.body.status }) // Filter by status
        .limit(lim)
        .skip(skipcount)
        .sort({ createdAt: +1 })
        .then(ToDoData => {
            res.json({
                status: 200,
                success: true,
                message: "Data loaded",
                data: ToDoData
            });
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

const getsingle = (req, res) => {
    validationerrors = [];

    if (!req.body._id)
        validationerrors.push("_id is required");

    if (validationerrors.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "Validation error",
            errors: validationerrors
        });
    } else {
        // Check existence of record
        ToDo.findOne({ _id: req.body._id })
            .then(ToDoData => {
                if (!ToDoData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Record not found"
                    });
                }
                else {
                    res.json({
                        status: 200,
                        success: true,
                        message: "Data loaded",
                        data: ToDoData
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
}

const deletedata = (req, res) => {
    validationerrors = [];

    if (!req.body._id)
        validationerrors.push("_id is required");

    if (validationerrors.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "Validation error",
            errors: validationerrors
        });
    } else {
        // Check existence of record
        ToDo.findOne({ _id: req.body._id })
            .then(ToDoData => {
                if (!ToDoData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Record not found"
                    });
                }
                else {
                    // Delete 
                    ToDo.deleteOne({ _id: req.body._id })
                        .then(() => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Record Deleted"
                            });
                        })
                        .catch(err => {
                            res.json({
                                status: 500,
                                success: false,
                                message: "Unable to delete record",
                                errors: err.message
                            });
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
}

const updatedata = (req, res) => {
    validationerrors = [];

    if (!req.body._id)
        validationerrors.push("_id is required");

    if (validationerrors.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "Validation error",
            errors: validationerrors
        });
    } else {
        // Check existence of record
        ToDo.findOne({ _id: req.body._id })
            .then(ToDoData => {
                if (!ToDoData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Record not found"
                    });
                }
                else {
                    // Update
                    if (req.body.ToDoTitle)
                        ToDoData.ToDoTitle = req.body.ToDoTitle;

                    ToDoData.save()
                        .then(saveRes => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Record Updated",
                                data: saveRes
                            });
                        })
                        .catch(err => {
                            res.json({
                                status: 500,
                                success: false,
                                message: "Internal Server error",
                                errors: err.message
                            });
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
}

const softdelete = (req, res) => {
    validationerrors = [];

    if (!req.body._id)
        validationerrors.push("_id is required");

    if (validationerrors.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "Validation error",
            errors: validationerrors
        });
    } else {
        // Find ToDo by ID
        ToDo.findOne({ _id: req.body._id })
            .then(ToDoData => {
                if (!ToDoData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Record not found"
                    });
                } else {
                    // Update status field
                    if (req.body.status)
                        ToDoData.status = req.body.status;

                    // Save updated ToDo
                    ToDoData.save()
                        .then(saveRes => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Record status updated successfully",
                                data: saveRes
                            });
                        })
                        .catch(err => {
                            res.json({
                                status: 500,
                                success: false,
                                message: "Internal Server error",
                                errors: err.message
                            });
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
}

module.exports = {
    add,
    getall,
    getpagination,
    getsingle,
    deletedata,
    updatedata,
    softdelete
};
