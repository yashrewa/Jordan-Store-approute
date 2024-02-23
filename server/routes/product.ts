import express, {Request, Response} from 'express'
import {Product, Category, Order} from '../db/db'
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51NwPdDSFBQprCYehxbsiZziOEipmZSfqQ3Xw824yBT5SPtUlLHli3UiqRcTEF3LYF9Bs2FQBfVXNYJxLqPgheRGx00sbAEFHTi', {
    apiVersion: '2023-08-16',
    typescript: true
});

interface Item {
    name: string;
    price: number;
    quantity: number;
    thumbnail: string;
}


const router = express.Router()

router.get('/products', async (req : Request, res : Response) => {
    const product = await Product.find({})
    res.json({message: "hello", data: product})
})

router.get('/product/:slug', async (req : Request, res : Response) => {
    const slug = req.params.slug;
    const product = await Product.findById(slug)
    console.log(product)
    res.json({message: "hello", data: product})
})


router.get('/categories', async (req : Request, res : Response) => {
    const categories = await Category.find({}).populate('product')
    // console.log(categories)
    res.json({message: 'success', data: categories})
})

router.get('/categories/:slug', async (req : Request, res : Response) => {
    const catName = req.params.slug
    const categoryProducts = await Category.findOne({name: catName}).populate('product')
    // console.log(categoryProducts)
    res.json({message: "success", data: categoryProducts})
    // console.log(catName)
})

router.post('/create-checkout-session', async (req, res : Response) => {
    try {
        const {items} = req.body;
        console.log(req.body);
        const tranformedItems = items.map((item : Item) => ({
            price_data: {
                currency: 'INR',
                product_data: {
                    name: item.name,
                    images: [item.thumbnail]
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        const session = await stripe.checkout.sessions.create({line_items: tranformedItems, mode: 'payment', success_url: `https://jordan-store-lemon.vercel.app/success`, cancel_url: `https://jordan-store-lemon.vercel.app/failed`});

        res.json({
            url: (session as any).url
        });
    } catch (err) {
        return res.send(err)
    }
});


export default router;
