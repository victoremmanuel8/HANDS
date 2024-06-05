const mongoose = require("mongoose");
const aws = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const { promisify } = require("util");

const s3 = new aws.S3();

const Profile_profSchema = new mongoose.Schema({
  profId: {
    type: String,
    required: true,
  },
  name: String,
  size: Number,
  key: {
    type: String,
    required: true,
  },
  url: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

Profile_profSchema.pre("save", async function () {
  if (!this.url) {
    const ext = path.extname(this.key);
    const mimeType = mime.lookup(ext);

    if (mimeType && mimeType.startsWith("image")) {
      this.url = `http://localhost:5000/image/${this.key}`;
    } else {
      this.url = `http://localhost:5000/files/${this.key}`;
    }
  }
});

Profile_profSchema.pre("remove", function () {
  if (process.env.STORAGE_TYPE === "s3") {
    return s3
      .deleteObject({
        Bucket: process.env.BUCKET_NAME,
        Key: this.key,
      })
      .promise()
      .then((response) => {
        console.log(response.status);
      })
      .catch((response) => {
        console.log(response.status);
      });
  } else {
    return promisify(fs.unlink)(
      path.resolve(
        __dirname,
        "..",
        "..",
        "res",
        "photo",
        "profile",
        "tmp",
        this.key
      )
    );
  }
});

module.exports = mongoose.model("Profile_prof", Profile_profSchema);
