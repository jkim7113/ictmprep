import { NextRequest, NextResponse } from "next/server"
import { connectToDB } from "@/config/db"
import Question from "@/models/question"

export async function GET(request: NextRequest){
    try {
        await connectToDB()
        const questions = await Question.find({})
        return new NextResponse(JSON.stringify(questions), { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse("Failed to process the request", { status: 500 })
    }
}