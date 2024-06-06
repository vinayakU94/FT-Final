import express, { json, response } from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { checkNullUndefined } from './utils/tools.js';
import bcrypt from "bcrypt"
const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection URI
const uri = "mongodb+srv://uvinayak7:oRrZcoLEEOtDJqyG@clusterft.mw37dvg.mongodb.net/?retryWrites=true&w=majority&appName=ClusterFT";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});




// Connect to MongoDB and start the server
async function startServer() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Use the MongoDB client in your routes
    app.use(json());

    // Routes for user sign-up and login
    app.post('/signup', async (req, res) => {
      const { name, phoneNumber, email, city, password } = req.body;
      console.log(req.body);
      // console.log(name+ " " + phoneNumber + " " + email + " "+ city)
      if(checkNullUndefined(name) || checkNullUndefined(phoneNumber) || checkNullUndefined(email) || checkNullUndefined(city)|| checkNullUndefined(password)){
        return res.status(400).json({error: "invalid credentials"})
      }
      
      try {
        // Here you would insert the user data into MongoDB using the client
        const db = client.db("myDatabase");
        const collection = db.collection("users");
        let passwordcrpted = await bcrypt.hash(password, 10)
        await collection.insertOne({ name, phoneNumber, email, city , password : passwordcrpted });

        res.status(201).json({ message: 'User signed up successfully' });
      } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    app.post('/login', async (req, res) => {
      const { phoneNumber, password } = req.body;
      

      try {
        // Here you would find the user in MongoDB using the client and authenticate the user
        const db = client.db("myDatabase");
        const collection = db.collection("users");
        const user = await collection.findOne({ phoneNumber });

        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

       
        bcrypt.compare(req.body.password, user.password, function(err, response) {
          if (response) {
            res.status(200).json({ message: 'User logged in successfully', body:user });
          } else {
            // response is OutgoingMessage object that server response http request
            return res.status(400).json({success: false, message: 'passwords do not match'});
          }
        });

        

      } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

startServer();
