
const http = require("http");
const { Pool } = require("pg");

const PORT = 3000;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const server = http.createServer(async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT current_database() AS database, current_user AS username, NOW() AS server_time"
    );

    res.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
    });

    res.end(JSON.stringify(result.rows[0]));
  } catch (error) {
    console.error("Error consultando PostgreSQL:", error.message);

    res.writeHead(500, {
      "Content-Type": "text/plain; charset=utf-8",
    });

    res.end("Error de conexion con la base de datos");
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
