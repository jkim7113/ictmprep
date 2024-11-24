import { NextRequest, NextResponse } from "next/server"
import { connectToDB } from "@/config/db"
import Question from "@/models/question"

// Returns a list of years available
export async function GET(request: NextRequest, { params }: { params: Promise<{ subject: string, year: number }> }){
    try {
        const year = (await params).year
        const subject = (await params).subject

        if (!year || !subject){
            return NextResponse.json("Year and subject are required", { status: 404 })
        }
        await connectToDB()
        const numbers = await Question.find({ subject: subject, year: year }).distinct("number")
        return NextResponse.json(numbers, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json("Failed to process the request", { status: 500 })
    }
}