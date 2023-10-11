import { connect } from "@/app/dbConfig/dbConfig";
import { Product } from "@/app/models/db";
import { NextResponse } from "next/server";

connect();

export async function GET(req, res) {
    const product = await Product.find({})
    return NextResponse.json({message: "hello", data: product})
}