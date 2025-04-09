import express, {Request, Response} from 'express'
import dotenv from 'dotenv'
import restaurantRoutes from './routes/restaurant'
import cors from 'cors'
dotenv.config()

const PORT = process.env.NODE_PORT || 5005
const app = express()

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
      origin: [
        "http://127.0.0.1:5173",
        "http://localhost:5173",
        // "https://restaurant-client-ecru.vercel.app",
        // "https://restaurant-server-k5jh.onrender.com",
        "http://localhost:5005",
      ],
      methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
      allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
      credentials: true, 
    })
  );
  
  app.use("/user-service/restaurant/", restaurantRoutes)


app.listen(PORT, (error: any) => {
    if(error) throw error
    console.log(`SERVER IS RUNNING ON PORT: http://localhost:${PORT}`);
});


