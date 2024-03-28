// Import libraries and route files
/* -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const massageShop = require("./routes/massageShop");
const auth = require("./routes/auth");
const appointments = require("./routes/appointments");
const connectDB = require("./config/db");
const cors = require("cors");
/* -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */



// Load env variables
/* -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */
dotenv.config({ path: "./config/config.env" });
/* -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */



// Connect to MongoDB database
/* -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */
connectDB();
/* -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */



// Create express app and its APIs
/* -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */
const app = express();
// Body parser
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api/v1/massage", massageShop);
app.use("/api/v1/auth", auth);
app.use("/api/v1/appointments", appointments);
/* -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */



// Run server
/* -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;
const runningMessage = `Welcome!! Server running in ${NODE_ENV} mode on PORT ${PORT}`;
const server = app.listen(PORT, console.log(runningMessage));
/* -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */



// Handle unhandled promise rejections
/* -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */
const rejectionHandler = (error, promise) => {
    console.log(`Error: ${error.message}`);
    // Close server and exit process
    server.close(() => process.exit(1));
};
process.on("unhandledRejection", rejectionHandler);
/* -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */
