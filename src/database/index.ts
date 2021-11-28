import mongoose from "mongoose"


const connectCosmoDB = async () => {
    const DB_STRING = "mongodb://"+process.env.COSMOSDB_HOST+":"+process.env.COSMOSDB_PORT+"/"+process.env.COSMOSDB_DBNAME+"?ssl=true&replicaSet=globaldb";
    try {
        const conn = await mongoose.connect(
            DB_STRING,
            {
                user: process.env.COSMOSDB_USER,
                pass: process.env.COSMOSDB_PASSWORD,
                autoIndex: true,
                autoCreate: true,
                retryWrites:false,
            }
        )
        console.log(`CosmoDB Connected: port ${conn.connection.port}`)
    } catch (err) {
        console.log(err)
    }
}

export default connectCosmoDB