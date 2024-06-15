import React, { useState, useEffect } from "react";
import axios from 'axios';
import { sideIcons } from "../assests"; // Assurez-vous que le chemin est correct
import SideItem from "../components/side-item";

export default function SideBar() {
  const [itemClicked, setItemClicked] = useState(0);
  const [services, setServices] = useState(null);
  const sideTexts = ["Actualité", "Service", "Notification", "Historique"];
  const subItems = { 1: ["commune", "tribunal", "fokontany"] };
 
  return (
    <div className="h-full w-1/5 pt-6 px-4 left-0 top-20 shadow-xl shadow-slate-400 flex flex-col gap-2 bg-white">
      {sideTexts.map((text, index) => (
        <SideItem
          key={index}
          text={text}
          icon={sideIcons[index]}
          order={index}
          setItemClicked={setItemClicked}
          itemClicked={itemClicked}
          subitems={subItems[index]}
        />
      ))}

      {services && services.map((service, index) => (
        <SideItem
          key={index + sideTexts.length} // Pour éviter les conflits de clé avec sideTexts
          text={service.name} // Remplacez 'name' par la propriété appropriée de vos données de service
          icon={sideIcons[index % sideIcons.length]} // Cycle les icônes si vous avez moins d'icônes que de services
          order={index + sideTexts.length}
          setItemClicked={setItemClicked}
          itemClicked={itemClicked}
          subitems={subItems[index]}
        />
      ))}
    </div>
  );
}
