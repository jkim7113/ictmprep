import { connectToDB } from "@/config/db"
import Question from "@/models/question"
import { NextRequest, NextResponse } from 'next/server'
 
export async function GET(request: NextRequest, { params }: { params: Promise<{ year: number, subject: string }> }) {
  try {
        const year = (await params).year
        const subject = ((await params).subject).replaceAll("%20"," ")

        if (!year || !subject){
            return NextResponse.json("Year and subject are required", { status: 404 })
        }

        await connectToDB()
        const questions = await Question.find({ subject: subject, year: year }).sort({ number: 1 })
        if (questions.length == 0) return NextResponse.json("Please enter a valid year", { status: 404 })
        return NextResponse.json(questions, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json("Failed to process the request", { status: 500 })
    }
}
