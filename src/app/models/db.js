import mongoose from 'mongoose'

const productShema = new mongoose.Schema({
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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }
    ]
})

const categorySchema = new mongoose.Schema({
    name: String,
    product: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})

const orderSchema = new mongoose.Schema({
    stripeId: String,
    product: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})


export const Product = mongoose.models.Product || mongoose.model('Product', productShema);
export const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
