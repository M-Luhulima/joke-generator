"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("../routes/routes"));
const connection_1 = __importDefault(require("../database/connection"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || "5000";
//middleware config
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Connect to the database
(0, connection_1.default)();
// Load favorite joke routes
app.use("/api/favorite-jokes", routes_1.default);
app.listen(port, () => {
    console.log(`Server connected to http://localhost:${port}`);
});
