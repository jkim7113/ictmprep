"use client"

import React from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'
import Dropdown from '@/components/Dropdown'

type Props = {}

const page = (props: Props) => {
  const now = dayjs()
  const regionalDate = dayjs("2025-02-22")
  const daysLeft = regionalDate.diff(now, 'days')
  const options = ["Algebra II", "Algebra I", "Geometry", "Precalculus"]
  
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
              <section className='dashboard-section !py-2 lg:w-1/2 flex justify-between gap-3'>
                <Dropdown options={options} />
                <button title="Random Question" className="px-2 py-1.5 my-auto border rounded-md transition border-gray-400 hover:bg-gray-400">🎲</button>
              </section>
              <section className='dashboard-section'>
                <Link title="Saved" href="/saved" className='mr-2'>💾 13</Link>
                <Link title="Streaks" href="/ranking">🔥 124</Link>
              </section>
            </div>
          </header>
          <main className='bg-bright rounded-md p-3 mt-4 h-screen shadow-md'>

          </main>
        </div>
    </div>
  )
}

export default page