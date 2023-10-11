import { connect } from "@/app/dbConfig/dbConfig";
import { Product, Category } from "@/app/models/db";
import { NextResponse } from "next/server";

connect();

export async function GET(req, res) {

    const {slug} = res.params
    const product = await Product.findById(slug)
    return NextResponse.json({message: "success", data: product})
}