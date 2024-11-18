'use client'

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { useState, useEffect } from 'react'

type Props = {}

export default function Nav({}: Props) {
  const [ showBG, setShowBG ] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowBG(true)
      } else {
        setShowBG(false)
      }
    }
  
    window.addEventListener('scroll', handleScroll)
  
    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav className={`z-20 fixed bg-transparent ${showBG ? 'backdrop-blur-lg bg-opacity-100' : 'bg-opacity-0'} transition p-4 w-full`}>
        <div className="flex justify-between max-w-screen-lg mx-auto">
            <Link href='/' className='font-bold text-shadow text-lg my-auto text-white flex'>
              <Image className="mr-3" height="32" width="32" src="../icon.svg" alt="Logo" /> 
              <p className='my-auto'>ICTM Prep</p>
            </Link>
            <Link href='/login' className='drop-shadow-md rounded-md py-1 px-3 font-medium text-gray-700 bg-bright hover:text-blue-500 transition'>Log In</Link>
        </div>
    </nav>
  )
}