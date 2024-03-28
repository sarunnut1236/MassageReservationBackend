// Import massageshop
/* -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */
let MassageShop = require("../models/MassageShop.js");
/* -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */



// APIs
/* -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */
/*
@desc   GET all massageShops
@route  GET /api/v1/massageShops
@access public
*/
exports.getAllMassageShops = async (_request, response, next) => {
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
        let query = MassageShop.find(JSON.parse(queryString)).populate(
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
        const total = await MassageShop.countDocuments();

        query = query.skip(startIndex).limit(limit);

        // execute query
        const massageShops = await query;

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
            count: massageShops.length,
            pagination,
            data: massageShops,
        });
    } catch (error) {
        response.status(400).json({ success: false, data: error });
    }
};

/*
@desc   GET single massageShop
@route  GET /api/v1/massageShops/:id
@access public
*/
exports.getSomeMassageShop = async (_request, response, next) => {
    try {
        const massageShop = await MassageShop.findById(_request.params.id);

        if (!massageShop) {
            // If massageShop is not found
            return response.status(400).json({
                success: false,
                data: `MassageShop ${_request.params.id} not found`,
            });
        }
        response.status(200).json({ succes: true, data: massageShop });
    } catch (error) {
        response.status(400).json({ success: false, data: error });
    }
};

/*
@desc   POST new massageShop
@route  POST /api/v1/massageShops
@access private
*/
exports.createNewMassageShop = async (_request, response, next) => {
    let status = 400;
    let success = false;
    let data = "There is an error. Please try again.";

    try {
        const massageShop = await MassageShop.create(_request.body);
        [status, success, data] = [201, true, massageShop];
    } catch (error) {
        data = error;
    } finally {
        response.status(status).json({ success: success, data: data });
    }
};

/*
@desc   PUT update massageShop
@route  PUT /api/v1/massageShops/:id
@access private
*/
exports.updateMassageShop = async (_request, response, next) => {
    try {
        const massageShop = await MassageShop.findByIdAndUpdate(
            _request.params.id,
            _request.body,
            {
                new: true,
                runValidators: true,
            },
        );

        if (!massageShop) {
            // If massageShop is not found
            return response.status(400).json({
                success: false,
                data: `MassageShop ${_request.params.id} not found`,
            });
        }
        response.status(200).json({ success: true, data: massageShop });
    } catch (error) {
        response.status(400).json({ success: false, data: error });
    }
};

/*
@desc   DELETE massageShop
@route  DELETE /api/v1/massageShops/:id
@access private
*/
exports.deleteMassageShop = async (_request, response, next) => {
    try {
        const massageShop = await MassageShop.findById(_request.params.id);

        if (!massageShop) {
            // If massageShop is not found
            return response.status(404).json({
                success: false,
                data: `MassageShop ${_request.params.id} not found`,
            });
        }

        const deleted = await MassageShop.findByIdAndDelete(_request.params.id);
        response.status(200).json({ success: true, data: deleted });
    } catch (error) {
        console.error(error);
        response.status(400).json({ success: false, data: error });
    }
};
/* -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */