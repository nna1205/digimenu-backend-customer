"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./routes/store/index"));
const index_2 = __importDefault(require("./routes/menucategory/index"));
const index_3 = __importDefault(require("./routes/menuitem/index"));
const index_4 = __importDefault(require("./routes/optiongroup/index"));
const index_5 = __importDefault(require("./routes/optionitem/index"));
const index_6 = __importDefault(require("./routes/order/index"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;
app.use("/api/v1/store", index_1.default);
app.use("/api/v1/menucategory", index_2.default);
app.use("/api/v1/menuitem", index_3.default);
app.use("/api/v1/optiongroup", index_4.default);
app.use("/api/v1/optionitem", index_5.default);
app.use("/api/v1/order", index_6.default);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        app.listen(port, () => {
            console.log(`Server Running here 👉 http://localhost:${port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
start();
