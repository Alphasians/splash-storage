const { ContainerClient ,BlockBlobClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
require('dotenv').config()

const containerUrl  = `https://${process.env.ACCOUNT_NAME}.blob.core.windows.net/${process.env.CONTAINER_NAME}`;
const blobUrl  = `https://${process.env.ACCOUNT_NAME}.blob.core.windows.net/${process.env.CONTAINER_NAME}/test`;

export async function initClient() {
   const containerClient = new ContainerClient(
    containerUrl,
    new StorageSharedKeyCredential(process.env.ACCOUNT_NAME, process.env.BLOB_ACCESS_KEY)
  );
  if (containerClient.exists()===true) {
    return containerClient;
  }
  else {
    const Created = await containerClient.create();
    return Created;
  }
}

export async function uploadObject(
  filepath: string, 
  file: any
): Promise<any> {
  // * Create or update the object
  // const client = initClient();
  const blockBlobClient = new BlockBlobClient(
    blobUrl,
    new StorageSharedKeyCredential(process.env.ACCOUNT_NAME, process.env.BLOB_ACCESS_KEY)
  );
  const upload_params = {
    filepath: filepath,
    file: file,
  };

  const data = await blockBlobClient.uploadFile(upload_params).promise();
  return data;
}

export async function downloadObject() {
  const blockBlobClient = new BlockBlobClient(
    blobUrl,
    new StorageSharedKeyCredential(process.env.ACCOUNT_NAME, process.env.BLOB_ACCESS_KEY)
  );
  const object = await blockBlobClient.getProperties;

  if (!object.Body) {
    throw new Error("Object not found");
  }

  return object;
}
