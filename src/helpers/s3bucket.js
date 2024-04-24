const { S3Client } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");
const { s3Key, s3Secret, s3Bucket } = require("../config");

const myRegion = "us-east-2";

const uploadS3 = async (file, contentType) => {
    try {
        const clientConnected = new S3Client({
            region: myRegion,
            credentials: {
                accessKeyId: s3Key,
                secretAccessKey: s3Secret
            }
        });
        const paramsConfig = {
            Bucket: s3Bucket,
            Key: "multimedia",
            Body: file,
            ContentType: contentType,
        };
        const parallelUploads3 = new Upload({
            client: clientConnected,
            params: paramsConfig,
        })

        parallelUploads3.on("httpUploadProgress", (progress) => {
            console.log(progress);
        });

        await parallelUploads3.done();

    } catch (error) {
        console.log(error);
    }
}

module.exports = { uploadS3 };