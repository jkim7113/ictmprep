import { connectToDB } from "@/config/db"
import Question from "@/models/question"
import { NextRequest, NextResponse } from 'next/server'
import { QuestionData } from "@/components/QuestionCard"
 
export async function GET(request: NextRequest, { params }: { params: Promise<{ number: number, year: number, subject: string }> }) {
  try {
        const number = (await params).number
        const year = (await params).year
        const subject = (await params).subject

        if (!year || !subject || !number){
          return NextResponse.json("Year, subject, and number are required", { status: 404 })
        }

        await connectToDB()
        const question = await Question.find({ subject: subject, year: year, number:number })
        if (!question) return NextResponse.json("Couldn't find the question", { status: 404 })
        return NextResponse.json(question, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json("Failed to process the request", { status: 500 })
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ number: number, year: number, subject: string }> }) {
    try {
          const number = (await params).number
          const year = (await params).year
          const subject = (await params).subject

          if (!year || !subject || !number){
            return NextResponse.json("Year, subject, and number are required", { status: 404 })
          }
        
          const requestData: QuestionData = await request.json()
        
          if (!requestData["question"] || !requestData["subject"] || !requestData["answers"]){
            NextResponse.json("Question, subject, and answers are required", { status: 400 })
          }

          await connectToDB()
          const question = await Question.findOneAndReplace({ subject: subject, year: year, number:number }, requestData, { returnDocument: "before" })
          return NextResponse.json(question, { status: 200 })
      } catch (error) {
          console.log(error)
          return NextResponse.json("Failed to process the request", { status: 500 })
      }
  }
  