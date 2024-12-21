import dotenv from 'dotenv';
import express from 'express';
import tasksRouter from './api/tasks';
import './db';
import usersRouter from './api/users';
import cors from 'cors';

dotenv.config();
  
const app = express();

const port = process.env.PORT;

// Enable CORS for all requests
app.use(cors());

app.use(express.json());

app.use('/api/tasks', tasksRouter);

app.use('/api/users', usersRouter);

app.use((req, res, next) => {
  res.status(404).json({
      code: 404,
      message: 'Not Found'
  });
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
      return next(err);
  }
  console.error(err.stack); 
  if (err.name === 'ValidationError') {
      res.status(400).json({
          code: 400,
          msg: err.message
      });
  } else {
      res.status(err.status || 500).json({
          code: err.status || 500,
          message: err.message || 'Internal Server Error'
      });
  }
});


app.listen(port, () => {
  console.info(`Server running at ${port}`);
});

