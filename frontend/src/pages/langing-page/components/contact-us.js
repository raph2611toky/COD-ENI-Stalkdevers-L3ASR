import React from 'react'
import Title from './title'
import Contact from './contact'
import Animate from './animate-translate'

export default function ContactUs() {
    return (
        <div>
            <Animate
                hidden={{ opacity: 0, translateX: -10 }}
                visible={{ opacity: 1, translateX: 0 }}
                delay={0.9}
            >

                <Title text="Contact Us" />
            </Animate>
            <div className="flex gap-40 flex-wrap">
                <Animate
                    hidden={{ opacity: 0, translateY: -10 }}
                    visible={{ opacity: 1, translateY: 0 }}
                    delay={0.9}
                >

                    <Contact
                        title="Phone"
                        text="+1 123-456-7890" />
                </Animate>

                <Animate
                    hidden={{ opacity: 0, translateY: -10 }}
                    visible={{ opacity: 1, translateY: 0 }}
                    delay={1.2}
                >

                    <Contact
                        title="Email"
                        text="info@example.com" />
                </Animate>
                <Animate
                    hidden={{ opacity: 0, translateY: -10 }}
                    visible={{ opacity: 1, translateY: 0 }}
                    delay={1.5}
                >

                    <Contact
                        title="Address"
                        text="123 Main St, City, State, Country" />

                </Animate>
            </div>
        </div>
    )
}
