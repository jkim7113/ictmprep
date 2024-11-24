"use client"

import Form from '@/components/Form'
import { QuestionData } from '@/components/QuestionCard'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect,  FormEvent, ChangeEvent } from 'react'

type Props = {}

const create = (props: Props) => {
  const router = useRouter()
  const options = ["Algebra II", "Algebra I", "Geometry", "Precalculus"]
  const [ selectedSubject , setSelectedSubject ] = useState(0)
  const [ data, setData ] = useState<QuestionData>({ question: "", subject: "", answers: [""] })

  async function handleSubmit(e: FormEvent){
        e.preventDefault()
        
        if (!data.question || !data.subject || !data.answers){
            alert("Question, subject, and answers are required.")
        }

        try {
            const res = await fetch("/api/question", {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(data),
            });
      
            if (res.ok) {
                alert("Question added")
                router.refresh()
            } else {
              throw new Error("Failed to upload the question");
            }
        } catch (error) {
            console.log(error);
        }
  }

  useEffect(() => {
    setData({ ...data, subject: options[selectedSubject] })
  }, [selectedSubject])

  return (
    <Form label="🔼 Create New Question"  handleSubmit={handleSubmit} data={data} setData={setData} selectedSubject={selectedSubject} setSelectedSubject={setSelectedSubject}/>
  )
}

export default create