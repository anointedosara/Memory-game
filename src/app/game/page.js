import Game from '@/components/Game'
import React from 'react'

function page() {
  return (
    <div className='bg-[#FCFCFC] w-screen h-screen py-10 p-5 md:py-5 flex items-start md:items-center justify-center'>
        <Game />
    </div>
  )
}

export default page