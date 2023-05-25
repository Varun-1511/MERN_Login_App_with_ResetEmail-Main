import { Router } from "express";
import multer from "multer";
const router = Router();

/** import all controllers */
import * as controller from "../controllers/appController.js";
import { registerMail } from "../controllers/mailer.js";
import Auth, { localVariables } from "../middleware/auth.js";

/** POST Methods */
router.route("/register").post(controller.register); // register user
router.route("/registerMail").post(registerMail); // send the email
router
  .route("/authenticate")
  .post(controller.verifyUser, (req, res) => res.end()); // authenticate user
router.route("/login").post(controller.verifyUser, controller.login); // login in app
router.route("/request").post(controller.request);

/** GET Methods */
router.route("/user/:username").get(controller.getUser); // user with username
router
  .route("/generateOTP")
  .get(controller.verifyUser, localVariables, controller.generateOTP); // generate random OTP
router.route("/verifyOTP").get(controller.verifyUser, controller.verifyOTP); // verify generated OTP
router.route("/createResetSession").get(controller.createResetSession); // reset all the variables
router.route("/allrequest").get(controller.disRequest)
// router.route("/disRequest").get(controller.dasRequest)
/** PUT Methods */
router.route("/updateuser").put(Auth, controller.updateUser); // is use to update the user profile
router
  .route("/resetPassword")
  .put(controller.verifyUser, controller.resetPassword); // use to reset password

// configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// create multer upload object
const upload = multer({ storage: storage });

// upload endpoint
router.post("/upload", upload.single("file"), (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).send("No file uploaded");
    } else {
      res.send("File uploaded successfully");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// download endpoint
router.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = `uploads/${filename}`;
  res.download(filePath);
});

export default router;
