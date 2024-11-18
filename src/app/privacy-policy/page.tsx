import React from 'react'
import PrivacyMdx from '@/markdown/privacypolicy.mdx'

const page = () => {
  return (
    <div className='gradient center'>
      <main className='bg-bright row-start-2 p-4 sm:p-12 rounded-lg max-w-screen-lg text-left shadow-md prose prose-a:text-blue-600'>
        <PrivacyMdx />
      </main>
    </div>
  )
}

export default page