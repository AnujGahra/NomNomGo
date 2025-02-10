"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const connectDB_1 = __importDefault(require("./db/connectDB"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookieParser = require("cookie-parser");
const cors_1 = __importDefault(require("cors"));
const restaurant_route_1 = __importDefault(require("./routes/restaurant.route"));
const menu_route_1 = __importDefault(require("./routes/menu.route"));
const order_route_1 = __importDefault(require("./routes/order.route"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// default middleware
app.use(body_parser_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
app.use(express_1.default.json());
app.use(cookieParser());
const corsOption = {
    origin: "http://localhost:5173",
    credentials: true
};
app.use((0, cors_1.default)(corsOption));
// api
app.use("api/v1/user", user_route_1.default);
app.use("api/v1/restaurant", restaurant_route_1.default);
app.use("api/v1/menu", menu_route_1.default);
app.use("api/v1/order", order_route_1.default);
app.listen(PORT, () => {
    (0, connectDB_1.default)();
    console.log(`Server is running at PORT: ${PORT}`);
});
