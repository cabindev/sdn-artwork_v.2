import express, { Request, Response, NextFunction } from 'express';
import next from 'next';
import path from 'path';
import mysql, { Pool } from 'mysql2/promise';

declare global {
  namespace Express {
    interface Request {
      db: Pool;
    }
  }
}

const dev: boolean = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port: number = parseInt(process.env.PORT || '3000', 10);

// MySQL connection pool
const pool: Pool = mysql.createPool({
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
    console.error('> MySQL connection failed:', (err as Error).message);
  }

  // Serve static files
  server.use('/images', express.static(path.join(__dirname, 'public/images')));
  server.use('/zip', express.static(path.join(__dirname, 'public/zip')));

  // Make pool available to requests
  server.use((req: Request, _res: Response, nextMiddleware: NextFunction) => {
    req.db = pool;
    nextMiddleware();
  });

  // Let Next.js handle all other routes
  server.all('*', (req: Request, res: Response) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
    console.log(`> Environment: ${dev ? 'development' : 'production'}`);
  });
});
