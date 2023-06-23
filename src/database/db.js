import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
    user: "postgres",
    password: "vitoria",
    host: "localhost",
    port: 5432,
    database: "pokedex_completa"
})

export default pool 

