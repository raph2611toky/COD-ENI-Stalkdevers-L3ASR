import React from 'react'

export default function Feature({ icon, title, text }) {
    return (
        <div className="bg-features p-10 max-w-80 flex flex-col gap-6 rounded-xl">
            <img src={icon} className="w-12" />
            <h3 className="text-2xl font-extrabold"> {title}</h3>
            <p>{text}</p>
        </div>
    )
}
