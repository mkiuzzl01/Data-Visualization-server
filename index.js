const express = require("express");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;



//middleware
app.use(cors());
app.use(express.json());


console.log(process.env.VITE_USER_NAME);

const uri = `mongodb+srv://${process.env.VITE_USER_NAME}:${process.env.VITE_USER_PASS}@cluster0.rbychrh.mongodb.net/?appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const dataVisualization = client.db('Data-Visualization').collection('Data');

    app.get('/all-data',async (req,res)=>{
        const result = await dataVisualization.find().toArray();
        res.send(result);
    })














    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/',async(req,res)=>{
    res.send("Data-Visualization Server is Running")
})
app.listen(port,()=>{
    console.log("Data Visualization Server is Running on the port", port);
})



