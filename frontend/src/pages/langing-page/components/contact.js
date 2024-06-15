import React from 'react'

export default function Contact({ title, text }) {
    return (
        <div>
            <div >
                <h3 className="text-2xl font-extrabold"> {title}</h3>
                <p>{text}</p>
            </div>
        </div>
    )
}
