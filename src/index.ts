import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import StoreRouter from "./routes/store/index";
import MenuCategoryRouter from "./routes/menucategory/index";
import MenuItemRouter from "./routes/menuitem/index";
import OptionGroupRouter from "./routes/optiongroup/index";
import OptionItemRouter from "./routes/optionitem/index";
import OrderRouter from "./routes/order/index";

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
const port = process.env.PORT || 3000;

app.use("/api/v1/store", StoreRouter);
app.use("/api/v1/menucategory", MenuCategoryRouter);
app.use("/api/v1/menuitem", MenuItemRouter);
app.use("/api/v1/optiongroup", OptionGroupRouter);
app.use("/api/v1/optionitem", OptionItemRouter);
app.use("/api/v1/order", OrderRouter);

const start = async () => {
    try {
        app.listen(port, () => {
            console.log(`Server Running here 👉 http://localhost:${port}`);
        })
    } catch (error) {
        console.log(error)
    }
}

start()