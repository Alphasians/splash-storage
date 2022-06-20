# Splash-storage

## Endpoints

### `/health`

Check Health of endpoint

### `/upload`

Upload file

### `/file/<pathname>`

Get file

### `/generate-signed-url/<pathname>`

Generate signed URL

### `/file-signed/<pathname>?token=<token>`

Get file using a signed URL

## Environment Variables

- DATABASE_URL
- BLOB_ACCESS_KEY
- GRAPHQL_ENGINE_BASE_URL
- HASURA_GRAPHQL_ADMIN_SECRET
- JWT_SECRET
- ENCRYPTION_KEY
- ACCOUNT_NAME
- CONTAINER_NAME
