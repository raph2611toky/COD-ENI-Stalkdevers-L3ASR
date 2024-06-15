import React from "react";
import { logo } from "../assests";
import NavText from "./nav-text";
import Button from "./button";
import { higherImage, lowerImage } from "../assests";
import { useNavigate } from "react-router-dom";
const NavigationBar = () => {
  const navigate = useNavigate()
  //ovaina bouton fa lasa misy saut à la ligne
  return (
    <div>
      <img src={lowerImage} className="-z-10 absolute left-0 top-0 w-[60%]" />
      <img src={higherImage} className="-z-10 absolute left-0 top-0 w-[45%]" />
      <div className="flex justify-between pl-6 flex-wrap  sm:items-center">
        <div>
          <a href="/home">
            <img className=" left-0 top-0 z-10 h-10" src={logo} />
          </a>
        </div>
        <div className="pr-24 flex flex-wrap w-[70%] justify-between items-center  gap-2 ">
          <div className="flex font-mono text-lg gap-8 flex-wrap">
            <NavText text="accueil" href="#accueil" />
            <NavText text="comment ça marche" href="#work" />
            <NavText text="fonctionnalité" href="#fonctionalite" />
            <NavText text="contact" href="#contact" />
          </div>
          <Button text="Commencer" order="primary" href="/" />
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
