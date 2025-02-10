import dotenv from "dotenv"
dotenv.config();
import express, {Express, Request, Response} from "express";
import connectDB from "./db/connectDB";
import userRoute from "./routes/user.route";
import bodyParser from "body-parser";
import cookieParser = require("cookie-parser");
import cors from "cors";
import restaurantRoute from "./routes/restaurant.route";
import menuRoute from "./routes/menu.route";
import orderRoute from "./routes/order.route";

const app: Express = express();
const PORT = process.env.PORT || 3000

// default middleware
app.use(bodyParser.json({limit: '10mb'}));
app.use(express.urlencoded({extended:true, limit: '10mb'}));
app.use(express.json());
app.use(cookieParser());
const corsOption = {
    origin:"http://localhost:5173",
    credentials:true
}
app.use(cors(corsOption));


// api
app.use("api/v1/user", userRoute);
app.use("api/v1/restaurant", restaurantRoute);
app.use("api/v1/menu", menuRoute);
app.use("api/v1/order", orderRoute);


app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running at PORT: ${PORT}`)
})
