import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe('sk_test_51NwPdDSFBQprCYehxbsiZziOEipmZSfqQ3Xw824yBT5SPtUlLHli3UiqRcTEF3LYF9Bs2FQBfVXNYJxLqPgheRGx00sbAEFHTi', {
    apiVersion: '2023-08-16'
});

export async function POST(req) {
    try {
        const body = await req.json();
        const {items} = body;
        console.log(items);
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
        }))

        const session = await stripe.checkout.sessions.create({ line_items: tranformedItems, mode: 'payment', success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`, cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/failed` });
        console.log(session);
        return NextResponse.json({url: (session).url});
    } 
    catch (err) {
        console.log(err);
        return NextResponse.json({message: err})
    }


}