import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {faker } from "@faker-js/faker";
import bodyParser from 'body-parser';
import Order from './models/order.model.js'


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json())

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get('/order', async(req, res) => {
  const orders = await Order.find()
  res.json(orders)
})

app.post('/order', async(req, res) => {
  let promises = []
  Array.from({length: 10}).forEach(async () => {
    const order = new Order({
      customer_data: {
        customerName: faker.person.fullName(),
        tel: faker.phone.number(),
        email: faker.internet.email(),
        address: faker.location.streetAddress(),
        addressCity: faker.location.city(),
        addressSubCity: faker.location.city(),
        addressProvine: faker.location.state(),
        zipcode: faker.location.zipCode(),
      },
      express: {
        expressName: faker.person.fullName,
        expressCost: faker.number.int(),
        trackingNumber: faker.string.uuid(),
      },
      ticket_id: faker.string.uuid(),
      social_network_ref_id: faker.string.uuid(),
      social_user_ref_id: faker.string.uuid(),
      status: faker.helpers.arrayElement(['pending', 'completed', 'canceled']),
      created_at: faker.date.recent(),
      updated_at: faker.date.recent(),
      __v: faker.number.int(),
      bill_ref_id: faker.string.uuid(),
      payment: {
        balance: faker.number.int(),
        timestamp: faker.date.recent(),
        type: faker.helpers.arrayElement(['cash', 'credit']),
      },
      channel: faker.helpers.arrayElement(['facebook', 'instagram', 'twitter']),
      type: faker.helpers.arrayElement(['normal', 'express']),
    })
    promises.push(order.save())
  })
  const result = await Promise.all(promises)
  res.json({
    message: 'Orders created',
    data: {
      count: result.length
    }
  })
  
})

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
