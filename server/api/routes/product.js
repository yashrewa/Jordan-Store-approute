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
const db_1 = require("../db/db");
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default('sk_test_51NwPdDSFBQprCYehxbsiZziOEipmZSfqQ3Xw824yBT5SPtUlLHli3UiqRcTEF3LYF9Bs2FQBfVXNYJxLqPgheRGx00sbAEFHTi', {
    apiVersion: '2023-08-16',
    typescript: true
});
const router = express_1.default.Router();
router.get('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield db_1.Product.find({});
    res.json({ message: "hello", data: product });
}));
router.get('/product/:slug', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.slug;
    const product = yield db_1.Product.findById(slug);
    console.log(product);
    res.json({ message: "hello", data: product });
}));
router.get('/categories', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield db_1.Category.find({}).populate('product');
    // console.log(categories)
    res.json({ message: 'success', data: categories });
}));
router.get('/categories/:slug', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const catName = req.params.slug;
    const categoryProducts = yield db_1.Category.findOne({ name: catName }).populate('product');
    // console.log(categoryProducts)
    res.json({ message: "success", data: categoryProducts });
    // console.log(catName)
}));
router.post('/create-checkout-session', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { items } = req.body;
        console.log(req.body);
        const tranformedItems = items.map((item) => ({
            price_data: {
                currency: 'INR',
                product_data: {
                    name: item.name,
                    images: [item.thumbnail]
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));
        const session = yield stripe.checkout.sessions.create({ line_items: tranformedItems, mode: 'payment', success_url: `https://jordan-store-lemon.vercel.app/success`, cancel_url: `https://jordan-store-lemon.vercel.app/failed` });
        res.json({
            url: session.url
        });
    }
    catch (err) {
        return res.send(err);
    }
}));
exports.default = router;
