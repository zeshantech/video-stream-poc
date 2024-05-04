import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";

/* const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + uuidv4() + path.extname(file.originalname));
  },
});

// multer configuration
export const upload = multer({ storage: storage });
 */

//multer middleware

const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    cb(null, "./uploads");
  },
  filename: function (_, file, cb) {
    cb(null, file.fieldname + "-" + uuidv4() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage: storage });
