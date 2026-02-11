//server.js
const express = require('express');
const next = require('next');
const path = require('path');
const mysql = require('mysql2/promise');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'sdnmedia',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.prepare().then(async () => {
  const server = express();

  // Test MySQL connection
  try {
    const connection = await pool.getConnection();
    console.log('> MySQL connected successfully');
    connection.release();
  } catch (err) {
    console.error('> MySQL connection failed:', err.message);
  }

  // Serve static files
  server.use('/images', express.static(path.join(__dirname, 'public/images')));
  server.use('/zip', express.static(path.join(__dirname, 'public/zip')));

  // Make pool available to requests
  server.use((req, res, nextMiddleware) => {
    req.db = pool;
    nextMiddleware();
  });

  // Let Next.js handle all other routes
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
    console.log(`> Environment: ${dev ? 'development' : 'production'}`);
  });
});
