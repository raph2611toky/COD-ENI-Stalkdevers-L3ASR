import React from 'react'
import clockIcon from "./clock.svg"
import priceIcon from "./price.svg"

export default function RecentCard({ props }) {
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
        <div className="w-96 h-40 p-5 px-7 rounded-lg shadow-right-lg flex flex-col justify-between hover:shadow-hover-right-lg ">
            <h3 className="font-bold font-sans">{titre}</h3>
            <div className="flex justify-between ">
                <div className="flex flex-1">
                    <img src={priceIcon} />
                    <p className="text-gray-700 font-sans">{prix}</p>
                </div>
                <div className="flex">
                    <img src={clockIcon} />
                    <p className="text-gray-700 font-sans">{date}</p>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div className={color + " py-1 px-5 font-sans text-white rounded-full"}>{etat}</div>
                <div><a href={lienVoirPlus} className="text-primary hover:text-secondary">Voir plus</a></div>
            </div>

        </div>
    )
}
