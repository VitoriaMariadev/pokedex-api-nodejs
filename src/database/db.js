import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
    user: "postgres",
    password: "mpe",
    host: "localhost",
    port: 5432,
    database: "pokedex-bd"
})

export default pool 

