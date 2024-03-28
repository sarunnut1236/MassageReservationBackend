// Imports
/* -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */
const Appointment = require("../models/Appointment");
const MassageShop = require("../models/MassageShop");
/* -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */



// API Routes
/* -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */
// desc    Get all appointments
// route   GET /api/v1/appointments
// access  Private
exports.getAppointments = async (_request, response, next) => {
    let query;

    // general users can see only their appointments
    if (_request.user.rolse !== "admin") {
        query = Appointment.find({ user: _request.user.id }).populate({
            path: "massageShop",
            select: "name province tel",
        });
    }
    // admin can see all appointments
    else {
        query = Appointment.find().populate({
            path: "massageShop",
            select: "name province tel",
        });
    }

    // execute the query
    try {
        const appointments = await query;

        const responseJson = {
            success: true,
            count: appointments.length,
            data: appointments,
        };
        response.status(200).json(responseJson);
    } catch (error) {
        console.error(error);
        const responseJson = {
            success: false,
            message: "Cannot find Appointment",
        };
        return response.status(500).json(responseJson);
    }
};

// desc    Get single appointment
// route   GET /api/v1/appointments/:id
// access  Private
exports.getAppointment = async (_request, response, next) => {
    try {
        const appointment = await Appointment.findById(
            _request.params.id,
        ).populate({
            path: "massageShop",
            select: "name description tel",
        });

        if (!appointment) {
            return response.status(404).json({
                success: false,
                message: `No appointment with the id of ${_request.params.id}`,
            });
        }

        response.status(200).json({
            success: true,
            data: appointment,
        });
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            success: false,

            message: "Cannot find Appointment",
        });
    }
};

// desc    Add appointment
// route   POST /api/v1/massageShops/:massageShopId/appointments
// access  Private
exports.addAppointment = async (_request, response, next) => {
    try {
        _request.body.massageShop = _request.params.id;

        const massageShop = await MassageShop.findById(_request.params.id);

        if (!massageShop) {
            return response.status(404).json({
                success: false,
                message: `No massageShop with the id of ${_request.params.id}`,
            });
        }

        _request.body.user = _request.user.id;

        const existedAppointment = await Appointment.find({
            user: _request.user.id,
        });

        if (existedAppointment.length >= 3 && _request.user.role !== "admin") {
            return response.status(400).json({
                success: false,
                message: `User with id of ${_request.user.id} already has 3 appointments`,
            });
        }

        const appointment = await Appointment.create(_request.body);

        response.status(200).json({
            success: true,
            data: appointment,
        });
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            success: false,
            message: "Cannot add Appointment",
        });
    }
};

// desc    Delete appointment
// route   DELETE /api/v1/appointments/:id
// access  Private
exports.updateAppointment = async (_request, response, next) => {
    try {
        let appointment = await Appointment.findById(_request.params.id);

        if (!appointment) {
            return response.status(404).json({
                success: false,
                message: `No appointment with the id of ${_request.params.id}`,
            });
        }

        // Make sure user is appointment owner
        if (
            appointment.user.toString() !== _request.user.id &&
            _request.user.role !== "admin"
        ) {
            return response.status(401).json({
                success: false,
                message: `User ${_request.user.id} is not authorized to update this appointment`,
            });
        }

        appointment = await Appointment.findByIdAndUpdate(
            _request.params.id,
            _request.body,
            {
                new: true,
                runValidators: true,
            },
        );

        response.status(200).json({
            success: true,
            data: appointment,
        });
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            success: false,
            message: "Cannot update Appointment",
        });
    }
};

exports.deleteAppointment = async (_request, response, next) => {
    try {
        const appointment = await Appointment.findById(_request.params.id);

        if (!appointment) {
            return response.status(404).json({
                success: false,
                message: `No appointment with the id of ${_request.params.id}`,
            });
        }

        if (
            appointment.user.toString() !== _request.user.id &&
            _request.user.role !== "admin"
        ) {
            return response.status(401).json({
                success: false,
                message: `User ${_request.user.id} is not authorized to delete this appointment`,
            });
        }

        await appointment.deleteOne();

        response.status(200).json({
            success: true,
            data: {},
        });
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            success: false,
            message: "Cannot delete Appointment",
        });
    }
};
/* -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */