const mongoose = require("mongoose")

// Connect to MongoDB --- Replace this with your Connection String
CONNECTION_STRING = 'mongodb+srv://Ziyuq:Shsss06@20@vans.etgjq.mongodb.net/?retryWrites=true&w=majority'

MONGO_URL =
    CONNECTION_STRING.replace("<username>", process.env.MONGO_USERNAME).replace("<password>", process.env.MONGO_PASSWORD)

mongoose.connect(MONGO_URL || "mongodb://localhost/Vans", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: "Vans"
})

const db = mongoose.connection

db.on("error", err => {
    console.error(err);
    process.exit(1)
})

db.once("open", async() => {
    console.log("Mongo connection started on " + db.host + ":" + db.port)
})


module.exports = { Van }
module.exports = db