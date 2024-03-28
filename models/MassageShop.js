const mongoose = require("mongoose");

const MassageShop = {
    name: {
        type: String,
        required: [true, "Please add a name"],
        unique: true,
        trim: true,
        maxlength: [50, "Name can not be more than 50 characters"],
    },
    address: {
        type: String,
        required: [true, "Please add an address"],
    },
    district: {
        type: String,
        required: [true, "Please add a district"],
    },
    province: {
        type: String,
        required: [true, "Please add a province"],
    },
    postalcode: {
        type: String,
        required: [true, "Please add a postalcode"],
        maxlength: [5, "Postal code cannot be more than 5 digits"],
    },
    tel: {
        type: String,
    },
    region: {
        type: String,
        required: [true, "Please add a region"],
    },
    openTime:{
        type: Date,
        required: [true, "Please add an open time"],
    },
    closeTime:{
        type: Date,
        required: [true, "Please add a close time"],
    },
};

const MassageShopSchema = new mongoose.Schema(MassageShop, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

// reverse populate with virtuals
MassageShopSchema.virtual("appointments", {
    ref: "Appointment",
    localField: "_id",
    foreignField: "massageShop",
    justOne: false,
});

// cascade delete appointments when a massage shop is deleted
MassageShopSchema.pre(
    "deleteOne",
    { document: true, query: false },
    async function (next) {
        console.log(`Appointments being removed from the massage shop ${this._id}`);
        await this.model("Appointment").deleteMany({ massageShop: this._id });
        next();
    },
);

module.exports = mongoose.model("MassageShop", MassageShopSchema);
