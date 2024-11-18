import Link from 'next/link'
import React from 'react'

type Props = {}

function Footer({}: Props) {
  return (
    <footer className="row-start-3 bg-bright flex gap-6 flex-wrap items-center justify-center">
        <div className="max-w-screen-lg p-8">
          <p>This website is not affiliated with the Illinois Council of Teachers of Mathematics (ICTM).</p>
          <span className='text-gray-500 mr-2'>Made in Champaign, Illinois.</span>
          <Link className="text-blue-600 mr-2" href="/privacy-policy">Privacy Policy</Link>
          <Link className="text-blue-600" href="mailto:ictmprep@gmail.com">Contact</Link>
        </div>
    </footer>
  )
}

export default Footer