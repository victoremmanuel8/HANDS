const mongoose = require('mongoose');
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const { promisify } = require('util');
const { INTEGER, ENUM } = require('sequelize');

const s3 = new aws.S3();

const ProfileSchema = new mongoose.Schema({
    name: String,
    size: Number,
    key: String,
    url: String,
    createAt: {
        type: Date,
        default: Date.now,
    },
});

ProfileSchema.pre('save', async function() {
  if (!this.url) {
      // Obter a extensão do arquivo
      const ext = path.extname(this.key);
      
      // Obter o tipo MIME da extensão
      const mimeType = mime.lookup(ext);
      
      // Definir o campo 'video' com base no tipo MIME
      if (mimeType && mimeType.startsWith('image')) {
          this.image = true;
      } else {
          this.image = false;
      }

      // Configurar a URL conforme necessário
      if (this.image) {
          this.url = `http://localhost:5000/image/${this.key}`;
      } else {
          this.url = `http://localhost:5000/files/${this.key}`;
      }
  }
});
ProfileSchema.pre("remove", function() {
    if (process.env.STORAGE_TYPE === "s3") {
      return s3
        .deleteObject({
          Bucket: process.env.BUCKET_NAME,
          Key: this.key
        })
        .promise()
        .then(response => {
          console.log(response.status);
        })
        .catch(response => {
          console.log(response.status);
        });
    } else {
      return promisify(fs.unlink)(3
        ,
        path.resolve(__dirname, "..", "..", "tmp", "uploads", this.key)
      );
    }
  });

module.exports = mongoose.model('Profile', ProfileSchema);