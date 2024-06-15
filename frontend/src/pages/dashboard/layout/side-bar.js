import React, { useState } from "react";
import { sideIcons } from "../assests";
import SideItem from "../components/side-item";

export default function SideBar() {
  const [itemClicked, setItemClicked] = useState(0);

  const sideTexts = ["Actualité", "Service", "Notification", "historique"];
  const subItems = { 1: ["communale", "Cartier", "Judiciaire"] };

  return (
    <div className="fixed h-full w-1/4 pt-6 px-4 -translate-y-2 left-0 top-20 shadow-xl shadow-slate-400  flex flex-col gap-2">
      {sideTexts.map((text, index) => {
        return (
          <SideItem
            key={index}
            text={text}
            icon={sideIcons[index]}
            order={index}
            setItemClicked={setItemClicked}
            itemClicked={itemClicked}
            subitems={subItems[index]}
          />
        );
      })}
    </div>
  );
}
