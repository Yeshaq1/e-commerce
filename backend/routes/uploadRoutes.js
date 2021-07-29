import path from 'path';
import express from 'express';
import multer from 'multer';
import admin from '../middleware/adminMiddleware.js';
import auth from '../middleware/authMiddleware.js';
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';

const router = express.Router();

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-2',
});

const s3 = new aws.S3();

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('images only please');
  }
}

const upload = multer({
  storage: multerS3({
    acl: 'public-read',
    s3: s3,
    bucket: 'shoppy-mern',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      );
    },
  }),
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post('/', auth, admin, upload.single('image'), (req, res) => {
  res.send(`${req.file.location}`);
});

export default router;
