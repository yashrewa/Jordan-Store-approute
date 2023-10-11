import { connect } from "@/app/dbConfig/dbConfig";
import { Product, Category } from "@/app/models/db";
import { NextResponse } from "next/server";

connect();

export async function GET(req, res) {
    const categories = await Category.find({}).populate('product')
    return NextResponse.json({message: "success", data: categories})
}