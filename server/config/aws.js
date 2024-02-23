var AWS = require("aws-sdk");
require("aws-sdk/lib/maintenance_mode_message").suppress = true;

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1",
  apiVersion: "2010-12-1",
};

const AWSSES = new AWS.SES(awsConfig);
const AWSS3 = new AWS.S3(awsConfig);

module.exports = { AWSSES, AWSS3 };
