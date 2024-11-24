"use client"

import Dropdown from '@/components/Dropdown'
import Form from '@/components/Form'
import { QuestionData } from '@/components/QuestionCard'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect,  FormEvent, ChangeEvent } from 'react'

type Props = {}

const update = (props: Props) => {
  const router = useRouter()
  const subjects = ["Algebra II", "Algebra I", "Geometry", "Precalculus"]

  const [ selectedSubject , setSelectedSubject ] = useState(0)

  const [ years, setYears ] = useState(["Year"])
  const [ selectedYear, setSelectedYear ] = useState(0)
  const [ numbers, setNumbers ] = useState(['0'])
  const [ selectedNumber, setSelectedNumber ] = useState(0)
  const [ selectedSubjectToChange , setSelectedSubjectToChange ] = useState(0)

  const [ data, setData ] = useState<QuestionData>({ question: "", subject: "", answers: [""] })

  async function handleSubmit(e: FormEvent){
        e.preventDefault()
        
        if (!data.question || !data.subject || !data.answers){
            alert("Question, subject, and answers are required.")
        }

        try {
            const res = await fetch(`/api/question/${subjects[selectedSubject]}/${years[selectedYear]}/${numbers[selectedNumber]}`, {
              method: "PUT",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(data),
            });
      
            if (res.ok) {
              res.json().then(json => {
                alert(`Question updated from ${json}`)
                router.refresh()
              }) 
            } else {
              throw new Error("Failed to upload the question");
            }
        } catch (error) {
            console.log(error);
        }
  }

  useEffect(() => {
    fetch(`/api/question/${subjects[selectedSubject]}/years`).then(res => res.json())
    .then(res => {
      if (res.length == 0){
        return setYears(["No Result"])
      }
      setYears(res)
    })
  }, [selectedSubject])

  useEffect(() => {
    const year = Number(years[selectedYear])
    if (Number.isNaN(year)) return
    fetch(`/api/question/${subjects[selectedSubject]}/${years[selectedYear]}/numbers`).then(res => res.json())
    .then(res => {
      if (res.length == 0){
        return setYears(["No Result"])
      }
      setNumbers(res)
    })
  }, [selectedYear, years])

  useEffect(() => {
    const number = Number(numbers[selectedNumber])
    if (!number) return
    fetch(`/api/question/${subjects[selectedSubject]}/${years[selectedYear]}/${numbers[selectedNumber]}`).then(res => res.json())
    .then(res => {
      if (res.length == 0){
        return setYears(["No Result"])
      }
      setData(res[0])
      setSelectedSubjectToChange(selectedSubject)
    })
  }, [selectedNumber, numbers])

  useEffect(() => {
    setData({ ...data, subject: subjects[selectedSubjectToChange] })
  }, [selectedSubjectToChange])

  return (
    <section>
      <div>
          <h3 className='text-xl font-semibold mb-2 drop-shadow-md'>🔄 Update a Question</h3>
          <div className='flex flex-wrap gap-5'>
            <Dropdown selected={selectedSubject} setSelected={setSelectedSubject} options={subjects} />
            <Dropdown selected={selectedYear} setSelected={setSelectedYear} options={years} labelGradient='from-gray-700 to-gray-700'/>
            <div className='my-auto'>
              {
                numbers.map((_, index) => {
                  return <button key={index} 
                  onClick={() => setSelectedNumber(index)}
                  className={`${index === selectedNumber ? "text-blue-600 font-semibold" : "text-gray-400"} hidden sm:inline-block h-8 w-8 transition hover:text-blue-600 hover:bg-gray-200 text-center rounded-full`}>
                    {numbers[index]}
                  </button>
                })
              }
            </div>
          </div>
      </div>
      <Form handleSubmit={handleSubmit} data={data} setData={setData} selectedSubject={selectedSubjectToChange} setSelectedSubject={setSelectedSubjectToChange}/>
    </section>
   
  )
}

export default update