const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");

//code updated to avoid coarse err
app.use((req, res, next) => {
    res.setHeader("access-control-allow-origin", "*")
    res.setHeader("access-control-allow-credentials", true)
    res.setHeader("access-control-allow-methods", "GET,PUT, POST,DELETE,UPDATE")
    next()
})

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
//to connect the mongodb url
mongoose.connect(process.env.MONGO_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
})
    .then(console.log("connected to MongoDb"))
    .catch((err) => console.log(err))
// to upload images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});

//matching paths
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen("5000", () => {
    console.log("Backend is running")
});



