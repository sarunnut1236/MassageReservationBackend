let Hospital = require("../models/Hospital.js");
const vacCenter = require('../models/VacCenter');

/*
@desc   GET all hospitals
@route  GET /api/v1/hospitals
@access public
*/
exports.getAllHospitals = async (_request, response, next) => {
    try {
        // deconstructt request query
        const requestQuery = { ..._request.query };

        // exclude operators from request query
        const removedFields = ["select", "sort", "page", "limit"];
        removedFields.forEach((removedField) => {
            delete requestQuery[removedField];
        });

        // change query string to mongodb syntax
        let queryString = JSON.stringify(requestQuery);

        // handle comparator operations
        queryString = queryString.replace(
            /\b(gt|gte|lt|lte|in)\b/g,
            (match) => `$${match}`,
        );

        // perform query
        let query = Hospital.find(JSON.parse(queryString)).populate(
            "appointments",
        );

        // handle select operation
        if (_request.query.select) {
            // change json to mongodb syntax
            const fields = _request.query.select.split(",").join(" ");
            query = query.select(fields);
        }

        // handle sort operation
        if (_request.query.sort) {
            const sortBy = _request.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        } else {
            query = query.sort("-createdAt");
        }

        // handle pagination
        const page = parseInt(_request.query.page, 10) || 1;
        const limit = parseInt(_request.query.limit, 10) || 25;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const total = await Hospital.countDocuments();

        query = query.skip(startIndex).limit(limit);

        // execute query
        const hospitals = await query;

        // pagination result
        const pagination = {};
        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit,
            };
        }
        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit,
            };
        }
        response.status(200).json({
            succes: true,
            count: hospitals.length,
            pagination,
            data: hospitals,
        });
    } catch (error) {
        response.status(400).json({ success: false, data: error });
    }
};

/*
@desc   GET single hospital
@route  GET /api/v1/hospitals/:id
@access public
*/
exports.getSomeHospital = async (_request, response, next) => {
    try {
        const hospital = await Hospital.findById(_request.params.id);

        if (!hospital) {
            // If hospital is not found
            return response.status(400).json({
                success: false,
                data: `Hospital ${_request.params.id} not found`,
            });
        }
        response.status(200).json({ succes: true, data: hospital });
    } catch (error) {
        response.status(400).json({ success: false, data: error });
    }
};

/*
@desc   POST new hospital
@route  POST /api/v1/hospitals
@access private
*/
exports.createNewHospital = async (_request, response, next) => {
    let status = 400;
    let success = false;
    let data = "There is an error. Please try again.";

    try {
        const hospital = await Hospital.create(_request.body);
        [status, success, data] = [201, true, hospital];
    } catch (error) {
        data = error;
    } finally {
        response.status(status).json({ success: success, data: data });
    }
};

/*
@desc   PUT update hospital
@route  PUT /api/v1/hospitals/:id
@access private
*/
exports.updateHospital = async (_request, response, next) => {
    try {
        const hospital = await Hospital.findByIdAndUpdate(
            _request.params.id,
            _request.body,
            {
                new: true,
                runValidators: true,
            },
        );

        if (!hospital) {
            // If hospital is not found
            return response.status(400).json({
                success: false,
                data: `Hospital ${_request.params.id} not found`,
            });
        }
        response.status(200).json({ success: true, data: hospital });
    } catch (error) {
        response.status(400).json({ success: false, data: error });
    }
};

/*
@desc   DELETE hospital
@route  DELETE /api/v1/hospitals/:id
@access private
*/
exports.deleteHospital = async (_request, response, next) => {
    try {
        const hospital = await Hospital.findById(_request.params.id);

        if (!hospital) {
            // If hospital is not found
            return response.status(404).json({
                success: false,
                data: `Hospital ${_request.params.id} not found`,
            });
        }

        hospital.deleteOne();
        response.status(200).json({ success: true, data: hospital });
    } catch (error) {
        console.error(error);
        response.status(400).json({ success: false, data: error });
    }
};

exports.getVacCenters = (_request, response, next) => {
    vacCenter.getAll((error, data) => {
        if (error) {
            console.error(error);
            response.status(500).send({
                message: error.message || "Some error occurred while retrieving Vaccine Centers.",
            });
        } else {
            console.log(data);
            response.status(200).send({data});
        }
    })
}