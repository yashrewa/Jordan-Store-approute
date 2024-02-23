"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.Category = exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productShema = new mongoose_1.default.Schema({
    name: String,
    subtitle: String,
    price: Number,
    originalPrice: Number,
    image: [String],
    description: String,
    size: {
        data: {
            size: String,
            enabled: Boolean
        }
    },
    thumbnail: String,
    category: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Category'
        }
    ]
});
const categorySchema = new mongoose_1.default.Schema({
    name: String,
    product: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
});
const orderSchema = new mongoose_1.default.Schema({
    stripeId: String,
    product: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
});
exports.Product = mongoose_1.default.model('Product', productShema);
exports.Category = mongoose_1.default.model('Category', categorySchema);
exports.Order = mongoose_1.default.model('Order', orderSchema);
