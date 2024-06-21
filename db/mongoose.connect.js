const mongoose = require('mongoose');
require('dotenv').config();

const MongoDb = process.env.MONGO_DB_URI;
mongoose.set('strictQuery', true);

if (!MongoDb) {
    console.error('MONGO_DB_URI is not defined. Please check your environment variables.');
    process.exit(1);
}

async function connectToDatabase() {
    try {
        await mongoose.connect(MongoDb);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    }
}


module.exports = connectToDatabase;