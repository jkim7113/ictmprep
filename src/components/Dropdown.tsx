"use client"

import Image from 'next/image'
import React, { useState, useRef, useEffect, } from 'react'

type Props = {
    options: string[]
}

const Dropdown = ({ options }: Props) => {
  const [ isOpen, setIsOpen ] = useState(false)
  const [ selected, setSelected ] = useState(0)
  const dropdownRef = useRef<HTMLElement>(null)

  const checkIfClickedOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setIsOpen(false)
  }

  useEffect(() => {
    document.body.addEventListener("click", checkIfClickedOutside)
    return () => {
      document.body.removeEventListener("click", checkIfClickedOutside)
    }
  }, [])

  return (
    <span className="inline-block cursor-pointer select-none py-2" ref={dropdownRef}>
        <span className='flex gap-3 my-auto' onClick={() => setIsOpen(!isOpen)}>
            <Image src="/icons/arrow-downward.svg" className="" width={16} height={16} alt="arrow-downward" />
            <label className='bg-gradient-to-r from-sky-600 via-sky-700 to-blue-600 bg-clip-text text-transparent'>{options[selected]}</label>
        </span>
        <div className={`${isOpen ? "block" : "hidden"} rounded-md border shadow-lg bg-bright  border-gray-400 absolute mt-5`}>
            {   
                options.map((option, index) => {
                    if (index !== selected){
                        return <div onClick={() => { setSelected(index); setIsOpen(false) }} className="py-2 px-3 rounded-md transition hover:bg-gray-200" key={option}>{option}</div>
                    }
                })
            }
        </div>
    </span>
  )
}

export default Dropdown