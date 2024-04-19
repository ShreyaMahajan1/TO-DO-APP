const ToDo =require('./todoModel')

add = (req, res) => {
    var validationerrors = []

    if (!req.body.ToDoTitle)
        validationerrors.push("ToDo Title is required")

    if (validationerrors.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "Validation error",
            errors: validationerrors
        })
    }
    else {
        //duplicate
        ToDo.findOne({ ToDoTitle: req.body.ToDoTitle })
            .then(content => {
                // console.log(content)
                if (!content) {

                    //insert
                    let ToDoObj = new ToDo()
                    ToDoObj.ToDoTitle = req.body.ToDoTitle


                    ToDoObj.save()
                        .then(ToDoData => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Record Inserted",
                                data: ToDoData
                            })
                        })
                        .catch(err => {
                            res.json({
                                status: 500,
                                success: false,
                                message: "Internal Server Error",
                                errors: err.message
                            })
                        })
                }
                else {
                    res.json({
                        status: 422,
                        success: false,
                        message: "Record already exists",
                        data: content
                    })
                }

            })
            .catch(err => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal Server Error",
                    errors: err.message
                })
            })

    }


}
getall = async (req, res) => {

    var totalcount = await ToDo.find().countDocuments().exec()

    ToDo.find()
        .then(ToDoData => {
            res.json({
                status: 200,
                success: true,
                message: "Data loaded",
                total: totalcount,
                data: ToDoData
            })
        })
        .catch(err => {
            res.json({
                status: 500,
                success: false,
                message: "Internal Server Error",
                errors: err.message
            })
        })
}
getpagination = (req, res) => {
    var lim = 2
    var skipcount = 0

    if (req.body.pageno > 1) {
        skipcount = (req.body.pageno - 1) * lim
    }

    ToDo.find()
        .limit(lim)
        .skip(skipcount)
        .sort({ createdAt: +1 })
        .then(ToDoData => {
            res.json({
                status: 200,
                success: true,
                message: "Data loaded",
                data: ToDoData
            })
        })
        .catch(err => {
            res.json({
                status: 500,
                success: false,
                message: "Internal Server Error",
                errors: err.message
            })
        })
}

getsingle = (req, res) => {
    validationerrors = []

    if (!req.body._id)
        validationerrors.push("_id is required")

    if (validationerrors.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "Validation error",
            errors: validationerrors
        })
    } else {
        //existance of record
        ToDo.findOne({ _id: req.body._id })
            .then(ToDoData => {
                if (!ToDoData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Record not found"
                    })
                }
                else {
                    res.json({
                        status: 200,
                        success: true,
                        message: "Data loaded",
                        data: ToDoData
                    })
                }
            })
            .catch(err => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal Server Error",
                    errors: err.message
                })
            })
    }
}

deletedata = (req, res) => {
    validationerrors = []

    if (!req.body._id)
        validationerrors.push("_id is required")

    if (validationerrors.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "Validation error",
            errors: validationerrors
        })
    } else {
        //existance of record
        ToDo.findOne({ _id: req.body._id })
            .then(ToDoData => {
                if (!ToDoData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Record not found"
                    })
                }
                else {
                    //delete 
                    ToDo.deleteOne({ _id: req.body._id })
                        .then(() => {

                            res.json({
                                status: 200,
                                success: true,
                                message: "Record Deleted"
                            })
                        })
                        .catch(err => {
                            res.json({
                                status: 500,
                                success: false,
                                message: "Unable to delete record",
                                errors: err.message
                            })
                        })
                }
            })
            .catch(err => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal Server Error",
                    errors: err.message
                })
            })
    }
}
updatedata = (req, res) => {
    validationerrors = []

    if (!req.body._id)
        validationerrors.push("_id is required")

    if (validationerrors.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "Validation error",
            errors: validationerrors
        })
    } else {
        //existance of record
        ToDo.findOne({ _id: req.body._id })
            .then(ToDoData => {
                if (!ToDoData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Record not found"
                    })
                }
                else {
                    //update

                    if (req.body.ToDoTitle)
                        ToDoData.ToDoTitle = req.body.ToDoTitle

                    ToDoData.save()
                        .then(saveRes => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Record Updated",
                                data: saveRes
                            })
                        })
                        .catch(err => {
                            res.json({
                                status: 500,
                                success: false,
                                message: "Internal Server error",
                                errors: err.message
                            })
                        })
                }
            })
            .catch(err => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal Server Error",
                    errors: err.message
                })
            })
    }
}

softdelete = (req, res) => {
    // console.log("Soft delete request body:", req.body);
    validationerrors = []

    if (!req.body._id)
        validationerrors.push("_id is required")

    if (validationerrors.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "Validation error",
            errors: validationerrors
        })
    } else {
        // Log soft delete status
        // console.log("Soft delete status:", req.body.status);

        // Find ToDo by ID
        ToDo.findOne({ _id: req.body._id })
            .then(ToDoData => {
                console.log(ToDoData)
                if (!ToDoData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Record not found"
                    })
                } else {
                    // Update status field
                    // console.log(req.body.status)
                    if (!req.body.status)
                        ToDoData.status = req.body.status;
                    

                    // Save updated ToDo
                    ToDoData.save()
                        .then(saveRes => {
                            // Log saved ToDo data
                            console.log("Saved ToDo data:", saveRes);

                            // Send response
                            res.json({
                                status: 200,
                                success: true,
                                message: "Record soft deleted successfully",
                                data: saveRes
                            });
                        })
                        .catch(err => {
                            // Log error saving ToDo data
                            console.error("Error saving ToDo data:", err);

                            // Send error response
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
                // Log internal server error
                console.error("Internal Server Error:", err);

                // Send error response
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
}



