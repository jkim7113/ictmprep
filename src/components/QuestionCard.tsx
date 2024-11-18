"use client"

import React, { FormEvent, useRef } from 'react'

import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css'
import MathInput from 'react-math-keyboard';

export type QuestionData = {
  question: string
  year?: number
  tag?: string
  subject: string
  image?: string
  answers: string[]
}

type Props = {
  data: QuestionData
  className: string
}

const delimiterOptions = [
  { left: '$$', right: '$$', display: true },
  { left: '\\(', right: '\\)', display: false },
  { left: '$', right: '$', display: false },
  { left: '\\[', right: '\\]', display: true },
]

function Card({ className, data: { question, year, tag, subject, image } }: Props) {
  const inputRef = useRef<HTMLFormElement>(null)
  function handleSubmit(e: FormEvent){
    e.preventDefault()

  }

  return (
    <div className={`${className} lg:w-[768px] rounded-lg min-h-80 p-6 drop-shadow-lg bg-bright`}>
      <header className='text-lg font-semibold drop-shadow-md'>{year} ICTM {subject} ({tag})</header>
      <p className='text-lg font-serif mt-2 pb-18'>
        <Latex delimiters={delimiterOptions}>{question}</Latex>
      </p>
      <form className='absolute left-0 bottom-6 w-full px-6 flex flex-wrap gap-3 justify-between' onSubmit={handleSubmit} >
        <input className="outline-none p-3 w-full md:w-2/3 rounded-md" type="text" placeholder="Please separate your answers with commas."></input>
        <button type='submit' className='py-3 px-4 bg-blue-600 text-bright rounded-md'>Submit</button>
      </form>
    </div>
  )
}

export default Card