"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const product_1 = __importDefault(require("./routes/product"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/', product_1.default);
// mongoose.connect(`${process.env.MONGODB_CONNECT_URI}`)
mongoose_1.default.connect(`mongodb+srv://yashrewa00:21Savage@cluster0.fngj58u.mongodb.net/nike?retryWrites=true&w=majority`);
const PORT = process.env.PORT || 3000;
app.listen(PORT);
