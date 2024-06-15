import React from 'react'

export default function ({order, title, text }) {
  return (
    <div className="max-w-sm flex flex-col gap-3">
        <div className="flex items-center pr-8">
            <div className="text-3xl text-primary p-4 px-6 rounded-full bg-contrast">{order}</div>
            <div className="h-2 w-full bg-linear"></div>
        </div>
        <div>
            <h3 className="text-3xl font-bold leading-loose">{title}</h3>
            <p>{text}</p>
        </div>
    </div>
  )
}
