import { connect } from "@/app/dbConfig/dbConfig"
import { Product, Category } from "@/app/models/db"
import { NextResponse } from "next/server";



connect()

export async function GET(req, res) {
    const {slug} = res.params
    const catName = slug
    const categoryProducts = await Category.findOne({name: catName}).populate('product')
    return NextResponse.json({message: "success", data: categoryProducts})
}