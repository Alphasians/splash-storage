import axios from "axios";
require("dotenv").config();
console.log(process.env.GRAPHQL_ENGINE_BASE_URL)
// https://hasura.io/docs/latest/graphql/core/api-reference/metadata-api/table-view.html#pg-track-table
export async function applyMetadata(): Promise<void> {
  try {
    await axios.post(
      `${process.env.GRAPHQL_ENGINE_BASE_URL}/v1/metadata`,
      {
        "type": "pg_track_table",
        "args": {
        "source": "default",
        "table": {
          "schema": "storage",
          "name": "files"
       },
        "configuration": {
            "custom_name": "storage_files",
            // "custom_root_fields": {
            //   "select": "Files",
            //   "select_files_by_pk": "File",
            //   "insert_storage_files": "AddFiles",
            //   "insert_storage_files_one":"AddFile",
            // }
         }
        },
      },
      {
        headers: {
          "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
          "content-type": "application/json",
          "x-hasura-role": "admin",
        },
      }
    );
  } catch (error:any) {
    console.error(error.message.data);
    if (error.response.data.code !== "already-tracked") {
      console.log("Unable to track table");
      throw error;
    }
  }
}
