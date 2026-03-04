import "dotenv/config";
import { pool } from "./mysql";

async function test() {
  const [rows] = await pool.query("SELECT 1");
  console.log("Banco conectado:", rows);
}

test();