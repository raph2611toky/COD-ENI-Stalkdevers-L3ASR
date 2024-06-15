import React from "react";
import clockIcon from "./clock.svg";
import priceIcon from "./price.svg";

export default function ListeParDate({ props }) {
  const { titre, date, prix, etat, lienVoirPlus } = props;
  let color = "bg-green-500";
  switch (etat.toLowerCase().trim()) {
    case "en cours":
      color = "bg-yellow-300";
      break;
    case "refusé":
      color = "bg-red-200";
      break;
    default:
      break;
  }
  return (
    <div className="w-full h-16 p-5 px-7 rounded-lg shadow-right-lg hover:shadow-hover-right-lg flex">
      <div className="w-52 flex justify-center items-center">
        <div
          className={
            color + " py-2 px-5 font-sans text-white rounded-full leading-3"
          }
        >
          {etat}
        </div>
      </div>
      <h3 className="font-bold font-sans flex-1">{titre}</h3>
      <div className="flex justify-between items-center gap-6 min-w-40">
        <div className="flex flex-1">
          <img src={priceIcon} />
          <p className="text-gray-700 font-sans">{prix}</p>
        </div>
        <div className="flex">
          <img src={clockIcon} />
          <p className="text-gray-700 font-sans">{date}</p>
        </div>
      </div>
    </div>
  );
}
