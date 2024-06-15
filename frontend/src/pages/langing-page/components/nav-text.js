import React from 'react'

export default function NavText({text, href}) {
  return (
    <div className="uppercase text-white cursor-pointer hover:text-primary transition-colors ">
        <a className='w-full h-full' href={href}>
            {text}
        </a>
    </div>
  )
}
