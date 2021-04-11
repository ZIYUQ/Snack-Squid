require('dotenv').config()
const mongoose = require("mongoose")

// Connect to MongoDB --- Replace this with your Connection String
CONNECTION_STRING = "mongodb+srv://squid:snacksquid@snacksquid.2vwkd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

MONGO_URL =
 CONNECTION_STRING.replace("<username>",process.env.MONGO_USERNAME).replace("<passw ord>",process.env.MONGO_PASSWORD)

 mongoose.connect(MONGO_URL || "mongodb://localhost/info30005", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  dbName: "Project"
 })

const db = mongoose.connection

db.on("error", err => { 
     console.error(err); 
     process.exit(1)
})

db.once("open", async () => {
       console.log("Mongo connection started on " + db.host + ":" + db.port)
})

const snackSchema = new mongoose.Schema({
     name: {type:String, require:true},
     price:{type: Number, require:true},
     phote:String,
     type: String,
     description: String
 })
 
 const snack = mongoose.model("snack", snackSchema)
 module.exports = {snack}

// require("./db")