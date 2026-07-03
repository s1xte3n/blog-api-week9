const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        await Article.syncIndexes();

        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.error('DB Connection Failed', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
