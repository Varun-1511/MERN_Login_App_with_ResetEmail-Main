import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/conn.js";
import router from "./router/route.js";
import fs from "fs";
import path from "path";

import mongoose from "mongoose";
import Grid from "gridfs-stream";
const app = express();

/** middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by"); // less hackers know about our stack

const port = 8080;

/** HTTP GET Request */
app.get("/", (req, res) => {
  res.status(201).json("Home GET Request");
});

// /** set up storage for uploaded files */
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // save file in 'uploads' directory
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname); // use original file name
//   },
// });

// router.get("/download/:filename", (req, res) => {
//   const filename = req.params.filename;
//   const readstream = gfs.createReadStream({ filename: filename });
//   readstream.pipe(res);
// });
// /** initialize multer */
// const upload = multer({ storage: storage });

/** api routes */
app.use("/api", router);


// router.post("/upload", upload.single("file"), (req, res) => {
//   res.json({ filename: req.file.originalname });
// });
/** start server only when we have valid connection */
connect()
  .then((db) => {
    try {
      app.listen(port, () => {
        console.log(`Server connected to http://localhost:${port}`);
      });

      /** initialize GridFS */
      let gfs;
      db.once("open", () => {
        gfs = Grid(db, mongoose.mongo);
        gfs.collection("uploads");
      });
    } catch (error) {
      console.log("Cannot connect to the server");
    }
  })
  .catch((error) => {
    console.log("Invalid database connection...!");
  });


// const db = connect()
//   .then(() => {
//     try {
//       app.listen(port, () => {
//         console.log(`Server connected to http://localhost:${port}`);
//       });
//     } catch (error) {
//       console.log("Cannot connect to the server");
//     }
//   })
//   .catch((error) => {
//     console.log("Invalid database connection...!");
//   });

// /** initialize GridFS */
// let gfs;
// db.once("open", () => {
//   gfs = Grid(db, mongoose.mongo);
//   gfs.collection("uploads");
// });
