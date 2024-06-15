import React from "react";
import NavigationBar from "./components/navigation-bar";
import "./Landing.css";
import RightNavigation from "./components/right-navigation";
import Banner from "./components/banner";
import { higherImage } from "./assests";
import HowItWorks from "./components/how-it-work";
import KeyFeatures from "./components/key-features";
import About from "./components/about";
import ContactUs from "./components/contact-us";
import ContactForm from "./components/contact-form";

export const LandingPage = () => {
  return (
    <div className="pt-6 pl-3 h-full w-full flex flex-col gap-32 text-white">
      <NavigationBar />
      <div className="px-[2%] flex flex-col gap-44">
        <Banner />
        <HowItWorks />
        <KeyFeatures />
        <About />
        <ContactUs />
        <ContactForm />
      </div>

      <RightNavigation />
    </div>
  );
};
