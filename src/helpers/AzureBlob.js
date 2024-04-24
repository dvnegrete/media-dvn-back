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

// async function uploadBlob(buffer, contentType, container, name) {
//     try {
//         const containerClient = blobServices.getContainerClient(container);
//         await containerClient.uploadBlockBlob(name, buffer, buffer.length, {
//             blobHTTPHeaders: {
//                 blobContentType: contentType
//             }
//         });
//         console.log('Blob cargado correctamente.');
//         const blockBlobClient = containerClient.getBlockBlobClient(obj.name);
//         return blockBlobClient.url;
//     } catch (error) {
//         console.error(error.message);
//         return { "message": error.message }
//     }
// }

// async function uploadBlobStorage(obj) {

//     const buffer = Buffer.from(obj.file);
//     const contentType = obj.file.mimetype;
//     const file = await uploadBlob(buffer, contentType, obj.container, obj.name);
//     return file;    
// }

async function uploadBlobStorage(obj) {
    try {
        const { buffer } = obj.file;
        const containerClient = blobServices.getContainerClient(obj.container);
        await containerClient.getBlockBlobClient(obj.name).uploadData(buffer);
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