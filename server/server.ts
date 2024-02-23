import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import productRoutes from './routes/product'


const app = express()


app.use(cors())
app.use(express.json())

app.use('/', productRoutes)

// mongoose.connect(`${process.env.MONGODB_CONNECT_URI}`)
mongoose.connect(`mongodb+srv://yashrewa00:21Savage@cluster0.fngj58u.mongodb.net/nike?retryWrites=true&w=majority`)


const PORT = process.env.PORT || 3000;

app.listen(PORT)
