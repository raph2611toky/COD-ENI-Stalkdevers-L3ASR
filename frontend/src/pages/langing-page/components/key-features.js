import React from 'react'
import Feature from './feature'
import Title from './title'
import { gradientBgImage, icon1 } from '../assests'
import Animate from './animate-translate'

export default function KeyFeatures() {
    return (
        <div className="relative" id="fonctionalite">
        <img src={gradientBgImage} className="absolute -z-10 -left-72 -top-72"/>
        <img src={gradientBgImage} className="absolute -z-10 -right-96 -bottom-96"/>

            <Animate
                hidden={{ opacity: 0 }}
                visible={{ opacity: 1 }}
                delay={0.6}
                duration={1}
            >
                <Title text="Key Features" />

            </Animate>
            <div className="flex flex-wrap justify-center gap-12 pt-12">
                <Animate
                    hidden={{ opacity: 0, translateY: -10 }}
                    visible={{ opacity: 1, translateY: 0 }}
                    delay={0.4}
                    duration={2}
                    stiffness={200}
                >

                    <Feature
                        title="Easy to Use"
                        text="Simplify your workflow with our intuitive and user-friendly interface."
                        icon={icon1}
                    />
                </Animate>
                <Animate
                    hidden={{ opacity: 0, translateY: -10 }}
                    visible={{ opacity: 1, translateY: 0 }}
                    delay={0.7}
                    duration={2}
                    stiffness={200}
                >

                    <Feature
                        title="Easy to Use"
                        text="Simplify your workflow with our intuitive and user-friendly interface."
                        icon={icon1}
                    />
                </Animate>
                <Animate
                    hidden={{ opacity: 0, translateY: -10 }}
                    visible={{ opacity: 1, translateY: 0 }}
                    delay={1}
                    duration={2}
                    stiffness={200}
                >

                    <Feature
                        title="Easy to Use"
                        text="Simplify your workflow with our intuitive and user-friendly interface."
                        icon={icon1}
                    />
                </Animate>
                <Animate
                    hidden={{ opacity: 0, translateY: -10 }}
                    visible={{ opacity: 1, translateY: 0 }}
                    delay={1.3}
                    duration={2}
                    stiffness={200}
                >

                    <Feature
                        title="Easy to Use"
                        text="Simplify your workflow with our intuitive and user-friendly interface."
                        icon={icon1}
                    />
                </Animate>
                <Animate
                    hidden={{ opacity: 0, translateY: -10 }}
                    visible={{ opacity: 1, translateY: 0 }}
                    delay={1.6}
                    duration={2}
                    stiffness={200}
                >

                    <Feature
                        title="Easy to Use"
                        text="Simplify your workflow with our intuitive and user-friendly interface."
                        icon={icon1}
                    />
                </Animate>
            </div>
        </div>
    )
}
