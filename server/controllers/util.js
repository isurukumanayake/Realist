const { nanoid } = require("nanoid");
const { AWSS3 } = require("../config/aws");

const uploadImage = async (req, res) => {
  try {
    const { image } = req.body;
    const base64Image = new Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    const type = image.split(";")[0].split("/")[1];

    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: `${nanoid()}.${type}`,
      Body: base64Image,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: `image/${type}`,
    };

    AWSS3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.send(data);
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ error: "Upload failed. Try agaian." });
  }
};

const removeImage = async (req, res) => {
  try {
    const { Key, Bucket } = req.body;

    AWSS3.deleteObject({ Bucket, Key }, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.send({ ok: true });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  uploadImage,
  removeImage,
};
