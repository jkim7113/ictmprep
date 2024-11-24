"use client"

import React, { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'
import Dropdown from '@/components/Dropdown'
import QuestionCard, { QuestionData } from '@/components/QuestionCard'

type Props = {}

const page = (props: Props) => {
  const now = dayjs()
  const regionalDate = dayjs("2025-02-22")
  const daysLeft = regionalDate.diff(now, 'days')

  const subjects = ["Algebra II", "Algebra I", "Geometry", "Precalculus"]
  const [ selectedSubject, setSelectedSubject ] = useState(0)

  const [ isLoading, setIsLoading ] = useState(true)
  const [ isNoResult, setIsNoResult ] = useState(false)

  const [ years, setYears ] = useState(["Year"])
  const [ selectedYear, setSelectedYear ] = useState(0)

  const [ selectedNumber, setSelectedNumber] = useState(0)

  const [ data, setData ] = useState<QuestionData[]>([ { question: "", subject: "", answers: [""] } ])

  useEffect(() => {
    fetch(`/api/question/${subjects[selectedSubject]}/years`).then(res => res.json())
    .then(res => {
      if (res.length == 0){
        setIsNoResult(true)
        return setYears(["No Result"])
      }
      setIsNoResult(false)
      setYears(res)
    })
  }, [selectedSubject])

  useEffect(() => {
    const year = Number(years[selectedYear])
    if (Number.isNaN(year)) return
    fetch(`/api/question/${subjects[selectedSubject]}/${years[selectedYear]}`).then(res => res.json())
    .then(res => {
      setData(res)
      setIsLoading(false)
    })
  }, [selectedYear, years])
  
  return (
    <div className='gradient center'>
        <div className="row-start-2 max-w-screen-lg text-left w-full px-2 lg:px-4">
          <header>
            <h2 className='text-4xl font-bold text-shadow text-white'>Dashboard</h2>
            <span className="text-gray-700 text-md inline-block mt-4 bg-bright p-2 rounded-md shadow-md">
            ⚠️ You're not currently logged in. Please <Link href="/login" className='text-blue-600'>log in</Link> to save your progress across devices.
            </span>
            <div className='flex flex-wrap justify-between gap-3 mt-4 p-3 bg-gray-200/40 backdrop-blur-lg rounded-md'>
              <section className='dashboard-section'>
                <span className='bg-gradient-to-r from-orange-600 via-orange-700 to-red-600 bg-clip-text text-transparent'>{daysLeft}</span> days left until regionals
              </section>
              <section className='dashboard-section !py-2 lg:w-1/2 flex justify-between gap-4'>
                <Dropdown selected={selectedSubject} setSelected={setSelectedSubject} options={subjects} />
                <button title="Random Question" className="px-2 py-1.5 my-auto border rounded-md transition border-gray-400 hover:bg-gray-400">🎲</button>
              </section>
              <section className='dashboard-section'>
                <Link title="Saved" href="/saved" className='mr-2'>💾 13</Link>
                <Link title="Streaks" href="/ranking">🔥 124</Link>
              </section>
            </div>
          </header>
          <main className='bg-bright rounded-md p-3 mt-4 min-h-[50vh] shadow-md flex flex-wrap gap-x-3 items-start'>
          <Dropdown selected={selectedYear} setSelected={setSelectedYear} options={years} className='bg-white !p-3 rounded-md' labelGradient='from-gray-700 to-gray-700'/>
              {
                isLoading ? <p className=''>loading...</p> : 
                isNoResult? <p className=''>No Result...</p> : 
                  <>
                    <div className='py-2'>
                      { // Fuck TypeScript
                        data.map((d, index) => 
                        <button className={`${index === selectedNumber ? "text-blue-600 font-semibold" : "text-gray-400"} hidden w-9 h-9 text-center sm:inline-block transition hover:text-blue-600 hover:bg-gray-200 rounded-full`} 
                          key={d.question} onClick={() => setSelectedNumber(d.number && (d.number - 1) || 0)}
                        >{d.number}</button>
                        )
                      }
                    </div>
                    <QuestionCard showNumberOnly={true} key={data[selectedNumber].question} data={data[selectedNumber]} />
                  </>
              }
          </main>
        </div>
    </div>
  )
}

export default page