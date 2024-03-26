const mongoose = require("mongoose");

const connectDB = async () => {
    mongoose.set("strictQuery", true);

    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${connection.connection.host}`);
};

module.exports = connectDB;
