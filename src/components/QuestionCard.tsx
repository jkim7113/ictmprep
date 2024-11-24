"use client"

import React, { FormEvent, useState, useEffect } from 'react'

import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css'
import * as Mathlive from 'mathlive'
import Mathfield from './Mathfield';
import { grade } from '@/utils/grade';

export type QuestionData = {
  question: string
  year?: number
  tag?: string
  subject: string
  number?: number
  image?: string
  answers: string[]
}

type Props = {
  data: QuestionData
  className?: string
  showNumberOnly?: Boolean
}

const delimiterOptions = [
  { left: '$$', right: '$$', display: true },
  { left: '\\(', right: '\\)', display: false },
  { left: '$', right: '$', display: false },
  { left: '\\[', right: '\\]', display: true },
]

function Card({ className = "", showNumberOnly, data: { question, year, tag = "others", subject, answers, number, image } }: Props) {
  const [ isClient, setIsClient ] = useState(false)
  const [ response, setResponse ] = useState("")

  useEffect(() => {
    setIsClient(true)
    Mathlive.MathfieldElement.locale = 'en';
    Mathlive.MathfieldElement.decimalSeparator = ',';
    Mathlive.MathfieldElement.keypressSound = 'none';
    Mathlive.MathfieldElement.plonkSound = 'none';
  }, [])

  function handleSubmit(e: FormEvent){
    e.preventDefault()
    const responses = response.split("{,}").map(response => response.replaceAll("\\:", ""))
    const isCorrect = grade(responses, answers)
    console.log(responses, answers, isCorrect)
  }

  return (
    <div className={`${className} lg:w-[768px] rounded-lg p-6 bg-bright`}>
      <header className='text-lg font-semibold'>
        {!showNumberOnly ? `${year} ICTM` : ''} {!showNumberOnly ? subject : ''} #{number} {!showNumberOnly ? `(${tag})` : ''}
      </header>
      <p className='text-lg font-serif mt-2 pb-18 min-h-44 mb-4'>
        <Latex delimiters={delimiterOptions}>{question}</Latex>
      </p>
      <form className='w-full flex flex-wrap gap-3 justify-end' onSubmit={handleSubmit} >
        {
          isClient ? <Mathfield value={response} onChange={setResponse} className="outline-none px-2 w-full md:w-1/2 rounded-md"></Mathfield> : ''
        }
        <button type='submit' className='py-3 px-4 bg-blue-600 text-bright rounded-md'>Submit</button>
      </form>
    </div>
  )
}

export default Card