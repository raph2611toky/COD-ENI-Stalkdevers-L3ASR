import React from "react";

export default function Button({ text, className, order, onClick , href}) {
    return (
        <div
            className={
                "text-white py-3 px-8 text-base rounded-lg flex-shrink-0 " +
                className +
                (order == "primary" ? " bg-linear hover:bg-secondary hover:text-primary transition-colors cursor-pointer " : " bg-secondary hover:bg-primary hover:text-white transition-colors cursor-pointer")
            }
        >
            <a href={href} className="cursor-pointer">{text}</a>
        </div>
    );
}
