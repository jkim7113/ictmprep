import { NextRequest, NextResponse } from "next/server"
import { connectToDB } from "@/config/db"
import Question from "@/models/question"
import { QuestionData } from "@/components/QuestionCard";

// Returns Question of the Day
export async function GET(request: NextRequest){
    try {
        await connectToDB()

        // Get the current date (e.g., '2024-11-18')
        const dateStr = new Date().toISOString().split('T')[0];
        // Use a hash function on the date string to generate a pseudo-random index
        const hash = Array.from(dateStr).reduce((acc, char) => acc + char.charCodeAt(0), 0);
        // Get the total number of documents in the collection
        const count = await Question.countDocuments();
        const randomIndex = hash % count;

        const questions = await Question.find().skip(randomIndex).limit(1)  
        return NextResponse.json(questions, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json("Failed to process the request", { status: 500 })
    }
}

export async function POST(request: NextRequest){
    try {
        const requestData: QuestionData = await request.json()
        
        if (!requestData["question"] || !requestData["subject"] || !requestData["answers"]){
            NextResponse.json("Question, subject, and answers are required", { status: 400 })
        }
        
        await connectToDB()
        await Question.create(requestData)
        return NextResponse.json("Question created", { status: 201 })
    } catch (error) {
        console.log(error)
        return NextResponse.json("Failed to create the question", { status: 500 })
    }
}