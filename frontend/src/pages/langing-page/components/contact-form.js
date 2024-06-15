import React from 'react'
import { Input } from './input'
import Button from './button'
import Animate from './animate-translate'

export default function ContactForm() {
    return (

        <div className="min-w-96 flex flex-col gap-10" id="contact">
         <Animate
                    hidden={{ opacity: 0, translateY: -10 }}
                    visible={{ opacity: 1, translateY: 0 }}
                    delay={0.5}
                    duration={2}
                    stiffness={200}
                >


            <h1 className="text-6xl font-bold">Get in Touch</h1>
                </Animate>
                <Animate
                    hidden={{ opacity: 0, translateY: 10 }}
                    visible={{ opacity: 1, translateY: 0 }}
                    delay={0.5}
                    duration={2}
                    stiffness={200}
                >

            <div className="flex items-center gap-10 ">

                <label htmlFor='email'>Mail</label>
                <input
                    id="email"
                    placeholder="mail"
                    type="email"
                    className="py-4 px-5 rounded-xl border border-white border-5 focus:text-black bg-secondary"
                />
                <label htmlFor="message">Your message</label>
                <textarea id="Message" placeholder="write for us"
                    className="py-4 px-5 h-16 rounded-xl border border-white border-5 focus:text-black bg-secondary"></textarea>
                <Button text="Send" order="primary" />
            </div>
                </Animate>
        </div>

    )
}
