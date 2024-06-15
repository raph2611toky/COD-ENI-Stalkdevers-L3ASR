import React from "react";
import Button from "./button";
import { bannerLeftImage, bgBanner } from "../assests";

import Animate from "./animate-translate";

export default function Banner() {
    return (
        <div className="flex gap-0 w-full"  id="accueil">
            <div className="min-w-[45%] flex flex-col gap-8">
                <div>
                    <Animate
                        hidden={{ opacity: 0, translateX: -90 }}
                        visible={{ opacity: 1, translateX: 0 }}
                    >
                        <h1 className="text-white text-6xl sm:text-4xl md:text-4xl font-bold leading-snug">Facilitez vos démarches administratives avec</h1>
                    </Animate>
                    <Animate
                        hidden={{ opacity: 0, translateX: -90 }}
                        visible={{ opacity: 1, translateX: 0 }}
                        delay={0.2}
                    >
                        <h1 className="text-primary  text-6xl font-bold  leading-snug">CitizenConnect</h1>

                    </Animate>
                </div>
                <Animate
                    hidden={{ opacity: 0, translateX: -90 }}
                    visible={{ opacity: 1, translateX: 0 }}
                    delay={0.5}
                >
                    <h3 className="pb-10 text-white text-xl leading-relaxed">
                        Accédez à tous vos services gouvernementaux en un seul endroit.<br />
                        Rapide, sécurisé, et facile d'utilisation.
                    </h3>
                </Animate>
                <Animate
                    hidden={{ opacity: 0, translateY: 100 }}
                    visible={{ opacity: 1, translateY: 0 }}
                    delay={0.9}
                >
                    <div className="flex gap-10">
                        <Button order="primary" text="Commencer" />
                        <Button order="secondary" text="S'inscrire" />
                    </div>
                </Animate>

            </div>
            <Animate
                hidden={{ opacity: 0, translateX: 100 }}
                visible={{ opacity: 1, translateX: 0 }}
                delay={0.6}
            >

                <div className="relative min-w-[70%]">

                    <img src={bannerLeftImage} />
                    <img src={bgBanner} className="-z-10 absolute -top-32 right-0" />

                </div>
            </Animate>
        </div>
    );
}
