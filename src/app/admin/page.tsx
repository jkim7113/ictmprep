import React from 'react'
import Create from './create'
import Update from './update'

type Props = {}

const page = (props: Props) => {

  return (
    <div className='gradient center'>
        <div className='row-start-2 max-w-screen-lg w-full'>
            <header className='text-center mb-8'>
                <h2 className='text-3xl font-bold text-shadow text-bright'>ADMIN DASHBOARD</h2>
            </header>
            <main className='bg-bright p-6 rounded-md shadow-md min-h-screen flex flex-col justify-between gap-8'>
                <Create />
                <Update />
            </main>
        </div>
    </div>
  )
}

export default page