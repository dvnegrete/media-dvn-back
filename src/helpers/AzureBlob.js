const { BlobServiceClient } = require("@azure/storage-blob");
const { AZURE_STRING } = require("../config")

const blobServices = BlobServiceClient.fromConnectionString(AZURE_STRING);

async function listBlobs() {
    const list = [];
    const containerClient = blobServices.getContainerClient("media-dvn");
    for await (const blob of containerClient.listBlobsFlat()) {
        const tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name);
        const obj = {
            name: blob.name,
            url: tempBlockBlobClient.url
        }
        list.push(obj);
    }
    return list
}

async function uploadBlobStorage(obj) {
    try {
        const config = {
            blobHTTPHeaders: {
                blobContentType: obj.contentType
            }
        };
        const { buffer } = obj.file;
        const containerClient = blobServices.getContainerClient(obj.container);
        await containerClient.getBlockBlobClient(obj.name).uploadData(buffer, config);
        const blockBlobClient = containerClient.getBlockBlobClient(obj.name);
        return blockBlobClient.url;
    } catch (error) {
        console.error(error.message);
        return { "message": error.message }
    }
}

async function getBlobStorage(obj) {
    try {
        const containerClient = blobServices.getContainerClient(obj.container);
        const blockBlobClient = containerClient.getBlockBlobClient(obj.name);
        const downloadBlockBlobResponse = await blockBlobClient.download();
        const downloaded = (
            await streamToBuffer(downloadBlockBlobResponse.readableStreamBody)
        );
        return downloaded;
    } catch (error) {
        console.error(error);
    }
}

async function streamToBuffer(readable) {
    readable.setEncoding('base64');
    let data = '';
    for await (const chunk of readable) {
        data += chunk;
    }
    return data;
}

module.exports = { listBlobs, uploadBlobStorage, getBlobStorage };