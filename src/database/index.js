import mongoose from "mongoose";


const uri = "mongodb+srv://uvinayak7:oRrZcoLEEOtDJqyG@clusterft.mw37dvg.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=ClusterFT";


// const uri = "mongodb+srv://uvinayak7:oRrZcoLEEOtDJqyG@clusterft.mw37dvg.mongodb.net/?retryWrites=true&w=majority&appName=ClusterFT";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${uri}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        // client.connect()
        // client.db("myDatabase")
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDB