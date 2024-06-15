import React from 'react'
import Title from './title'
import Animate from './animate-translate'

export default function About() {
  return (
    <div className="pt-10" id="about">
      <Animate
        hidden={{ opacity: 0, translateX: -20 }}
        visible={{ opacity: 1, translateX: 0 }}
        delay={0.9}
      >
        <Title text="About" />

      </Animate>

      <Animate
        hidden={{ opacity: 0, translateX: 30 }}
        visible={{ opacity: 1, translateX: 0 }}
        delay={0.9}
      >

        <p className="max-w-4xl text-xl leading-loose">
          Welcome to our light and colorful landing page! Here, we provide a brief introduction and overview of our product or service. We believe in creating a visually appealing experience for our users, which is why we have designed this landing page with multiple colors. Our goal is to capture your attention and make your browsing experience enjoyable. So, sit back, relax, and explore what we have to offer!
        </p>
      </Animate>
    </div>
  )
}
