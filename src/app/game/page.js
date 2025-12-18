import Game from '@/components/Game'
import React from 'react'

function page() {
  return (
    <div className='bg-[#FCFCFC] py-10 p-5 md:py-5 flex items-start md:items-center w-screen h-screen justify-center'>
        <Game />
    </div>
  )
}

export default page