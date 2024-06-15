import React from "react";
import Steps from "./steps";
import Title from "./title";
import Animate from "./animate-translate";

export default function HowItWorks() {
  return (
    <div id="work" className="flex flex-col">
      <div>
        <Animate
          hidden={{ opacity: 0, translateY: 30 }}
          visible={{ opacity: 1, translateY: 0 }}
          delay={0.1}
        >
          <Title text="How It Works" />
        </Animate>
        <Animate
          hidden={{ opacity: 0, translateY: 10 }}
          visible={{ opacity: 1, translateY: 0 }}
          delay={0.3}
        >
          <h3 className="text-white text-xl">
            Learn how to use our product or service in just a few simple steps.
          </h3>
        </Animate>
      </div>
      <div className="w-full flex justify-between flex-wrap pr-24 pt-10 bg-red-500">
        <Animate
          hidden={{ opacity: 0, translateY: 20 }}
          visible={{ opacity: 1, translateY: 0 }}
          delay={0.6}
          transitionType="easeOut"
        >
          <Steps
            order={1}
            title="Step 1: Sign up"
            text="Create an account and sign up for our service. It's quick and easy!"
          />
        </Animate>
        <Animate
          hidden={{ opacity: 0, translateY: 20 }}
          visible={{ opacity: 1, translateY: 0 }}
          delay={1.1}
          transitionType="easeOut"
        >
          <Steps
            order={2}
            title="Step 2: Explore"
            text="Take some time to explore the features and functionalities of our product. Get familiar with the interface and all the tools available."
          />
        </Animate>
        <Animate
          hidden={{ opacity: 0, translateY: 20 }}
          visible={{ opacity: 1, translateY: 0 }}
          delay={1.6}
          transitionType="easeOut"
        >
          <Steps
            order={3}
            title="Step 3: Start using"
            text="Once you're ready, start using our product to enhance your workflow and achieve your goals. Don't hesitate to reach out to our support team if you have any questions or need assistance."
          />
        </Animate>
      </div>
    </div>
  );
}
