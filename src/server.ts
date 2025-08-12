const express = require('express')
import type { Request, Response,NextFunction } from 'express';
import { Product } from './models/Product';
import connectDB from './config/database';
import { User } from './models/User';

console.log("User: ",typeof User)
const app = express();
const PORT = 3001;

// Middleware to parse JSON
app.use(express.json());

connectDB();

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const now = new Date();
  console.log(`[${now.toISOString()}] ${req.method} ${req.url}`);
  next(); // Move to the next middleware/route
};



app.use(loggerMiddleware)

// GET route
app.get('/', (req: Request, res: Response) => {
  const data = {
    id:1,
    name:"Arun",
    email:"arunprasath41d@gmail.com",
    role:"Backend Developer"
  }
  res.send(data);
});


app.get("/greet/:name", (req:Request, res:Response) => {
  res.send(`Hello ${req.params.name}`);
});


app.post("/message", (req:Request, res:Response) => {
  const {name,message} = req.body;
  if(!name || !message){
    return res.status(400).json({error:"Name and Message are required"});
  }

  res.json({
    success:true,
    recieved:{name,message},
    message:`Hello, ${name},you said: ${message}`
  })
});




// Create Product
app.post("/products", async (req: Request, res: Response) => {
  try {
    const { name, price, category } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const product = new Product({ name, price, category });
    await product.save();

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get All Products
app.get("/products", async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});




app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
