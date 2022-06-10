import axios from "axios";
require("dotenv").config();
// https://hasura.io/docs/latest/graphql/core/api-reference/metadata-api/table-view.html#pg-track-table
export async function applyMetadata(): Promise<void> {
  try {
    await axios.post(
      `${process.env.GRAPHQL_ENGINE_BASE_URL}/v1/metadata`,
      //data
      {
        type: "pg_track_table",
        args: {
        table: {
          schema: "public",
          name: "files"
         },
         source: "default",
        },
      },
      //headers
      {
        headers: {
          'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
          'Content-Type': 'application/json',
          'X-Hasura-Role': 'admin'
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
