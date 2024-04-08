import { Pool } from "pg";
let conn
if (!conn) {
  conn = new Pool({
    user : "postgres",
    password : "Nidhish@123",
    host : "localhost",
    port : "5432",
    database : "swapshop"
  });
}

export { conn };