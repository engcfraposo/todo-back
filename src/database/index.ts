import mongoose from "mongoose";

const connectCosmoDb = async () => {
    const DB_STRING = "mongodb://"+process.env.COSMOSDB_HOST+":"+process.env.COSMOSDB_PORT+"/"+process.env.COSMOSDB_DBNAME+"?ssl=true&replicaSet=globaldb";
    try {
        const conn = await mongoose.connect(DB_STRING, {
            user: process.env.COSMOSDB_USER,
            pass: process.env.COSMOSDB_PASSWORD,
            autoIndex: true,
            autoCreate: true,
            retryWrites: false,
        });
        console.log(`Connected to CosmosDB at port: ${process.env.COSMOSDB_PORT}`);
    } catch (error) {
        console.log(error);
    }
}

export default connectCosmoDb;