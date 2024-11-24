import { NextRequest, NextResponse } from "next/server"
import { connectToDB } from "@/config/db"
import Question from "@/models/question"

// Returns a list of years available
export async function GET(request: NextRequest, { params }: { params: Promise<{ subject: string }> }){
    const subject = ((await params).subject).replaceAll("%20"," ")
    if (!subject) throw new Error("Subject is missing")

    try {
        await connectToDB()
        const years = await Question.find({ subject: subject }).distinct("year")
        return NextResponse.json(years, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json("Failed to process the request", { status: 500 })
    }
}

