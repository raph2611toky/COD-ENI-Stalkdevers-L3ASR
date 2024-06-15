import React, { useState } from "react";

export default function SideItem({
  icon,
  text,
  clicked,
  subitems,
  order,
  setItemClicked,
  itemClicked,
}) {
  let children = false;
  const [subItemClicked, setSubItemClicked] = useState(false);
  const [item, setItem] = useState(0);

  if (subitems) {
    children = true;
  }

  const handleClick = () => setItemClicked(order);
  console.log("====================================");
  console.log(subItemClicked);
  console.log("====================================");

  const handleSubItemClick = () => {
    console.log("============================dfdf========");
    console.log(subItemClicked);
    console.log("====================================");
  };
  return (
    <div
      className={
        (children ? "h-12 hover:h-auto transition-all duration-500 " : "") +
        (subItemClicked ? " h-16 " : " h-12 ") +
        (itemClicked == order ? "bg-gray-200" : "hover:bg-gray-200") +
        " py-2 pt-3  px-5  cursor-pointer  rounded-xl  transition-all flex flex-col gap-4 font-mono *:transition-all"
      }
      onClick={handleClick}
    >
      <div className="flex justify-start items-center gap-6 ">
        <img src={icon} className="h-4" />
        <p className="text-sm font-mono font-bold">{text}</p>
      </div>
    
      {children && (
        <div className={"w-full overflow-y-hidden bg-black"}>
          {subitems?.map((item, index) => {
            return (
              <div
                key={index}
                className="py-3 px-4 hover:bg-gray-400 rounded-lg"
                onClick={handleSubItemClick}
              >
                {item}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
