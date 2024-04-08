import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

let server
async function startServer() {
  try {
      await mongoose.connect(process.env.MONGO_URI, {
        dbName: process.env.MONGO_DB,
      })

      server = app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
      });
  } catch (error) {
      console.error('Error starting server:', error);
  }
}

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected ....');
})

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connected error....', err.message);
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connected is disconnected ...')
})

process.on('SIGINT', ()=> {
  console.log('SIGINT recieved');
  server.close(() => {
    console.log('Server is closed...');
    //... other process ...
    mongoose.connection.close().then(() => {
        process.exit(0)
    })
    //... other process ...
  })
})

process.on('SIGTERM', ()=> {
  console.log('SIGTERM recieved');
  server.close( async () => {
    console.log('Server is closed...');
    //... other process ...
    mongoose.connection.close().then(()=> {
      process.exit(0)
    })
    //... other process ...
  })
})

startServer()
