import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
    user: "postgres",
    password: "vitoria",
    host: "localhost",
    port: 5432,
    database: "pokedex"
})

export default pool 

