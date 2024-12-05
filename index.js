import express, { json, response } from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { checkNullUndefined } from  './src/utils/tools.js' //'../src/utils/tools.js';
import bcrypt from "bcrypt"
import connectDB from './src/database/index.js';
import dotenv from 'dotenv';
import cors from 'cors';
import  admin  from 'firebase-admin';
import serviceAccount from "./serviceAccountKey.json"  assert { type: "json" };
dotenv.config();
const app = express();
app.use(express.json({ limit: "10mb" }));
const port = process.env.PORT || 3000;
// const firebaseapp = initializeApp();
app.use(cors())

// console.log(serviceAccount);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});




import userRouter from './src/routes/user.routes.js'
import locationRouter from './src/routes/location.routes.js'
import categoryRouter from './src/routes/category.routes.js'
import productRouter from './src/routes/product.routes.js'
import repair_requestRouter from './src/routes/repair_request.routes.js'
import tempRuter from './src/routes/temp.route.js'
import pendingActionRouter from './src/routes/pendingAction.routes.js'
import notificationRouter from './src/routes/notification.routes.js'


app.use("/users", userRouter)
app.use("/category", categoryRouter)
app.use("/product", productRouter)
app.use("/repair_request", repair_requestRouter)
app.use("/temp",tempRuter )
app.use("/location",locationRouter)
app.use("/pending_action",pendingActionRouter)
app.use("/notification",notificationRouter)



// MongoDB connection URI
const uri = `${process.env.MONGO_URL}`;

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
      if (checkNullUndefined(name) || checkNullUndefined(phoneNumber) || checkNullUndefined(email) || checkNullUndefined(city) || checkNullUndefined(password)) {
        return res.status(400).json({ error: "invalid credentials" })
      }
      const phoneNumberPattern = /^\d{10}$/;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // Check if the phone number does not match the pattern
      if (!phoneNumberPattern.test(phoneNumber)) {
        return res.status(400).json({
          status: "Failed",
          message: "Invalid phone number entered. It should be 10 digits."
        });
      }
      // Check if the password is at least 8 characters long
      if (!password || password.length < 8) {
        return res.status(400).json({
          status: "Failed",
          message: "Password must be greater than 8 characters."
        });
      }
      // Check if the email does not match the pattern
      if (!emailPattern.test(email)) {
        return res.status(400).json({
          status: "Failed",
          message: "Invalid email address entered."
        });
      }
      try {
        // Here you would insert the user data into MongoDB using the client
        const db = client.db("myDatabase");
        const collection = db.collection("users");
        let passwordcrpted = await bcrypt.hash(password, 10)
        await collection.insertOne({ name, phoneNumber, email, city, password: passwordcrpted });

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


        bcrypt.compare(req.body.password, user.password, function (err, response) {
          if (response) {
            res.status(200).json({ message: 'User logged in successfully', body: user });
          } else {
            // response is OutgoingMessage object that server response http request
            return res.status(400).json({ success: false, message: 'passwords do not match' });
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

// startServer();

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', error);
})
// startServer();